const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

export function validateRedirectUrl(
  input: string
): { ok: true; url: string } | { ok: false; error: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "URL is required" };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { ok: false, error: "Invalid URL" };
  }

  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
    return { ok: false, error: "URL must use http or https" };
  }

  if (parsed.username || parsed.password) {
    return { ok: false, error: "URL must not contain credentials" };
  }

  if (parsed.protocol === "http:") {
    parsed.protocol = "https:";
  }

  return { ok: true, url: parsed.href };
}
