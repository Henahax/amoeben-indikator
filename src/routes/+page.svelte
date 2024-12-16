<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {scorer} from '$lib/state/score.svelte.js'

	// The `data` prop is provided by the load function
	let { data } = $props();
	// Destructure the entries data
	const { entries } = data;

	scorer.score = Number(getScore(data.entries));

	function getScore(stuff: any) {
		if (stuff.length === 0) {
			return 0;
		}
		let score: number = 0;
		stuff.forEach((item:any) => {
			score += Number(item.scaleValue); // Ensure scaleValue is a number
		});
		return Number((score / stuff.length).toFixed(2)); // Round to 2 decimal places
	}
</script>

<div class="flex flex-col gap-8">
	<h1 class="text-center text-4xl font-bold">Amöben-Indikator</h1>
	<p class="mx-auto">Aktueller Wert: {scorer.score}</p>
	<div class="flex flex-col gap-8">
		<div class="gridContainer mx-auto grid w-fit gap-8">
			{#each data.entries as entry}
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
				<div class="flex items-center gap-4 font-bold">
					<i class="{entry.scaleIcon} text-xl"></i>
					{entry.scaleName}
				</div>
				<div class="flex items-center">
					{entry.description}
				</div>
			{/each}
		</div>
		<Button class="mx-auto w-fit" href="/new">Neuer Eintrag</Button>
	</div>
</div>

<style>
	.gridContainer {
		grid-template-columns: auto auto 1fr;
	}
</style>
