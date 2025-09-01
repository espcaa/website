// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";

import icon from "astro-icon";

import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  outDir: "dist",
  base: "/",
  integrations: [mdx(), sitemap(), icon(), react()],

  vite: {
    plugins: [
      dynamicImportVars({
        include: [
          "src/assets/projects/*.jpg",
          "src/assets/projects/*.png",
          "src/assets/projects/*.jpeg",
        ],
      }),
    ],
  },

  adapter: node({
    mode: "standalone",
  }),
});
