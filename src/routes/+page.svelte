<script lang="ts">
	import { scale } from 'svelte/transition';

	let { data }: { data: any } = $props();

	let score = $derived(getScore(data.entries));

	let highest = $derived(highestReached(data.scales, score));

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getScore(entries: any): number {
		let score = 0;
		let count = 0;

		if (!entries || entries.length === 0) return 0;

		entries.forEach((entry: any) => {
			score += entry.scales.value;
			count++;
		});

		return Math.round((score / count) * 100) / 100;
	}

	function highestReached(scales: any, score: number) {
		let highest = 0;

		if (!scales || scales.length === 0) return 0;

		scales.forEach((scale: any) => {
			if (score >= scale.value) {
				highest = scale.id;
			}
		});

		return highest;
	}
</script>

<div class="flex flex-col gap-32">
	<div class="flex flex-col text-center">
		<div class="flex flex-col">
			<div class="flex flex-col gap-2">
				<div class="grid w-full grid-cols-[auto_auto_auto_auto_auto_auto] justify-between">
					{#each data.scales as scale}
						<div
							class="flex flex-col items-center text-3xl {highest === scale.id
								? 'text-white-500 animate-pulse'
								: 'text-neutral-700'}"
						>
							<i class={scale.icon}></i>
							<p class="text-xl max-sm:hidden">{scale.name}</p>
						</div>
					{/each}
				</div>

				<progress value={score} class="w-full"></progress>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-8">
		<div class="flex justify-center">
			<a href="new" class="btn">Neuer Eintrag</a>
		</div>

		<div
			class="mx-auto grid w-fit grid-cols-[auto_auto_1fr] items-center gap-x-6 divide-y divide-neutral-500"
		>
			{#each data.entries as entry}
				<div class="col-span-3 grid grid-cols-subgrid items-center py-4">
					<div>
						<div class="text-lg">{entry.users.username}</div>
						<div class="text-sm">{formatDate(entry.entries.date)}</div>
					</div>
					<div class="text-center text-2xl">
						<i class={entry.scales.icon}></i>
						<div class="text-sm">{entry.scales.name}</div>
					</div>
					<div>
						{entry.entries.comment}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
