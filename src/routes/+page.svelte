<script lang="ts">
	let score = $state(0);

	let { data } = $props();

	console.log(data.entries);

	score = 0.55;
</script>

<div class="flex w-full flex-col items-center">
	<h1 class="text-4xl">Amöben Indikator</h1>

	<p id="value">{score}</p>

	<div class="flex w-full justify-between">
		{#each data.scales as scale}
			<div
				class="grid grid-cols-1 place-items-center text-4xl opacity-25"
				title={'≥ ' + scale.value}
			>
				<i class={scale.icon}></i>
				<span class="hidden text-lg font-bold sm:block">{scale.name}</span>
			</div>
		{/each}
	</div>
	<meter
		id="indicator"
		class="h-8 w-full"
		low="0.33"
		high="0.85"
		optimum="1"
		value={score}
		title={score.toString()}
	>
	</meter>

	<div class="flex flex-col">
		{#each data.entries as entry}
			<div>
				<div>{entry.entries.scaleId}</div>
				<div>{entry.entries.comment}</div>
			</div>
		{/each}
	</div>

	<a href="/demo/lucia/login" class="underline">login</a>
</div>
