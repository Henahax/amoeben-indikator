import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		// Provide fallback values for build time
		'process.env.DATABASE_URL': JSON.stringify('dummy-url-for-build')
	}
});
