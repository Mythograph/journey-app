import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://journey.mythograph.co",
  output: "server",
  adapter: netlify(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
