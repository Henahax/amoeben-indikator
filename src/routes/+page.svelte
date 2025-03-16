<script lang="ts">
	import type { PageProps } from './$types';

	interface PageData {
		scales: { name: string }[];
	}

	let { data }: { data: PageData } = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#each data.scales as item}
	<p>{item.name}</p>
{/each}
