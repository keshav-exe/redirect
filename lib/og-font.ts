// Fetches a Google Font subset (just the glyphs we need) at request time so
// OG images render with the app's real typefaces instead of satori's
// built-in fallback font. Standard pattern for `next/og` ImageResponse.
export async function loadGoogleFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer> {
  const params = new URLSearchParams({
    family: `${family}:wght@${weight}`,
    text,
  });

  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?${params.toString()}`)
  ).text();

  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) {
    throw new Error(`loadGoogleFont: could not resolve font file for ${family}`);
  }

  const res = await fetch(match[1]);
  return res.arrayBuffer();
}
