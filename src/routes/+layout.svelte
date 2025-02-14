<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-dvh flex-col items-center bg-green-500">
	<div class="flex w-full max-w-4xl grow flex-col items-center justify-center p-4">
		{@render children()}
	</div>
</div>
