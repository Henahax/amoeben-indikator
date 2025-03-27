<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form, data }: { form: ActionData; data: any } = $props();
</script>

<form method="post" class="mx-auto flex w-full max-w-sm flex-col gap-4">
	<h2 class="mx-auto text-xl">Neuer Eintrag</h2>
	<div class="flex flex-col">
		<label for="value">Wert</label>
		<select id="value" name="value">
			{#each data.scales as scale}
				<option value={scale.id}>{scale.name}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col">
		<label for="comment">Kommentar</label>
		<textarea id="comment" name="comment" placeholder="Kommentar"></textarea>
	</div>
	<div class="flex flex-col items-center gap-2">
		<button class="btn btn-primary w-full">Senden</button>
		<a href="/" class="btn btn-secondary w-full text-center">Verwerfen</a>
	</div>
	<p style="color: red">{form?.message ?? ''}</p>
</form>
