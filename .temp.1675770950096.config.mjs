import { defineConfig } from 'astro/config';

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import svelte from "@astrojs/svelte";

import houdiniPaintFlecks from "houdini-paint-flecks/dist/index.js";

// https://astro.build/config
export default defineConfig({
  site: 'https://simoncoudeville.be',
  integrations: [mdx(), svelte()],
  markdown: {
    syntaxHighlight: 'prism'
  }
});