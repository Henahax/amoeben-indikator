<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex max-w-6xl flex-col gap-16 px-4 py-16">
	<a class="mx-auto" href="/">
		<h1 class="text-4xl">Amöben-Indikator</h1>
	</a>

	{@render children()}
</div>
