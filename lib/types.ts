export type Platform =
  | "twitter"
  | "instagram"
  | "linkedin"
  | "github"
  | "youtube"
  | "tiktok"
  | "reddit"
  | "website";

export interface ProfileLink {
  platform: Platform;
  url: string;
}

export interface Profile {
  username: string;
  links: ProfileLink[];
  userId: string;
  adFree?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
