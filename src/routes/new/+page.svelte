<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form, data }: { form: ActionData; data: any } = $props();
</script>

<form method="post" action="?/new" use:enhance class="mx-auto flex w-full max-w-sm flex-col gap-4">
	<h2 class="mx-auto text-xl">Neuer Eintrag</h2>
	<div class="flex flex-col">
		<label for="value">Bewertung</label>
		<select id="value" name="value">
			{#each data.scales as scale}
				<option value={scale.id}>
					{scale.name}
				</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col">
		<label for="comment">Kommentar</label>
		<textarea id="comment" name="comment" placeholder="Kommentar"></textarea>
	</div>

	<button class="btn btn-primary self-center"><i class="fa-solid fa-paper-plane"></i>Senden</button>

	<p class="text-center text-red-500">{form?.message ?? ''}</p>
</form>
