<script lang="ts">
	import type { entry, user, scale } from '$lib/types';

	import { Button } from '$lib/components/ui/button/index.js';

	import { Progress } from '$lib/components/ui/progress';

	import jsonEntries from '$lib/entries.json';

	import { store } from '$lib/store.svelte.js';

	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let progress = $state(
		new Tween(0, {
			delay: 0,
			duration: 2500,
			easing: cubicOut
		})
	);

	$effect(() => {
		store.entries = jsonEntries as entry[];
		progress.target = store.score;
	});
</script>

<section class="flex flex-col gap-8">
	<h1 class="text-center text-4xl">Amöben Indikator</h1>
	<div class="flex flex-col gap-4 sm:gap-2">
		<ul class="flex flex-row justify-between">
			{#each store.scales as scale}
				<li
					class="flex flex-col items-center justify-end max-sm:px-4 {store.highestScale === scale.id
						? 'text-primary font-bold text-xl'
						: 'text-neutral-500'}"
					title="≥{scale.value}"
				>
					<i class="{scale.icon} {store.highestScale === scale.id
						? 'animate-pulse text-3xl'
						: 'text-xl'}"></i>
					<div class="hidden sm:block">
						{scale.name}
					</div>
				</li>
			{/each}
		</ul>
		<Progress value={progress.current} max={1} class="h-8 w-full" title={store.score.toString()} />
	</div>
</section>
<section>
	<div class="mx-auto w-fit">
		<div class="flex w-full items-center justify-between gap-4">
			<p class="font-bold text-neutral-500">Historie:</p>
			<Button variant="default" href="/new">Neuer Eintrag</Button>
		</div>
		<ul class="mx-auto w-fit divide-y divide-neutral-500 divide-opacity-25">
			{#each store.entries as entry}
				<li class="grid grid-cols-[auto_auto_1fr] gap-x-8 gap-y-8 py-4">
					<div
						class="grid-subgrid col-span-2 grid grid-cols-1 content-center gap-x-8 gap-y-2 sm:col-span-1 sm:grid-cols-2"
					>
						<div class="flex flex-col justify-center">
							<div>
								{store.users.find((user: user) => user.id === entry.user_id)?.name ??
									'Unknown User'}
							</div>
							<div class="text-xs text-neutral-500">
								{new Date(entry.date).toLocaleString('de-DE', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
									second: '2-digit'
								})}
							</div>
						</div>
						<div class="flex items-center gap-2 font-bold">
							<i class={store.scales.find((scale: scale) => entry.scale_id === scale.id)?.icon}></i>
							{store.scales.find((scale: scale) => entry.scale_id === scale.id)?.name}
						</div>
					</div>

					<div class="flex items-center text-sm">
						{entry.message}
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>
