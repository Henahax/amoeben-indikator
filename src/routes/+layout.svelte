<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import { ModeWatcher } from 'mode-watcher';
	import { resetMode, setMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
</script>

<ModeWatcher />
<header class="flex items-center justify-between">
	<Button
		variant="ghost"
		href="https://github.com/Henahax/amoeben-indikator"
		class="flex items-center gap-2 text-xs text-neutral-400"
	>
		<i class="fa-brands fa-github"></i>Sourcecode
	</Button>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button builders={[builder]} variant="outline" size="icon">
				<i class="fa-solid fa-sun rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				></i>
				<i
					class="fa-solid fa-moon absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				></i>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Item on:click={() => setMode('light')}>hell</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => setMode('dark')}>dunkel</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</header>
<main class="mx-auto flex max-w-screen-lg flex-col gap-8 p-4">
	{@render children()}
</main>
