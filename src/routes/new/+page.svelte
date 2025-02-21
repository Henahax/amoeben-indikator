<script lang="ts">
	let { data } = $props();
</script>

<form class="grid w-full max-w-md grid-cols-[auto_1fr] gap-4">
	<label for="scale">Bewertung</label>
	<select id="scale">
		{#each data.scales as scale}
			<option value={scale.id}>{scale.name}</option>
		{/each}
	</select>

	<label for="comment">Kommentar</label>
	<textarea id="comment" class="min-h-32"></textarea>

	<label for="user">Benutzer</label>
	<select id="user">
		{#each data.users as user}
			<option value={user.id}>{user.username}</option>
		{/each}
	</select>

	<label for="password">Passwort</label>
	<input type="password" id="password" />

	<div class="col-span-full flex w-full gap-4">
		<button type="submit" class="button button-primary grow">Eintragen</button>
		<a href="/" class="button button-secondary">Abbrechen</a>
	</div>
</form>
