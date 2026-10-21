<script lang="ts">
	import { resolve } from '$app/paths';
	import { calculateScore, getHighestReachedScaleId, getScaleThreshold } from '#lib/score.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let score = $derived(calculateScore(data.entries.map((entry) => entry.scales.value)));
	let highest = $derived(getHighestReachedScaleId(data.scales, score));

	function formatDate(date: Date): string {
		return date.toLocaleString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="flex flex-col gap-16">
	<div class="flex flex-col">
		<h1 class="py-8 text-center text-4xl font-semibold">Amöben-Indikator</h1>
		<div class="flex flex-col gap-2 py-8">
			<div class="grid w-full grid-cols-[auto_auto_auto_auto_auto_auto] justify-between">
				{#each data.scales as scale, iterator (scale.id)}
					<div
						class="flex flex-col items-center text-3xl font-semibold {highest === scale.id
							? 'primary'
							: 'text-neutral-300'}"
						title={'≥' + getScaleThreshold(iterator, data.scales.length)}
					>
						<i class={scale.icon}></i>
						<p class="text-base max-sm:hidden">{scale.name}</p>
					</div>
				{/each}
			</div>

			<progress
				value={score}
				max="1"
				class="w-full px-2 sm:px-6"
				title={score.toString()}
			></progress>
		</div>
	</div>
	<div class="flex flex-col gap-8">
		{#if data.user && data.user.users.roleId !== 3}
			<a href={resolve('new')} class="btn btn-primary self-center">
				<i class="fa-solid fa-plus"></i>
				Neuer Eintrag
			</a>
		{:else}
			<button class="btn btn-primary self-center" title="Bitte verifizieren lassen" disabled>
				<i class="fa-solid fa-plus"></i>
				Neuer Eintrag
			</button>
		{/if}

		<div
			class="mx-auto grid w-fit grid-cols-[auto_auto_1fr] items-center gap-x-4 divide-y sm:gap-x-6"
		>
			{#each data.entries as entry (entry.entries.id)}
				<div class="col-span-3 grid grid-cols-subgrid items-center py-4">
					<div>
						<div class="text-lg">
							{entry.entries.authorName ?? entry.users?.username ?? 'Unbekannt'}
						</div>
						<div class="text-xs">{formatDate(entry.entries.date)}</div>
					</div>
					<div class="primary text-center text-2xl">
						<i class={entry.scales.icon}></i>
						<div class="text-xs">{entry.scales.name}</div>
					</div>
					<div>
						{entry.entries.comment}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	h1 {
		color: var(--primary);
	}

	.primary {
		color: var(--primary);
	}

	progress[value]::-webkit-progress-bar {
		border-radius: 1rem;
		background-color: rgba(0, 0, 0, 0.25);
	}

	progress[value]::-webkit-progress-value {
		border-radius: 1rem;

		background-color: var(--primary);
	}
</style>
