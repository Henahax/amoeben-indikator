<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import { scorer } from '$lib/state/score.svelte.js';

	let { data } = $props();
	const { entries, scale } = data;

	scorer.score = Number(getScore(data.entries));

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
						? 'animate-pulse font-bold'
						: 'opacity-25'}"
				>
					<i class="{scaleItem.icon} {isActive(index) ? 'text-3xl' : ''}"></i>
					<p class="hidden sm:block">{scaleItem.name}</p>
				</li>
			{/each}
		</ul>
		<Progress value={scorer.score * 100} title={"aktueller Wert: " + scorer.score.toString()} />
	</section>

	<section class="flex flex-col gap-8">
		<div class="mx-auto grid w-fit grid-cols-[auto_1fr] gap-16 sm:gap-8">
			{#each data.entries as entry}
				<div class="grid grid-cols-1 sm:grid-cols-2 content-center gap-y-2 gap-x-8">
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
				<div class="flex items-center">
					{entry.description}
				</div>
			{/each}
		</div>
		<Button class="mx-auto w-fit" href="/new">Neuer Eintrag</Button>
	</section>
</div>
