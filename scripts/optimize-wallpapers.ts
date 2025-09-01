import fs from "fs";
import path from "path";
import sharp from "sharp";

async function optimizeFolder(inputDir: string, outputDir: string) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs
    .readdirSync(inputDir)
    .filter((file) => /\.(jpe?g|png)$/i.test(file));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFileName = file.replace(/\.(jpe?g|png)$/i, ".webp");
    const outputPath = path.join(outputDir, outputFileName);

    try {
      await sharp(inputPath).rotate().webp({ quality: 50 }).toFile(outputPath);
      console.log(`Optimized: ${file} → ${outputFileName}`);
    } catch (err) {
      console.error(`Failed to optimize ${file}:`, err);
    }
  }
}

optimizeFolder(
  path.join(process.cwd(), "assets", "wallpapers-unoptimized"),
  path.join(process.cwd(), "public", "wallpapers"),
);

optimizeFolder(
  path.join(process.cwd(), "assets", "places-unoptimized"),
  path.join(process.cwd(), "public", "places"),
);
