import fs from "fs";
import path from "path";
import { getMaterialWallpaperColorsMulti } from "../utils/color";

const wallpapersDir = path.join(
  process.cwd(),
  "/assets/wallpapers-unoptimized",
);
const dataDir = path.join(process.cwd(), "/src/data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const files = fs.readdirSync(wallpapersDir).filter((f) => f.endsWith(".jpg"));

const colorsMap: Record<string, any> = {};

for (const file of files) {
  const filePath = path.join(wallpapersDir, file);
  const nameWithoutExt = path.parse(file).name;

  // 👇 check for ../src/data/wallpapers/number.json
  const metaPath = path.join(
    process.cwd(),
    "src/data/wallpapers",
    `${nameWithoutExt}.json`,
  );

  let seedOverride: string | undefined;
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      if (typeof meta.SeedColor === "string") {
        seedOverride = meta.SeedColor;
      }
    } catch (err) {
      console.warn(`Failed to parse ${metaPath}`, err);
    }
  }

  const colors = await getMaterialWallpaperColorsMulti(filePath, seedOverride);
  colorsMap[nameWithoutExt] = colors;
}

fs.writeFileSync(
  path.join(dataDir, "wallpaper-colors.json"),
  JSON.stringify(colorsMap, null, 2),
);
