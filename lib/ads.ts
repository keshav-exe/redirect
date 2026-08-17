export interface Sponsor {
  name: string;
  tagline: string;
  href: string;
  logo?: string;
}

export const CURRENT_SPONSOR: Sponsor | null = null;

export const ADVERTISE_PAGE_URL = "/advertise";

export const ADVERTISE_CONTACT_URL =
  "mailto:hello@kshv.me?subject=Advertise%20on%20redirect";
