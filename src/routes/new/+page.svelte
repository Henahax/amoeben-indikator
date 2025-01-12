<script lang="ts">
	import { goto } from '$app/navigation';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';

    import { store } from '$lib/store.svelte.js';

	let selectedUserId: number = $state(0);
	let selectedScaleId: number = $state(0);


	async function handleSubmit(event: Event) {

		console.log('test')

		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);


		console.log(formData)

		const response = await fetch('/new', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			const result = await response.json();

			if (result.type === 'success') {
				goto('/');
				return;
			}
		}
		console.error('Failed to submit form');
	}
</script>

<h2 class="text-center text-2xl">Neuer Eintrag</h2>

<form
	class="mx-auto flex w-full max-w-screen-sm flex-col gap-4 p-4"
	method="POST"
	onsubmit={handleSubmit}
>
	<div>
		<Label>Name</Label>
		<Select.Root
			name="user_id"
			onSelectedChange={(v) => {
				v && (selectedUserId = v.value as number);
			}}
		>
			<Select.Trigger>
				<Select.Value placeholder="Name auswählen" />
			</Select.Trigger>
			<Select.Content>
				{#each store.users as user}
					<Select.Item value={user.id}>{user.name}</Select.Item>
				{/each}
				<Select.Item disabled value={0}>weitere auf Anfrage</Select.Item>
			</Select.Content>
		</Select.Root>
		<input type="hidden" name="user_id" value={selectedUserId} />
	</div>
	<div>
		<Label>Bewertung</Label>
		<Select.Root
			name="scale_id"
			onSelectedChange={(v) => {
				v && (selectedScaleId = v.value as number);
			}}
		>
			<Select.Trigger>
				<Select.Value placeholder="Bewertung auswählen" />
			</Select.Trigger>
			<Select.Content>
				{#each store.scales as scale}
					<Select.Item value={scale.id}>
						<div class="flex items-center gap-2">
							<i class="{scale.icon} w-4 text-center"></i>
							{scale.name}
						</div>
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<input type="hidden" name="scale_id" value={selectedScaleId} />
	</div>
	<div>
		<Label>Beschreibung</Label>
		<Textarea placeholder="Beschreibung eintragen" class="h-32" name="description"></Textarea>
	</div>
	<div>
		<Label>Passwort</Label>
		<Input type="password" placeholder="Passwort eingeben" name="password"></Input>
	</div>
	<div class="buttonrow">
		<Button variant="outline" href="../">Zurück</Button>
		<Button class="w-full" type="submit">Senden</Button>
	</div>
</form>

<style>
	form div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.buttonrow {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		width: 100%;
	}
</style>
