<script lang="ts">
	import type { PageProps } from './$types';

	interface PageData {
		scales: { name: string; icon: string }[];
	}

	let { data }: { data: PageData } = $props();

	const entries = [
		{
			user: 'Henahax',
			scaleId: 3,
			timestamp: '2024-12-09T09:55:02.235Z',
			comment: 'Kaffee verschüttet'
		},
		{
			user: 'Waetsch',
			scaleId: 2,
			timestamp: '2024-12-10T16:22:40Z',
			comment: 'Wieder Unmengen an unsinningen Nahrungsmitteln auf dem Tisch'
		}
	];

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
</script>

<div class="flex flex-col gap-32">
	<div class="flex flex-col text-center">
		<div class="flex flex-col">
			<h1 class="py-16 text-5xl">Amöben-Indikator</h1>

			<div class="flex flex-col gap-2">
				<div class="grid w-full grid-cols-[auto_auto_auto_auto_auto_auto] justify-between">
					{#each data.scales as item}
						<div class="flex flex-col items-center text-3xl">
							<i class={item.icon}></i>
							<p class="text-xl max-sm:hidden">{item.name}</p>
						</div>
					{/each}
				</div>

				<progress value="0.5" class="w-full"></progress>
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
			{#each entries as entry}
				<div class="col-span-3 grid grid-cols-subgrid items-center py-4">
					<div>
						<div class="text-lg">{entry.user}</div>
						<div class="text-sm">{formatDate(entry.timestamp)}</div>
					</div>
					<div class="text-center text-2xl">
						<i class="fa-solid fa-house"></i>
						<div class="text-sm">Baum</div>
					</div>
					<div>
						{entry.comment}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
