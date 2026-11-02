import * as Astronomy from "astronomy-engine";

export interface PlanetaryLongitudes {
  Sun: number;
  Earth: number; // always 180° from Sun
  Moon: number;
  Mercury: number;
  Venus: number;
  Mars: number;
  Jupiter: number;
  Saturn: number;
  Uranus: number;
  Neptune: number;
  Pluto: number;
  NorthNode: number;
  SouthNode: number; // always 180° from NorthNode
  Chiron: number;
}

function normLon(lon: number): number {
  return ((lon % 360) + 360) % 360;
}

function toRad(deg: number): number { return deg * Math.PI / 180; }
function toDeg(rad: number): number { return rad * 180 / Math.PI; }

// Chiron's geocentric ecliptic longitude via Keplerian orbital elements.
// Elements at epoch J2000.0 (JD 2451545.0) from JPL SBDB.
function chironLongitude(date: Date): number {
  const a = 13.6484;       // semi-major axis, AU
  const e = 0.38018;       // eccentricity
  const i = toRad(6.9330); // inclination
  const W = toRad(209.389);// longitude of ascending node
  const w = toRad(339.255);// argument of perihelion
  const M0 = toRad(14.9462);// mean anomaly at J2000
  const n = toRad(360 / 18424.5); // mean motion deg/day → rad/day

  const jd = Astronomy.MakeTime(date).ut + 2451545.0;
  const dt = jd - 2451545.0; // days since J2000

  // Mean anomaly at date
  let M = M0 + n * dt;
  M = ((M % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  // Solve Kepler's equation M = E - e*sin(E) by Newton-Raphson
  let E = M;
  for (let k = 0; k < 10; k++) {
    const dE = (M - E + e * Math.sin(E)) / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < 1e-10) break;
  }

  // True anomaly
  const nu = 2 * Math.atan2(
    Math.sqrt(1 + e) * Math.sin(E / 2),
    Math.sqrt(1 - e) * Math.cos(E / 2),
  );

  const r = a * (1 - e * Math.cos(E));

  // Heliocentric ecliptic coordinates
  const xH = r * (Math.cos(W) * Math.cos(nu + w) - Math.sin(W) * Math.sin(nu + w) * Math.cos(i));
  const yH = r * (Math.sin(W) * Math.cos(nu + w) + Math.cos(W) * Math.sin(nu + w) * Math.cos(i));
  const zH = r * (Math.sin(nu + w) * Math.sin(i));

  // Earth's heliocentric position. HelioVector returns EQJ (equatorial J2000)
  // while xH/yH/zH above are ecliptic, so the two must be brought into the same
  // frame before differencing — subtracting an equatorial vector from an
  // ecliptic one tilts the baseline by the obliquity and drags the result off
  // by roughly a sixth of a degree at Chiron's distance.
  const earthEqj = Astronomy.HelioVector(Astronomy.Body.Earth, date);
  const earthEcl = Astronomy.Ecliptic(earthEqj);
  const rE = Math.sqrt(earthEqj.x ** 2 + earthEqj.y ** 2 + earthEqj.z ** 2);
  const elat = toRad(earthEcl.elat);
  const elon = toRad(earthEcl.elon);
  const xE = rE * Math.cos(elat) * Math.cos(elon);
  const yE = rE * Math.cos(elat) * Math.sin(elon);
  const zE = rE * Math.sin(elat);

  // Geocentric vector of Chiron, then its ecliptic longitude.
  const dx = xH - xE;
  const dy = yH - yE;
  const dz = zH - zE;
  void dz; // longitude is the ecliptic-plane projection; latitude is unused

  return normLon(toDeg(Math.atan2(dy, dx)));
}

// The true (osculating) North Node: the ascending node of the Moon's actual
// orbit at this instant, from its position and velocity in the ecliptic of
// date. Human Design charts use the true node; the mean node used before
// 2 Nov 2026 drifted up to about 1.5 degrees from it, enough to move a node
// into the next gate. Matches the Story Loom birth web (src/lib/chart/sky.ts).
function trueNode(date: Date): number {
  const st = Astronomy.RotateState(Astronomy.Rotation_EQJ_ECT(date), Astronomy.GeoMoonState(date));
  const hx = st.y * st.vz - st.z * st.vy;
  const hy = st.z * st.vx - st.x * st.vz;
  return normLon(toDeg(Math.atan2(hx, -hy)));
}

function eclipticLon(body: Astronomy.Body, date: Date): number {
  const vec = Astronomy.GeoVector(body, date, true);
  const ecl = Astronomy.Ecliptic(vec);
  return normLon(ecl.elon);
}

export function getPlanetaryLongitudes(date: Date): PlanetaryLongitudes {
  const sunLon = eclipticLon(Astronomy.Body.Sun, date);
  const moonLon = eclipticLon(Astronomy.Body.Moon, date);

  const northNodeLon = trueNode(date);

  return {
    Sun:       sunLon,
    Earth:     normLon(sunLon + 180),
    Moon:      moonLon,
    Mercury:   eclipticLon(Astronomy.Body.Mercury, date),
    Venus:     eclipticLon(Astronomy.Body.Venus,   date),
    Mars:      eclipticLon(Astronomy.Body.Mars,    date),
    Jupiter:   eclipticLon(Astronomy.Body.Jupiter, date),
    Saturn:    eclipticLon(Astronomy.Body.Saturn,  date),
    Uranus:    eclipticLon(Astronomy.Body.Uranus,  date),
    Neptune:   eclipticLon(Astronomy.Body.Neptune, date),
    Pluto:     eclipticLon(Astronomy.Body.Pluto,   date),
    NorthNode: northNodeLon,
    SouthNode: normLon(northNodeLon + 180),
    Chiron:    chironLongitude(date),
  };
}

/**
 * Find the UTC moment when the Sun was at targetLon, searching backwards
 * from `fromDate` up to `maxDaysBack` days.
 *
 * Used to find the Design moment: Sun at (birthSunLon - 88°), ~88 days before.
 */
export function findSunLongitude(
  targetLon: number,
  fromDate: Date,
  maxDaysBack = 100,
): Date {
  const target = normLon(targetLon);

  // Binary search between (fromDate - maxDaysBack) and fromDate.
  let lo = new Date(fromDate.getTime() - maxDaysBack * 86_400_000);
  let hi = new Date(fromDate.getTime());

  for (let i = 0; i < 60; i++) {
    const mid = new Date((lo.getTime() + hi.getTime()) / 2);
    const lon = eclipticLon(Astronomy.Body.Sun, mid);

    // Angular distance: need to handle 0/360 wrap
    const diff = normLon(lon - target + 180) - 180; // signed diff in (-180, 180]
    if (Math.abs(diff) < 1e-6) break;

    if (diff > 0) {
      // lon is ahead of target → go earlier
      hi = mid;
    } else {
      lo = mid;
    }
  }

  return new Date((lo.getTime() + hi.getTime()) / 2);
}
