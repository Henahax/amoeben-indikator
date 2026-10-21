<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
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

	onNavigate((navigation) => {
		if (navigation.shallow && navigation.type === 'goto') return;
		if (!document.startViewTransition) return;

		return new Promise((resolveTransition) => {
			try {
				const transition = document.startViewTransition(() => {
					resolveTransition();
					return navigation.complete;
				});

				void transition.ready.catch(resolveTransition);
				void transition.finished.catch(() => {});
			} catch {
				resolveTransition();
			}
		});
	});
</script>

<app class="flex h-dvh max-h-dvh flex-col">
	<header class="flex min-h-14 justify-center">
		<div class="flex w-full max-w-7xl items-center justify-between px-4">
			<a
				class="flex items-center gap-4 text-2xl hover:text-neutral-300"
				href={resolve('/')}
				aria-label="Home"
			>
				<i class="fa-solid fa-bacterium"></i>
				<h1 class="text-center font-semibold max-sm:hidden">Amöben-Indikator</h1>
			</a>
			<div class="flex items-center gap-4">
				<a
					class="btn btn-ghost btn-small flex items-center gap-2"
					href="https://wheelofnames.com/de"
					target="_blank"
					rel="noopener noreferrer"
				>
					<i class="fa-solid fa-dice"></i>
					Entscheidungshelfer
				</a>
				<div class="relative">
					{#if data.user}
						<button class="user-avatar size-10 rounded-full" onclick={handleMenuOpen}>
							{data.user.users.username.substring(0, 1).toUpperCase()}
						</button>
						{#if data.user && menuOpen}
							<div
								id="menu"
								class="absolute top-12 right-0 z-50 flex w-fit flex-col gap-2 rounded-b-lg bg-blue-500 p-4"
							>
								<div class="flex items-center gap-2">
									{data.user.users.username}
								</div>

								{#if data.user.users.roleId === 1}
									<a
										href={resolve('admin')}
										class="btn btn-secondary btn-small flex w-full items-center gap-2"
									>
										<i class={data.user.roles?.icon}></i>
										Administration
									</a>
								{:else if data.user.users.roleId === 2}
									<div class="flex items-center gap-2 text-xs">
										<i class={data.user.roles?.icon}></i>
										{data.user.roles?.name}
									</div>
								{:else}
									<div
										class="flex items-center gap-2 text-xs text-red-500"
										title="Zum freischalten Tobias kontaktieren"
									>
										<i class={data.user.roles?.icon}></i>
										{data.user.roles?.name}
									</div>
								{/if}

								<form action="/logout" method="POST">
									<button class="btn btn-secondary btn-small w-full" type="submit">
										<i class="fa-solid fa-right-from-bracket"></i>
										Logout
									</button>
								</form>
							</div>
						{/if}
					{:else}
						<div class="flex gap-2">
							<a class="btn btn-secondary btn-small" href={resolve('login')}>
								<i class="fa-solid fa-arrow-right-to-bracket"></i>
								Login
							</a>
							<a class="btn btn-secondary btn-small" href={resolve('register')}>
								<i class="fa-solid fa-user-plus"></i>
								Registrieren
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<main class="flex w-full max-w-7xl grow flex-col self-center overflow-y-auto p-4">
		<div class="flex grow flex-col justify-center">
			{@render children()}
		</div>
		<footer class="flex items-center">
			<div class="grow text-center text-xs">© henahax.net</div>
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
		background-color: var(--primary-light);
	}

	#github:hover {
		color: var(--primary);
	}
</style>
