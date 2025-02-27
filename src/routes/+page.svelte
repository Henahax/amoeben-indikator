<script lang="ts">
	let { data } = $props();

	let score = $derived(getScore(data));

	let highestReached = $derived(getHighestReached(data, score));

	function getHighestReached(data: any, score: number) {
		let highest: { id: string; value: number } | undefined;

		data.scales.forEach((scale: any) => {
			if (score >= scale.value - 0.1) {
				highest = scale;
			}
		});

		if (highest) {
			return highest.id;
		}

		return data.scales[0].id;
	}

	function getScore(data: any) {
		if (data.entries.length === 0) {
			return 0;
		}
		let totalScore = 0;

		data.entries.forEach((entry: any) => {
			const scale = data.scales.find((scale: any) => scale.id === entry.entries.scaleId);
			if (scale) {
				totalScore += scale.value ?? 0;
			}
		});

		return Number((totalScore / data.entries.length).toFixed(2));
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

<div class="flex w-full flex-col items-center gap-8">
	<h1 class="text-4xl">Amöben Indikator</h1>

	<section>
		<div class="flex w-full justify-between">
			{#each data.scales as scale}
				<div
					class="grid grid-cols-1 place-items-center text-3xl {scale.id === highestReached
						? 'text-green-500'
						: 'opacity-25'}"
					title={scale.name}
				>
					<i class={scale.icon}></i>
					<span class="hidden text-lg font-bold sm:block">{scale.name}</span>
				</div>
			{/each}
		</div>
		<meter
			id="indicator"
			class="h-8 w-full"
			low="0.25"
			high="0.75"
			optimum="1"
			value={score}
			title={score.toString()}
		>
		</meter>
	</section>

	<section class="flex flex-col items-center gap-8 p-4">
		<a href="/demo/lucia/login" class="w-fit underline">Neuer Eintrag</a>

		<div class="grid grid-cols-[auto_auto_1fr] items-center gap-8">
			{#each data.entries as entry}
				<div class="flex flex-col items-center justify-center">
					<span>{entry.users?.username}</span>
					<div class="inline-flex flex-wrap justify-center gap-x-2">
						<span>{formatDate(entry.entries.timestamp ?? '')}</span>
						<span>{formatTime(entry.entries.timestamp ?? '')}</span>
					</div>
				</div>
				<div class="flex flex-col items-center justify-center text-2xl">
					<i class={data.scales.find((scale) => scale.id === entry.entries.scaleId)?.icon}></i>
					<span class="text-base"
						>{data.scales.find((scale) => scale.id === entry.entries.scaleId)?.name}</span
					>
				</div>

				<div>{entry.entries.comment}</div>
			{/each}
		</div>
	</section>
</div>

<style>
	section {
		width: 100%;
	}
</style>
