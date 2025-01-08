<script lang="ts">
</script>

<section>
	<h1 class="text-5xl text-center">Amöben Indikator</h1>
	<div class="flex flex-col gap-2">
		<ul class="flex flex-row justify-between">
			<li class="flex flex-col items-center text-2xl"><i class="fa-brands fa-github"></i>test1</li>
			<li class="flex flex-col items-center text-2xl"><i class="fa-brands fa-github"></i>test1</li>
		</ul>
		<progress value="0.5" max="1" class="h-8 w-full"></progress>
	</div>
</section>
<section>
	<ul>
		<li>test1</li>
		<li>test2</li>
	</ul>
</section>

<style>
	progress[value]::-webkit-progress-bar {
		background-color: #eee;
		border-radius: 2px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
	}
</style>
