<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';

	import { toggleMode } from 'mode-watcher';
</script>

<app class="flex min-h-dvh flex-col">
	<ModeWatcher />
	<header class="flex justify-between">
		<Button size="sm" variant="ghost" href="https://github.com/Henahax/amoeben-indikator">
			<span class="flex items-center gap-2 text-xs opacity-75">
				<i class="fa-brands fa-github"></i>
				Sourcecode
			</span>
		</Button>
		<Button on:click={toggleMode} variant="outline" size="icon">
			<i class="fa-solid fa-sun hidden dark:block"></i>
			<i class="fa-solid fa-moon block dark:hidden"></i>
		</Button>
	</header>
	<main class="mx-auto grow content-center p-4 max-w-screen-2xl w-full">
		{@render children()}
	</main>
</app>
