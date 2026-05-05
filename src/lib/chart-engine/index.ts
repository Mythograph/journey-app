// Stub. Implementation lands Day 2.
// See ./README.md for the pipeline.

export interface BirthData {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24h, local to birth city)
  city: string;
}

export interface Chart {
  type: string;
  strategy: string;
  authority: string;
  profile: string;
  // gates, channels, centers, planetary activations, incarnation cross — Day 2
}

export async function generateChart(_birth: BirthData): Promise<Chart> {
  throw new Error("chart-engine not yet implemented — Day 2");
}
