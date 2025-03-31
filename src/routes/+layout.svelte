<script lang="ts">
	import '../app.css';
	import { enhance } from '$app/forms';
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

<app class="flex h-dvh max-h-dvh flex-col">
	<header class="flex min-h-14 justify-center">
		<div class="flex w-full max-w-7xl items-center justify-between px-4">
			<a class="flex items-center gap-4 text-2xl hover:text-neutral-300" href="/" aria-label="Home">
				<i class="fa-solid fa-bacterium"></i>
				<h1 class="text-center font-semibold max-sm:hidden">Amöben-Indikator</h1>
			</a>
			<div>
				{#if data.user}
					<button class="user-avatar" onclick={handleMenuOpen}
						>{data.user.users.username.substring(0, 1).toUpperCase()}
					</button>
					<div class="relative">
						{#if data.user && menuOpen}
							<div
								id="menu"
								class="absolute right-0 top-2 z-50 flex w-fit flex-col gap-2 rounded-b-lg bg-blue-500 p-4"
							>
								<div class="flex items-center gap-2">
									{data.user.users.username}
								</div>

								{#if data.user.users.roleId === 1}
									<a
										href="/admin"
										class="btn btn-secondary btn-small flex w-full items-center gap-2"
									>
										<i class={data.user.roles?.icon}></i>Administration
									</a>
								{:else if data.user.users.roleId === 2}
									<div class="flex items-center gap-2 text-xs">
										<i class={data.user.roles?.icon}></i>{data.user.roles?.name}
									</div>
								{:else}
									<div
										class="flex items-center gap-2 text-xs text-red-500"
										title="Zum freischalten Tobias kontaktieren"
									>
										<i class={data.user.roles?.icon}></i>{data.user.roles?.name}
									</div>
								{/if}

								<form action="/logout" method="POST">
									<button class="btn btn-secondary btn-small w-full" type="submit">
										<i class="fa-solid fa-right-from-bracket"></i>Logout
									</button>
								</form>
							</div>
						{/if}
					</div>
				{:else}
					<a class="btn btn-secondary btn-small" href="/login">
						<i class="fa-solid fa-arrow-right-to-bracket"></i>Login
					</a>
				{/if}
			</div>
		</div>
	</header>

	<main class="flex w-full max-w-7xl grow flex-col self-center overflow-y-auto p-4">
		<div class="flex grow flex-col justify-center">
			{@render children()}
		</div>
		<footer class="flex items-center">
			<div class="grow text-center text-xs">© henahax.de</div>
			<div class="text-xl">
				<a
					id="github"
					href="https://github.com/Henahax/amoeben-indikator"
					target="_blank"
					aria-label="GitHub"
					title="Dieses Projekt auf GitHub"
				>
					<i class="fa-brands fa-github"></i>
				</a>
			</div>
		</footer>
	</main>
</app>

<style>
	header {
		background-color: var(--primary);
		color: white;
		box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.25);
	}

	#menu {
		background-color: var(--primary-dark);
		color: white;
		box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.25);
	}

	.user-avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--primary-light);
		border-radius: 100%;
		width: 2.5rem;
		height: 2.5rem;
	}

	#github:hover {
		color: var(--primary);
	}
</style>
