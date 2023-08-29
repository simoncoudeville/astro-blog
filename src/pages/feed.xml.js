import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';


export async function get(context) {
    const allPosts = (
        await getCollection("blog", ({ data }) => {
            return data.draft !== true;
        })
    ).sort(
        (a, b) =>
            new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
    );
    return rss({
        // `<title>` field in output xml
        title: 'Simon Coudeville’s Blog',
        // `<description>` field in output xml
        description: 'A humble Astronaut’s guide to the stars',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site: context.site,
        // Array of `<item>`s in output xml
        items: allPosts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            // Compute RSS link from post `slug`
            // This example assumes all posts are rendered as `/blog/[slug]` routes
            link: `/blog/${post.slug}/`,
        })),
        // (optional) inject custom xml
        customData: `<language>en-us</language>`,
    });
}