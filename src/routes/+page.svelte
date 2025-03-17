<script lang="ts">
	import type { PageProps } from './$types';

	interface PageData {
		scales: { name: string; icon: string }[];
	}

	let { data }: { data: PageData } = $props();
</script>

<section class="flex flex-col gap-8 text-center">
	<h1 class="text-5xl">Amöben-Indikator</h1>
	<div class="flex flex-col gap-2">
		<div class="grid w-full grid-cols-[auto_auto_auto_auto_auto_auto] justify-between">
			{#each data.scales as item}
				<div class="flex flex-col items-center text-4xl">
					<i class={item.icon}></i>
					<p class="text-xl max-sm:hidden">{item.name}</p>
				</div>
			{/each}
		</div>
		<progress value="0.5" class="w-full"></progress>
	</div>
</section>
<section></section>
