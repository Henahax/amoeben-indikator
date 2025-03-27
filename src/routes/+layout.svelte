<script lang="ts">
	import '../app.css';
	let { children, data } = $props();

	let menuOpen = $state(false);

	function handleMenuOpen(event: Event) {
		event.stopPropagation();
		menuOpen = true;
		document.body.addEventListener('click', handleMenuClose);
	}

	function handleMenuClose(event: Event) {
		const menu = document.getElementById('menu');
		if (!menu?.contains(event.target as Node)) {
			menuOpen = false;
			document.body.removeEventListener('click', handleMenuClose);
		}
	}
</script>

<app class="flex h-dvh flex-col">
	<header class="flex items-center justify-between bg-green-400 p-2">
		<a class="text-3xl" href="/" aria-label="Home">
			<i class="fa-solid fa-bacterium"></i>
		</a>
		<div>
			{#if data.user}
				<button class="size-10 rounded-full bg-blue-500 text-white" onclick={handleMenuOpen}
					>H</button
				>
			{:else}
				<a class="btn btn-primary" href="/login">Login</a>
			{/if}
		</div>
	</header>
	{#if data.user && menuOpen}
		<div
			id="menu"
			class="absolute right-0 top-14 flex w-fit flex-col gap-2 rounded-bl-lg bg-blue-500 p-4"
		>
			<div class="flex items-center gap-2 text-lg">
				<div class="flex size-8 items-center justify-center rounded-full bg-red-500 text-white">
					H
				</div>
				Henahax
			</div>

			<div class="flex items-center gap-2 text-sm">
				<i class="fa-solid fa-check"></i>Verifiziert
			</div>
			<div class="flex items-center gap-2 text-sm">
				<i class="fa-solid fa-user-tie"></i>Administrator
			</div>
			<button class="btn btn-tertiary">
				<i class="fa-solid fa-right-from-bracket"></i>
				logout
			</button>
		</div>
	{/if}

	<main class="flex grow flex-col p-4">
		<h1 class="text-center text-4xl">Amöben-Indikator</h1>

		<div class="flex grow flex-col justify-center">
			{@render children()}
		</div>
	</main>
</app>

<style>
</style>
