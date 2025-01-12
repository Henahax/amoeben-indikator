<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';

	import { store } from '$lib/store.svelte.js';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let selectedUserId: number = $state(form?.userId || 0);
	let selectedScaleId: number = $state(form?.scaleId || 0);
	let description: string = $state(form?.description || '');

</script>

<form class="mx-auto flex w-full max-w-screen-sm flex-col gap-4 p-4" method="POST">
	<h2 class="text-center text-2xl">Neuer Eintrag</h2>
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
		<Textarea placeholder="Beschreibung eintragen" class="h-32" name="description" bind:value={description}></Textarea>
	</div>
	<div>
		<Label>Passwort</Label>
		<Input type="password" placeholder="Passwort eingeben" name="password"></Input>
	</div>
	{#if form?.userInvalid}
		<p class="rounded border border-red-500 p-2 px-4 text-red-500">Bitte Name auswählen</p>
	{/if}
	{#if form?.scaleInvalid}
		<p class="rounded border border-red-500 p-2 px-4 text-red-500">Bitte Bewertung auswählen</p>
	{/if}
	{#if form?.descriptionInvalid}
		<p class="rounded border border-red-500 p-2 px-4 text-red-500">Bitte Beschreibung angeben</p>
	{/if}
	{#if form?.passwordInvalid}
		<p class="rounded border border-red-500 p-2 px-4 text-red-500">Falsches Passwort</p>
	{/if}
	<div class="buttonrow">
		<Button variant="outline" href="../">Zurück</Button>
		<Button class="w-full" type="submit">Senden</Button>
	</div>
</form>

<style>
	.buttonrow {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		width: 100%;
	}
</style>
