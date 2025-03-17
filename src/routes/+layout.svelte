<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-auto max-w-6xl p-4">
	{@render children()}
</div>
