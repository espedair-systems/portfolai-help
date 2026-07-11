// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	base: '/',

	alias: {
		'@': './src',
	},

	// base: '/portfolai-public',
	// site: 'https://espedair-systems.github.io',

	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},

	integrations: [
		starlight({
			title: 'Portfolai Help',
			components: {
				Head: './src/components/Head.astro',
				Sidebar: './src/components/Sidebar.astro',
				Header: './src/components/Header.astro',
			},
			customCss: [
				'./src/styles/custom.css',
				'katex/dist/katex.min.css',
			],
			sidebar: [
				{
					label: 'Getting Started',
					link: '/getting-started/',
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Terminal Interface', link: '/guides/tui/' },
						{ label: 'Configuration', link: '/guides/config/' },
						{
							label: 'Media Management',
							items: [
								{ label: 'Initial Steps', link: '/guides/media-start/' },
								{ label: 'Media Handling', link: '/guides/media/' },
							],
						},
					],
				},
				{
					label: 'Helper',
					autogenerate: { directory: 'help' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Imaginarium',
					items: [
						{ label: 'CLI Introduction', link: '/imaginarium/' },
						{
							label: 'Commands',
							autogenerate: { directory: 'imaginarium/commands' }
						},
						{
							label: 'Operations',
							autogenerate: { directory: 'imaginarium/operations' }
						},
						{
							label: 'Guides',
							autogenerate: { directory: 'imaginarium/guides' }
						}
					]
				},
				{
					label: 'Desktop',
					items: [
						{ label: 'App Overview', link: '/desktop/' }
					]
				},
				{
					label: 'Portfolai',
					items: [
						{ label: 'Web Overview', link: '/portfolai/' }
					]
				},
			],
		}),
	],
});
