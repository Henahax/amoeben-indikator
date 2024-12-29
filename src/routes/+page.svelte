<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import { scorer } from '$lib/state/score.svelte.js';

	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let { data } = $props();
	const { entries, scale } = data;

	scorer.score = Number(getScore(data.entries));

	let progress = $state(
		new Tween(0, {
			delay: 0,
			duration: 2500,
			easing: cubicOut
		})
	);

	progress.target = scorer.score * 100;

	function getScore(stuff: any) {
		if (stuff.length === 0) {
			return 0;
		}
		let score: number = 0;
		stuff.forEach((item: any) => {
			score += Number(item.scaleValue); // Ensure scaleValue is a number
		});
		return Number((score / stuff.length).toFixed(2)); // Round to 2 decimal places
	}

	function isActive(index: number) {
		let highestReached = 0;
		scale.forEach((item, iterator) => {
			if (scorer.score >= Number(item.value)) {
				highestReached = iterator;
			}
		});

		return highestReached === index;
	}
</script>

<div class="flex flex-col gap-16">
	<h1 class="text-center text-4xl font-bold">Amöben-Indikator</h1>

	<section class="mx-auto flex w-full max-w-screen-lg flex-col gap-2">
		<ul class="flex items-end justify-between p-2 text-lg">
			{#each scale as scaleItem, index}
				<li
					title={scaleItem.name + ', ≥ ' + Number(scaleItem.value).toString()}
					class="flex flex-col items-center {isActive(index)
						? 'text-primary animate-pulse font-bold'
						: 'opacity-25'}"
				>
					<i class="{scaleItem.icon} {isActive(index) ? 'text-3xl' : ''}"></i>
					<p class="hidden sm:block">{scaleItem.name}</p>
				</li>
			{/each}
		</ul>
		<Progress value={progress.current} title={'aktueller Wert: ' + scorer.score} />
	</section>

	<section class="flex flex-col gap-8">
		<ul class="divide-y divide-neutral-500 divide-opacity-25">
			{#each data.entries as entry}
				<li class="grid grid-cols-[auto_auto_1fr] gap-x-16 gap-y-8 py-4">
					<div class="grid-subgrid grid grid-cols-1 content-center gap-x-8 gap-y-2 sm:grid-cols-2 col-span-2 sm:col-span-1">
						<div class="flex flex-col justify-center">
							<div>{entry.userName}</div>
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
							<i class="{entry.scaleIcon} text-xl"></i>
							{entry.scaleName}
						</div>
					</div>

					<div class="flex items-center text-sm">
						{entry.description}
					</div>
				</li>
			{/each}
		</ul>
	</section>
</div>
<div class="sticky bottom-0 w-full flex justify-end py-4">
	<Button class="w-fit" href="/new">Neuer Eintrag</Button>
</div>