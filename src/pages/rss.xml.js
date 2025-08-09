import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { SITE_ATHOUR, SITE_DESCRIPTION } from '../config';

export async function GET(context) {
    return rss({
        title: `${SITE_ATHOUR} | Blog`,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: await pagesGlobToRssItems(
            import.meta.glob('../content/blog/*.{md,mdx}')
        ),
        customData: `<language>en-us</language>`,
    });
}
