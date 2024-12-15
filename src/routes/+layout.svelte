<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import {Button} from '$lib/components/ui/button'
</script>

<app class="flex min-h-dvh flex-col">
	<main class="grow content-center mx-auto">
		{@render children()}
	</main>
	<footer class="flex justify-end text-xs">
		<Button size="sm" variant="ghost" href="https://github.com/Henahax/amoeben-indikator">
			<span class="flex gap-2 items-center text-xs">
				<i class="fa-brands fa-github"></i>
				Sourcecode
			</span>
		</Button>
	</footer>
</app>
