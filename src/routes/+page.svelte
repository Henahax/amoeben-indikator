<script lang="ts">
	const entries = [
		{
			name: 'Eintrag 1'
		},
		{
			name: 'Eintrag 2'
		},
		{
			name: 'Eintrag 3'
		}
	];
</script>

<svelte:head>
	<title>Amöben Indikator</title>
</svelte:head>

<section>
	<h1>Home</h1>
</section>
<section>
	<a href="/new">Neuer Eintrag</a>
	<div class="flex flex-col">
		{#each entries as entry}
			<div class="flex flex-row">
				<div>{entry.name}</div>
			</div>
		{/each}
	</div>
</section>

<style>
</style>
