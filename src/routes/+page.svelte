<script lang="ts">
	let score = $state(0);

	score = 0.55;
</script>

<div class="flex w-full flex-col items-center">
	<h1 class="text-4xl">Amöben Indikator</h1>

	<p id="value">{score}</p>
	<meter
		id="indicator"
		class="h-8 w-full"
		low="0.33"
		high="0.85"
		optimum="1"
		value={score}
		title={score.toString()}
	></meter>

	<a href="/demo/lucia/login" class="underline">login</a>
</div>
