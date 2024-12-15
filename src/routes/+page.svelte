<script lang="ts">
	//export let data
	//console.log(data.result);
	import { Button } from '$lib/components/ui/button';
    import { Separator } from "$lib/components/ui/separator";
</script>

<div class="flex flex-col gap-8">
	<h1 class="text-center text-4xl">Amöben-Indikator</h1>
	<div class="flex flex-col gap-8">
		<div>Speedometer</div>
		<div class="flex flex-col gap-4">
			<ul>
				<li class="flex items-center gap-8">
					<div class="flex flex-col">
						<div>Name</div>
						<div class="text-sm">Date Date Date Date</div>
					</div>
                    <Separator orientation="vertical" />
					<div class="flex flex-row gap-4">
						<div>Icon</div>
						<div>Amöbe</div>
					</div>
                    <Separator orientation="vertical" />
					<div>Text</div>
				</li>
                <Separator orientation="horizontal" />
			</ul>
			<Button class="mx-auto w-fit" href="/new">Neuer Eintrag</Button>
		</div>
	</div>
</div>
