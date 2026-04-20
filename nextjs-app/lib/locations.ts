import { query } from "./db";

export type Location = {
  id: number;
  slug: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  map_query: string;
  is_paramus: boolean;
  sort_order: number;
};

export async function getLocations(): Promise<Location[]> {
  return query<Location>(
    `SELECT id, slug, name, street, city, state, zip, map_query, is_paramus, sort_order
       FROM locations
       ORDER BY sort_order ASC`
  );
}

export function locationAddress(loc: Location): string {
  return `${loc.street}, ${loc.city}, ${loc.state} ${loc.zip}`;
}

export function googleMapsLink(loc: Location): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    loc.map_query
  )}`;
}

export function googleMapsEmbed(loc: Location): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    loc.map_query
  )}&output=embed`;
}
