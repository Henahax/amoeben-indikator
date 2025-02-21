<script lang="ts">
	let { data } = $props();
</script>

<form class="grid grid-cols-[auto_1fr] gap-4">
	<label for="scale">Bewertung</label>
	<select id="scale">
		{#each data.scales as scale}
			<option value={scale.id}>{scale.name}</option>
		{/each}
	</select>

	<label for="comment">Kommentar</label>
	<textarea id="comment"></textarea>

	<label for="user">Benutzer</label>
	<select id="user">
		{#each data.users as user}
			<option value={user.id}>{user.username}</option>
		{/each}
	</select>

	<label for="password">Passwort</label>
	<input type="password" id="password" />

	<div class="col-span-full flex w-full">
		<button type="submit" class="grow border">Eintragen</button>
		<a href="/" class="border underline">Abbrechen</a>
	</div>
</form>
