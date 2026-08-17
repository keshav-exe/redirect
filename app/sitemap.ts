import type { MetadataRoute } from "next";
import { getProfilesForSitemap } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: `${SITE_URL}/features`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/advertise`,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${SITE_URL}/privacy`,
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    url: `${SITE_URL}/terms`,
    changeFrequency: "yearly",
    priority: 0.2,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profiles = await getProfilesForSitemap();

  return [
    ...staticRoutes,
    ...profiles.map(({ username, updatedAt }) => ({
      url: `${SITE_URL}/${encodeURIComponent(username)}`,
      lastModified: updatedAt ? new Date(updatedAt) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
