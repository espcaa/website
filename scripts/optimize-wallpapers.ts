import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = path.join(process.cwd(), "assets", "wallpapers-unoptimized");
const outputDir = path.join(process.cwd(), "public", "wallpapers");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs
  .readdirSync(inputDir)
  .filter((file) => /\.(jpe?g|png)$/i.test(file));

async function optimizeImages() {
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

optimizeImages();
