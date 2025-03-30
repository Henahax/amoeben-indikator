<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<form
	method="post"
	action="?/register"
	use:enhance
	class="p mx-auto flex w-full max-w-sm flex-col gap-4"
>
	<h2 class="mx-auto text-xl">Registrierung</h2>
	<div class="flex flex-col">
		<label for="username">Benutzername</label>
		<input id="username" name="username" type="text" placeholder="Benutzername" />
	</div>
	<div class="flex flex-col">
		<label for="password">Passwort</label>
		<input id="password" name="password" type="password" placeholder="Passwort" />
	</div>
	<button class="btn btn-primary self-center"
		><i class="fa-solid fa-pen-to-square"></i>Registrieren</button
	>

	<p class="text-center text-sm">
		Bitte nach dem Registrieren bei Tobias Bescheid geben, damit das Konto freigeschalten werden
		kann.
	</p>
	<p class="text-center text-red-500">{form?.message ?? ''}</p>
</form>
