import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		backgroundColor: z.string().optional(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		draft: z.boolean().optional(),
	}),
});

export const collections = {
	'blog': blogCollection
};