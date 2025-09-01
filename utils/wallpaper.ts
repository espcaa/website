const wallpaperNumber = 5;

export function getRandomWallpaperIndex() {
  return Math.floor(Math.random() * wallpaperNumber) + 1;
}

type DarkColors = {
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  tertiary: string;
  onTertiary: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
};

export async function getColorFromFilename(str: string): Promise<DarkColors> {
  const json = await import("../src/data/wallpaper-colors.json");
  const colors = (json.default as Record<string, { dark: DarkColors }>)[str];
  return colors.dark;
}
