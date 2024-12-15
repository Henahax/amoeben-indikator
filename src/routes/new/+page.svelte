<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';

	// The `data` prop is provided by the load function
	export let data;

	// Destructure the entries data
	const { users, scale } = data;
</script>

<h2 class="text-center text-2xl">Neuer Eintrag</h2>

<form class="mx-auto flex w-full max-w-screen-sm flex-col gap-4 p-4">
	<div>
		<Label>Name</Label>
		<Select.Root>
			<Select.Trigger>
				<Select.Value placeholder="Name auswählen" />
			</Select.Trigger>
			<Select.Content>
				{#each data.users as user}
					<Select.Item value={user.id}>{user.name}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div>
		<Label>Bewertung</Label>
		<Select.Root>
			<Select.Trigger>
				<Select.Value placeholder="Bewertung auswählen" />
			</Select.Trigger>
			<Select.Content>
				{#each data.scale as scaleItem}
					<Select.Item value={scaleItem.id}>
						<div class="flex gap-2 items-center">
							<i class="{scaleItem.icon} w-4"></i>
							{scaleItem.name}
						</div>
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div>
		<Label>Beschreibung</Label>
		<Textarea placeholder="Beschreibung eintragen" class="h-32"></Textarea>
	</div>
	<div>
		<Label>Passwort</Label>
		<Input type="password" placeholder="Passwort eingeben"></Input>
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
