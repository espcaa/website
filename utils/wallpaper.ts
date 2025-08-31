export function getRandomWallpaper(): {
  module: ImageMetadata;
  filename: string;
} {
  const wallpaperModules = import.meta.glob("../src/assets/wallpapers/*.jpg", {
    eager: true,
  }) as Record<string, { default: ImageMetadata }>;

  const entries = Object.entries(wallpaperModules);
  const randomEntry = entries[Math.floor(Math.random() * entries.length)];

  const [path, mod] = randomEntry;
  const filename = path.split("/").pop()!;

  return { module: mod.default, filename };
}

import type { WallpaperColors } from "./types";

export async function getColorFromFilename(filename: string) {
  const colorJson: { default: WallpaperColors } = await import(
    "../src/data/wallpaper-colors.json"
  );
  return colorJson.default[filename]?.dark as WallpaperColors[string]["dark"];
}
