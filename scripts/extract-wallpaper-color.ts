import fs from "fs";
import path from "path";
import { getMaterialWallpaperColorsMulti } from "../utils/color";

const wallpapersDir = path.join(
  process.cwd(),
  "/assets/wallpapers-unoptimized",
);
const dataDir = path.join(process.cwd(), "/public/data");

// Create the folder if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const files = fs.readdirSync(wallpapersDir).filter((f) => f.endsWith(".jpg"));

const colorsMap: Record<string, any> = {};

for (const file of files) {
  // remove the file extension for the filepath
  const filePath = path.join(wallpapersDir, file);
  const colors = await getMaterialWallpaperColorsMulti(filePath);
  const nameWithoutExt = path.parse(file).name; // <-- removes extension
  colorsMap[nameWithoutExt] = colors;
}

fs.writeFileSync(
  path.join(dataDir, "wallpaper-colors.json"),
  JSON.stringify(colorsMap, null, 2),
);

console.log("Wallpaper colors extracted!");
