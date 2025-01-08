<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<header>Header</header>
<main class="mx-auto max-w-screen-lg">
	{@render children()}
</main>
<footer>
	<a href="/" class="flex items-center gap-1 text-sm">
		<i class="fa-brands fa-github"></i>Sourcecode
	</a>
	

</footer>
