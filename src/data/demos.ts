export interface Demo {
	/** URL slug under /demos/<slug>/ and /og/demos/<slug>.png */
	slug: string;
	title: string;
	description: string;
	/** Where the demo's back arrow links to */
	backLink: string;
}

export const demos: Demo[] = [
	{
		slug: "fluid-type",
		title: "Fluid Typography with calc()",
		description: "Fluid typography demo using CSS clamp() function",
		backLink: "/blog/a-css-only-fluid-typography-approach/",
	},
	{
		slug: "fluid-type-function",
		title: "Fluid text with @function",
		description: "Fluid typography demo using CSS @function",
		backLink: "/blog/a-css-only-fluid-typography-approach/",
	},
	{
		slug: "fluid-modular-scale",
		title: "Fluid typographic modular scale with calc()",
		description: "Fluid typography with modular scale demo using CSS clamp() function",
		backLink: "/blog/a-css-only-fluid-typography-approach/",
	},
	{
		slug: "baseline-grid",
		title: "Aligning images to a baseline grid",
		description:
			"Images that snap their height to the baseline grid with pure CSS, plus a sidebar to override the font size, line height and baseline divisions.",
		backLink: "/blog/aligning-images-to-a-baseline-grid-with-modern-css/",
	},
];

export const getDemo = (slug: string): Demo => {
	const demo = demos.find((d) => d.slug === slug);
	if (!demo) throw new Error(`Unknown demo slug: ${slug}`);
	return demo;
};
