// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightDocSearch from "@astrojs/starlight-docsearch";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	// site: "https://www.my-site.dev",
	base: "/",

	// output: 'server',
	// Change this to your preferred output format
	// static, server, or hybrid
	// static: prerender all pages at build time
	// server: prerender no pages at build time
	// hybrid: prerender some pages at build time, and server-render others

	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		starlight({
			title: "ervarunotes",
			components: {
				Header: "./src/components/header.astro",
			},
			plugins: [
				// starlightDocSearch({
				//   appId: import.meta.env.APPID,
				//   apiKey: import.meta.env.APIKEY,
				//   indexName: import.meta.env.INDEXNAME,
				// }),
			],

			customCss: ["./src/styles/global.css"],
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/VarunSharma3520",
				},
				{
					icon: "email",
					label: "email",
					href: "mailto:sv279508@gmail.com",
				},
			],
			sidebar: [
				{
					label: "My DSA",
					autogenerate: { directory: "DSA", collapsed: true },
					collapsed: true,
				},
				{
					label: "Web Development",
					autogenerate: { directory: "webd", collapsed: true },
					collapsed: true,
				},
				{
					label: "Backend Development",
					autogenerate: { directory: "backend", collapsed: true },
					collapsed: true,
				},
				{
					label: "Mobile Development",
					autogenerate: { directory: "mob", collapsed: true },
					collapsed: true,
				},
				{
					label: "Artificial Intelligence",
					autogenerate: { directory: "AI", collapsed: true },
					collapsed: true,
				},
				{
					label: "Psycho",
					autogenerate: { directory: "psyco", collapsed: true },
				},
				{
					label: "Quick Note",
					autogenerate: { directory: "QuickNote" },
				},
			],
		}),
	],
});
