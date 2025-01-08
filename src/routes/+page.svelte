<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';
	import scale from '$lib/scale.json';
	import users from '$lib/users.json';
	import entries from '$lib/entries.json';
</script>

<section class="flex flex-col gap-8">
	<h1 class="text-center text-4xl">Amöben Indikator</h1>
	<div class="flex flex-col gap-4 sm:gap-2">
		<ul class="flex flex-row justify-between">
			{#each scale as scaleItem}
				<li class="flex flex-col items-center text-xl" title="≥{scaleItem.value}">
					<i class={scaleItem.icon}></i>
					<div class="text-lg hidden sm:block">
						{scaleItem.name}
					</div>
				</li>
			{/each}
		</ul>
		<Progress value={0.5} max={1} class="h-8 w-full" />
	</div>
</section>
<section>
	<ul class="mx-auto w-fit divide-y divide-neutral-500 divide-opacity-25">
		{#each entries.sort(function (a, b) {
			return new Date(b.date) - new Date(a.date);
		}).slice(0,5) as entry}
			<li class="grid grid-cols-[auto_auto_1fr] gap-x-8 gap-y-8 py-4">
				<div
					class="grid-subgrid col-span-2 grid grid-cols-1 content-center gap-x-8 gap-y-2 sm:col-span-1 sm:grid-cols-2"
				>
					<div class="flex flex-col justify-center">
						<div>
							{users.find((user) => user.id === entry.user_id).name}
						</div>
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
						<i class={scale.find((scaleItem) => entry.scale_id === scaleItem.id).icon}></i>
						{scale.find((scaleItem) => entry.scale_id === scaleItem.id).name}
					</div>
				</div>

				<div class="flex items-center text-sm">
					{entry.message}
				</div>
			</li>
		{/each}
	</ul>
</section>
