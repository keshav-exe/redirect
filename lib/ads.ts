export const ADS_ENABLED = false;

export interface Sponsor {
  name: string;
  tagline: string;
  href: string;
  logo?: string;
}

export const CURRENT_SPONSOR: Sponsor | null = null;

export const ADVERTISE_PAGE_URL = "/advertise";

export const ADVERTISE_CONTACT_EMAIL = "hi@kshv.me";
export const ADVERTISE_CONTACT_SUBJECT = "Advertise on redirect";

export const ADVERTISE_CONTACT_URL = `mailto:${ADVERTISE_CONTACT_EMAIL}?subject=${encodeURIComponent(ADVERTISE_CONTACT_SUBJECT)}`;
