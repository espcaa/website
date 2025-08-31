import {
  QuantizerCelebi,
  Score,
  Scheme,
} from "@material/material-color-utilities";
import { createCanvas, loadImage } from "canvas";
import path from "path";

function toHex(argb: number) {
  return `#${(argb & 0xffffff).toString(16).padStart(6, "0")}`;
}

export async function getMaterialWallpaperColorsMulti(wallpaperPath: string) {
  const img = await loadImage(wallpaperPath);

  const canvas = createCanvas(128, 128);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, 128, 128);

  const imageData = ctx.getImageData(0, 0, 128, 128).data;
  const pixels: number[] = [];
  for (let i = 0; i < imageData.length; i += 4) {
    const a = imageData[i + 3];
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const argb = (a << 24) | (r << 16) | (g << 8) | b;
    pixels.push(argb >>> 0);
  }

  const quantized = QuantizerCelebi.quantize(pixels, 128);
  const seedColors = Score.score(quantized);

  const primarySeed = seedColors[0];
  const secondarySeed = seedColors[1] ?? seedColors[0];
  const tertiarySeed = seedColors[2] ?? seedColors[0];

  const darkPrimaryScheme = Scheme.dark(primarySeed);

  function extractColors(scheme: Scheme, secondary: number, tertiary: number) {
    return {
      primary: toHex(scheme.primary),
      onPrimary: toHex(scheme.onPrimary),
      secondary: toHex(secondary),
      onSecondary: "#ffffff",
      tertiary: toHex(tertiary),
      onTertiary: "#ffffff",
      background: toHex(scheme.background),
      onBackground: toHex(scheme.onBackground),
      surface: toHex(scheme.surface),
      onSurface: toHex(scheme.onSurface),
    };
  }

  return {
    seeds: [primarySeed, secondarySeed, tertiarySeed].map(toHex),
    dark: extractColors(darkPrimaryScheme, secondarySeed, tertiarySeed),
  };
}
