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
	<h2 class="mx-auto text-xl">Login</h2>
	<div class="flex flex-col">
		<label for="username">Benutzername</label>
		<input id="username" name="username" type="text" placeholder="Benutzername" />
	</div>
	<div class="flex flex-col">
		<label for="password">Passwort</label>
		<input id="password" name="password" type="password" placeholder="Passwort" />
	</div>
	<div class="flex flex-col items-center gap-2">
		<button class="btn btn-primary"><i class="fa-solid fa-arrow-right-to-bracket"></i>Login</button>
	</div>

	<div class="flex flex-col items-center">
		<p class="text-sm">Noch kein Konto?</p>
		<a href="/register" class="btn btn-link">Registrieren</a>
	</div>
	<p class="text-center text-red-500">{form?.message ?? ''}</p>
</form>
