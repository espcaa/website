import fs from "fs";
import path from "path";
import { getMaterialWallpaperColorsMulti } from "../utils/color";

const wallpapersDir = path.join(process.cwd(), "src/assets/wallpapers");
const dataDir = path.join(process.cwd(), "src/data");

// Create the folder if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const files = fs.readdirSync(wallpapersDir).filter((f) => f.endsWith(".jpg"));

const colorsMap: Record<string, any> = {};

for (const file of files) {
  const filePath = path.join(wallpapersDir, file);
  const colors = await getMaterialWallpaperColorsMulti(filePath);
  colorsMap[file] = colors;
}

fs.writeFileSync(
  path.join(dataDir, "wallpaper-colors.json"),
  JSON.stringify(colorsMap, null, 2),
);

console.log("Wallpaper colors extracted!");
