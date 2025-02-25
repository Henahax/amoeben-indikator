<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<form class="card flex w-full max-w-2xl flex-col gap-8 p-6" method="post">
	<div class="w-full text-xl">Neuer Eintrag</div>
	<div class="grid w-full grid-cols-[auto_1fr] gap-4">
		<label for="scale">Bewertung</label>
		<select id="scale" name="scale">
			{#each data.scales as scale}
				<option value={scale.id}>{scale.name}</option>
			{/each}
		</select>

		<label for="comment">Kommentar</label>
		<textarea id="comment" name="description" class="min-h-32"></textarea>

		<label for="user">Benutzer</label>
		<select id="user" name="user">
			{#each data.users as user}
				<option value={user.id}>{user.username}</option>
			{/each}
		</select>

		<label for="password">Passwort</label>
		<input type="password" id="password" name="password" />
	</div>
	<div class="flex w-full gap-4">
		<button type="submit" class="button button-primary grow">Eintragen</button>
		<a href="/" class="button button-secondary">Abbrechen</a>
	</div>
</form>

<style>
	label {
		color: var(--color-neutral-500);
	}
</style>
