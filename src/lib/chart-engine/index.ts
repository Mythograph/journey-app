import { DateTime } from "luxon";
import { geocodeCity } from "./geocode.js";
import { getPlanetaryLongitudes, findSunLongitude } from "./astronomy.js";
import {
  toActivations,
  deriveDefinedChannels,
  deriveDefinedCenters,
  deriveType,
  deriveStrategy,
  deriveAuthority,
  deriveProfile,
  deriveIncarnationCross,
} from "./derivation.js";
import { renderBodygraph } from "./render.js";
import type { BirthData, Chart } from "./types.js";

export type { BirthData, Chart } from "./types.js";

export async function generateChart(birth: BirthData): Promise<Chart> {
  // 1. Geocode city → lat/lng + IANA timezone
  const geo = await geocodeCity(birth.city);

  // 2. Resolve birth moment: local date/time + timezone → UTC
  const localDt = DateTime.fromFormat(
    `${birth.date} ${birth.time}`,
    "yyyy-MM-dd HH:mm",
    { zone: geo.timezone },
  );
  if (!localDt.isValid) {
    throw new Error(`Invalid birth date/time: ${localDt.invalidReason}`);
  }
  const birthUtc = localDt.toUTC().toJSDate();

  // 3. Personality (Conscious) planetary positions
  const personalityLons = getPlanetaryLongitudes(birthUtc);
  const personalityActivations = toActivations(personalityLons);

  // 4. Design (Unconscious): find the moment Sun was 88° before birth Sun
  const designSunTarget = personalityLons.Sun - 88;
  const designDate = findSunLongitude(designSunTarget, birthUtc);
  const designLons = getPlanetaryLongitudes(designDate);
  const designActivations = toActivations(designLons);

  // 5. Collect all activated gates
  const personalityGates = new Set(personalityActivations.map((a) => a.gate));
  const designGates = new Set(designActivations.map((a) => a.gate));
  const allGates = new Set([...personalityGates, ...designGates]);

  // 6. Channels → Centers → Type / Strategy / Authority
  const definedChannels = deriveDefinedChannels(allGates);
  const definedCenters = deriveDefinedCenters(definedChannels);
  const type = deriveType(definedCenters);
  const strategy = deriveStrategy(type);
  const authority = deriveAuthority(definedCenters, type);

  // 7. Profile from Personality Sun line / Design Sun line
  const pSun = personalityActivations.find((a) => a.planet === "Sun")!;
  const dSun = designActivations.find((a) => a.planet === "Sun")!;
  const profile = deriveProfile(pSun.line, dSun.line);

  // 8. Incarnation Cross from Personality Sun gate + line
  const incarnationCross = deriveIncarnationCross(pSun.gate, pSun.line);

  // 9. SVG bodygraph
  const bodygraphSvg = renderBodygraph({
    definedCenters,
    definedChannels,
    personalityGates,
    designGates,
  });

  return {
    birthData: birth,
    type,
    strategy,
    authority,
    profile,
    incarnationCross,
    personalityActivations,
    designActivations,
    definedGates: allGates,
    definedChannels,
    definedCenters,
    bodygraphSvg,
    debug: {
      geocodedLocation: geo.displayName,
      timezone: geo.timezone,
      birthUtc: birthUtc.toISOString(),
      designDate: designDate.toISOString(),
      personalitySunLon: Math.round(personalityLons.Sun * 1000) / 1000,
      designSunLon: Math.round(designLons.Sun * 1000) / 1000,
      allActivatedGates: [...allGates].sort((a, b) => a - b),
    },
  };
}
