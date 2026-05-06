import tzlookup from "tz-lookup";

export interface GeoResult {
  lat: number;
  lon: number;
  timezone: string; // IANA timezone string
  displayName: string;
}

export async function geocodeCity(city: string): Promise<GeoResult> {
  const url =
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;

  const res = await fetch(url, {
    headers: { "User-Agent": "mythograph-journey-app/1.0" },
  });

  if (!res.ok) throw new Error(`Geocode request failed: ${res.status}`);

  const data = (await res.json()) as { lat: string; lon: string; display_name: string }[];
  if (!data.length) throw new Error(`City not found: ${city}`);

  const { lat: latStr, lon: lonStr, display_name } = data[0];
  const lat = parseFloat(latStr);
  const lon = parseFloat(lonStr);
  const timezone = tzlookup(lat, lon);

  return { lat, lon, timezone, displayName: display_name };
}
