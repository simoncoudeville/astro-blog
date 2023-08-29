import { defineConfig } from 'astro/config';

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://simoncoudeville.be',
  integrations: [mdx({
    extendPlugins: 'defaults',
    extendMarkdownConfig: false,
    smartypants: true,
    gfm: true,
    syntaxHighlight: 'prism',
    // shikiConfig: {
    //   theme: 'css-variables',
    // },
  }), svelte()],
});