export type Platform =
  | "twitter"
  | "instagram"
  | "linkedin"
  | "github"
  | "youtube"
  | "tiktok"
  | "website";

export interface ProfileLink {
  platform: Platform;
  url: string;
}

export interface Profile {
  username: string;
  links: ProfileLink[];
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
