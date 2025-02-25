<script lang="ts">
	let { data } = $props();

	let highestReached = $derived(getHighestReached(data));

	function getHighestReached(data: any) {
		let highest: { id: string; value: number } | undefined;

		data.scales.forEach((scale: any) => {
			if (data.score >= scale.value) {
				highest = scale;
			}
		});

		if (highest) {
			return highest.id;
		}

		return data.scales[0].id;
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}

	function formatTime(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleString('de-DE', {
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="flex w-full flex-col items-center gap-16">
	<section class="flex w-full flex-col items-center gap-8">
		<h1 class="text-4xl">Amöben Indikator</h1>
		<div class="flex w-full justify-between">
			{#each data.scales as scale}
				<div
					class={`grid grid-cols-1 place-items-center text-3xl ${scale.id === highestReached ? 'highest-reached' : 'opacity-25'}`}
					title={scale.name}
				>
					<i class={`${scale.icon} ${scale.id === highestReached ? 'animate-pulse' : ''}`}></i>
					<span class="hidden text-base font-bold sm:block">{scale.name}</span>
				</div>
			{/each}
		</div>
		<meter
			id="indicator"
			low="0.4"
			high="0.8"
			optimum="1"
			value={data.score}
			title={data.score.toString()}
		>
		</meter>
	</section>

	<section class="flex w-full flex-col items-center gap-8">
		<a href="/new" class="button button-primary">Neuer Eintrag</a>

		<div class="card w-fit px-6 py-2">
			<div class="grid grid-cols-[auto_auto_1fr] items-center divide-y divide-neutral-500">
				{#each data.entries as entry}
					<div class="col-span-full grid grid-cols-subgrid items-center gap-4 py-4 sm:gap-8">
						<div class="flex flex-col">
							<span>{entry.users?.username}</span>
							<div class="text-xs text-neutral-500">
								<span>{formatDate(entry.entries.timestamp ?? '')}</span>
								<span>{formatTime(entry.entries.timestamp ?? '')}</span>
							</div>
						</div>
						<div class="flex flex-col items-center text-lg">
							<i class={data.scales.find((scale) => scale.id === entry.entries.scaleId)?.icon}></i>
							<span class="text-base"
								>{data.scales.find((scale) => scale.id === entry.entries.scaleId)?.name}</span
							>
						</div>

						<div>{entry.entries.comment}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	section {
		width: 100%;
	}

	.highest-reached {
		color: var(--color-business-indigo-500);
	}

	meter {
		height: 2rem;
		width: 100%;
		opacity: 0.75;
	}

	meter::-webkit-meter-bar {
		background: var(--color-neutral-800);
	}

	meter::-webkit-meter-optimum-value {
		background: green;
	}

	meter::-webkit-meter-suboptimum-value {
		background: yellow;
	}

	meter::-webkit-meter-even-less-good-value {
		background: red;
	}
</style>
