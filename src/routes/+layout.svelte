<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-dvh flex-col items-center">
	<div class="flex w-full max-w-4xl grow flex-col items-center justify-center p-8">
		{@render children()}
	</div>
</div>
