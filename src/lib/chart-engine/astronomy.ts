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
}

function normLon(lon: number): number {
  return ((lon % 360) + 360) % 360;
}

function eclipticLon(body: Astronomy.Body, date: Date): number {
  const vec = Astronomy.GeoVector(body, date, true);
  const ecl = Astronomy.Ecliptic(vec);
  return normLon(ecl.elon);
}

export function getPlanetaryLongitudes(date: Date): PlanetaryLongitudes {
  const sunLon = eclipticLon(Astronomy.Body.Sun, date);
  const moonLon = eclipticLon(Astronomy.Body.Moon, date);

  // North Node via MoonNode search — use the ecliptic longitude of
  // the ascending node as approximated by the Moon's Ecliptic.
  // astronomy-engine exposes SearchMoonNode; we approximate with
  // direct computation of the Moon's node.
  let northNodeLon = 0;
  try {
    const mn = Astronomy.GeoMoon(date);
    // The ecliptic position of the ascending node is not directly exposed;
    // we use a solar system barycentric shortcut via the Moon's ecliptic lon.
    // True node longitude decreases ~19.3°/year. Approximate from known epoch:
    // Mean ascending node at J2000 = 125.044° (decreasing).
    const jd = Astronomy.MakeTime(date).ut + 2451545.0;
    const T = (jd - 2451545.0) / 36525.0;
    northNodeLon = normLon(125.044555 - 1934.136 * T);
    void mn; // silence unused warning
  } catch {
    northNodeLon = 0;
  }

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
