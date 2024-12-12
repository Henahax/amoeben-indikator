<script lang="ts">
	let { value = 0, currentValue = 0, children } = $props();
	let isActive = $state(false);

	if (currentValue >= value && parseFloat((currentValue - value).toFixed(2)) < 0.2) {
		isActive = true;
	}
</script>

<li class="step {currentValue >= value ? 'step-primary' : ''}" data-content="">
	<div class="flex items-center gap-2 text-2xl {isActive ? 'text-primary animate-pulse' : ''}">
		{@render children?.()}
	</div>
</li>
