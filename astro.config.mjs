// @ts-check
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";

export default defineConfig({
  compressHTML: false,
  integrations: [solidJs()],
});