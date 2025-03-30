import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		'process.env.BUILD_TIME': JSON.stringify(process.env.BUILD_TIME),
		'process.env.DATABASE_URL': JSON.stringify('dummy-url-for-build')
	}
});