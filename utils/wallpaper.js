export function getRandomWallpaperIndex() {
  const wallpaperNumber = 5;
  return Math.floor(Math.random() * wallpaperNumber) + 1;
}

export async function getColorFromFilename(filename) {
  const res = await fetch(`/data/wallpaper-colors.json`);
  const colorJson = await res.json();
  return colorJson[filename]?.dark;
}
