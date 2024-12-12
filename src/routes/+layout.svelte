<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<app class="flex min-h-dvh flex-col">
	<header>Header</header>
	<main class="grow">
		{@render children()}
	</main>
	<footer class="flex justify-end text-xs"><a class="btn btn-ghost" href="https://github.com/Henahax/amoeben-indikator"><i class="fa-brands fa-github"></i>Sourcecode</a></footer>
</app>
