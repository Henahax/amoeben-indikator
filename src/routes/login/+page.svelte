<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<form
	method="post"
	action="?/login"
	use:enhance
	class="mx-auto flex w-full max-w-sm flex-col gap-4"
>
	<h2 class="mx-auto text-xl">Login/Registrieren</h2>
	<div class="flex flex-col">
		<label for="username">Benutzername</label>
		<input id="username" name="username" type="text" placeholder="Benutzername" />
	</div>
	<div class="flex flex-col">
		<label for="password">Passwort</label>
		<input id="password" name="password" type="password" placeholder="Passwort" />
	</div>
	<div class="flex flex-col items-center gap-2">
		<button class="btn btn-primary w-full">Anmelden</button>
		<button formaction="?/register" class="btn btn-secondary w-full">Registrieren</button>
	</div>
	<p style="color: red">{form?.message ?? ''}</p>
</form>
