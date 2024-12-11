<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<app class="flex min-h-dvh flex-col">
	<header>Header</header>
	<main class="grow">
		{@render children()}
	</main>
	<footer>Footer</footer>
</app>
