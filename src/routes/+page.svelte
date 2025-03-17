<script lang="ts">
	import type { PageProps } from './$types';

	interface PageData {
		scales: { name: string; icon: string }[];
	}

	let { data }: { data: PageData } = $props();
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

		<div class="grid grid-cols-[auto_auto_1fr] items-center gap-x-6 divide-y divide-neutral-500">
			<!--each-->
			<div class="col-span-3 grid grid-cols-subgrid items-center p-4">
				<div>
					<div class="text-lg">Henahax</div>
					<div class="text-sm">01.01.2025</div>
				</div>
				<div class="text-center text-2xl">
					<i class="fa-solid fa-house"></i>
					<div class="text-sm">Baum</div>
				</div>
				<div>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
					invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
					accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
					sanctus est Lorem ipsum dolor sit amet.
				</div>
			</div>
			<!--next each-->
			<div class="col-span-3 grid grid-cols-subgrid items-center p-4">
				<div>
					<div class="text-lg">Henahax</div>
					<div class="text-sm">01.01.2025</div>
				</div>
				<div class="text-center text-2xl">
					<i class="fa-solid fa-house"></i>
					<div class="text-sm">Baum</div>
				</div>
				<div>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
					invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
					accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
					sanctus est Lorem ipsum dolor sit amet.
				</div>
			</div>
			<!--end each-->
		</div>
	</div>
</div>
