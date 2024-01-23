import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  // renderers: ["@astrojs/renderer-react"],
  integrations: [react()],
  adapter: node({
    mode: "standalone"
  })
});
