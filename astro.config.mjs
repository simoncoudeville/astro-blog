import { defineConfig } from 'astro/config';
import semaSoftTheme from './src/styles/themes/sema-soft.json';
import semaLightSoftTheme from './src/styles/themes/sema-light-soft.json';
import semaLightSoftChromaTheme from './src/styles/themes/sema-light-soft-chroma.json';
import semaLightChromaTheme from './src/styles/themes/sema-light-chroma.json';
import monoCL from './src/styles/themes/mono-cl.json'
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
    // syntaxHighlight: 'prism',
    shikiConfig: {
      theme: 'css-variables',
      // theme: monoCL,
    },
    // rehypePlugins: [
    //   rehypeSlug,
    //   [rehypeAutolinkHeadings, {
    //     behavior: 'prepend',
    //     properties: {
    //       className: ['heading-anchor'],
    //       ariaLabel: 'Link to heading',
    //     },
    //     content: { type: 'text', value: '#' }
    //   }]
    // ],
    // shikiConfig: {
    //   themes: {
    //     light: semaLightSoftChromaTheme,
    //     dark: semaSoftTheme,
    //   },
    // },
  }), svelte()],
});