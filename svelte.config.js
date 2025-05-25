import { mdsvex } from 'mdsvex'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
	preprocess: [vitePreprocess(), mdsvex()],
	extensions: ['.svelte', '.svx']
}
