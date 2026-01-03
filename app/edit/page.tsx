"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Platform, ProfileLink } from "@/lib/types";

const PLATFORMS: Platform[] = [
  "twitter",
  "instagram",
  "linkedin",
  "github",
  "youtube",
  "tiktok",
  "website",
];

export default function EditPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [links, setLinks] = useState<ProfileLink[]>([
    { platform: "twitter", url: "" },
  ]);

  const addLink = () => {
    setLinks([...links, { platform: "twitter", url: "" }]);
  };

  const updateLink = (index: number, field: keyof ProfileLink, value: string) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    setLinks(updated);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validLinks = links.filter((link) => link.url.trim() !== "");
    if (!username.trim() || validLinks.length === 0) {
      return;
    }

    const profile = {
      username: username.trim().toLowerCase(),
      links: validLinks,
    };

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (res.ok) {
      router.push(`/${profile.username}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6"
      >
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="yourname"
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm">Platforms</label>
            <button
              type="button"
              onClick={addLink}
              className="text-sm underline decoration-1 underline-offset-2 hover:no-underline"
            >
              Add
            </button>
          </div>

          {links.map((link, index) => (
            <div key={index} className="flex gap-2">
              <Select
                value={link.platform}
                onValueChange={(value) =>
                  updateLink(index, "platform", value)
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(index, "url", e.target.value)}
                placeholder="https://..."
                className="flex-1"
              />
              {links.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="text-sm underline decoration-1 underline-offset-2 hover:no-underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <Button type="submit" variant="outline" className="w-full">
          Save
        </Button>
      </form>
    </div>
  );
}
