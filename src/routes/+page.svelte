<script lang=ts>
    import IndicatorScaleItem from '$lib/components/IndicatorScaleItem.svelte';
	import scale from '$lib/scale.json';

    let { currentValue = 0 } = $props();
    currentValue = 0.6;
</script>

<h1>Welcome to SvelteKit</h1>

<ul class="steps steps-vertical">
	{#each scale.toReversed() as scaleItem}
		<IndicatorScaleItem value={scaleItem.value} currentValue={currentValue}>
			<i class="{scaleItem.icon} w-10"></i>
			{scaleItem.name}
		</IndicatorScaleItem>
	{/each}
</ul>
