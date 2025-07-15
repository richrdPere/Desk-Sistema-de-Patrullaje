export interface ZonaPatrullaje {
  id: string;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number }[];
  riesgo: string;
}
