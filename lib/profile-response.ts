import type { Profile, ProfileLink } from "./types";

export type OwnerProfileResponse = {
  username: string;
  links: ProfileLink[];
  adFree: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export function toOwnerProfile(profile: Profile): OwnerProfileResponse {
  return {
    username: profile.username,
    links: profile.links,
    adFree: profile.adFree ?? false,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}
