<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<form
	method="post"
	action="?/register"
	use:enhance
	class="mx-auto flex w-full max-w-sm flex-col gap-4"
>
	<h2 class="mx-auto text-xl">Registrierung</h2>
	<div class="flex flex-col">
		<label for="username">Benutzername</label>
		<input
			id="username"
			name="username"
			type="text"
			placeholder="Benutzername"
			autocomplete="username"
			minlength="3"
			maxlength="31"
			pattern="[a-zA-Z0-9_-]+"
			required
		/>
	</div>
	<div class="flex flex-col">
		<label for="password">Passwort</label>
		<input
			id="password"
			name="password"
			type="password"
			placeholder="Passwort"
			autocomplete="new-password"
			minlength="4"
			maxlength="255"
			required
		/>
	</div>
	<button class="btn btn-primary self-center"
		><i class="fa-solid fa-pen-to-square"></i>Registrieren</button
	>

	<p class="text-center text-sm">
		Das erste registrierte Konto erhält Adminrechte. Weitere Konten müssen von einem Administrator
		freigeschaltet werden.
	</p>
	<p class="text-center text-red-500">{form?.message ?? ''}</p>
</form>
