// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
// import starlightDocSearch from "@astrojs/starlight-docsearch";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	// Enable sitemap
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
					label: "Email",
					href: "mailto:sv279508@gmail.com",
				},
			],
			sidebar: [
				{
					label: "01_Projects",
					autogenerate: {
						directory: "01_Projects",
						collapsed: true,
					},
					collapsed: true,
				},
				{
					label: "02_Areas",
					autogenerate: {
						directory: "02_Areas",
						collapsed: true
					},
					collapsed: true,
				},
				{
					label: "03_Resources",
					autogenerate: {
						directory: "03_Resources",
						collapsed: true
					},
					collapsed: true,
				}, {
					label: "04_Archive",
					autogenerate: {
						directory: "04_Archive",
						collapsed: true
					},
					collapsed: true,
				}, {
					label: "05_Quick_Notes",
					autogenerate: {
						directory: "05_Quick_Notes",
						collapsed: true
					},
					collapsed: false,
				},
			],
		}),
	],
});
