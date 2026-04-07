// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	base: '/help',
	integrations: [
		starlight({
			title: 'Portfolai Help',
			components: {
				Head: './src/components/Head.astro',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/espedair-systems/portfolai-public' }],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', link: '/guides/bootme/' },
						{ label: 'Installing Software', link: '/guides/software/' },
						{ label: 'Terminal Interface', link: '/guides/tui/' },
						{ label: 'Configuration', link: '/guides/config/' },
						{
							label: 'Media',
							items: [
								{ label: 'Initial Steps', link: '/guides/media-start/' },
								{ label: 'Media Handling', link: '/guides/media/' },
							],
						},
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
