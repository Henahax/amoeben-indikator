<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';

	import bcrypt from 'bcryptjs';

	export let data;
	const { users, scale } = data;

	let selectedUser = 0;
	let selectedScale = 0;
	let description = '';
	let password = '';

	async function hashPassword(password: string) {
		return await bcrypt.hash(password, 10);
	}

	async function validatePassword(userid: number, password: string): Promise<boolean> {
		let userHash = '';

		users.forEach((user) => {
			if (user.id === userid) {
				userHash = user.password;
			}
		});

		if (userHash.length === 0) {
			return false;
		}

		const passwordHash = await hashPassword(password);

		return passwordHash === userHash;
	}

	async function send(userid: number, password: string) {
		try {
			const isValid = await validatePassword(userid, password);

			if (!isValid) {
				alert('Nö');
				return;
			}

			const entry = {
				user_id: selectedUser,
				scale_id: selectedScale,
				description
			};

			//await createEntry(entry);

			alert('Entry created successfully!');
		} catch (error) {
			console.error('Error during send:', error);
			alert('Something went wrong. Please try again later.');
		}
	}
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
				<Select.Item disabled value={0}>weitere auf Anfrage</Select.Item>
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
				{#each scale as scaleItem}
					<Select.Item value={scaleItem.id}>
						<div class="flex items-center gap-2">
							<i class="{scaleItem.icon} w-4 text-center"></i>
							{scaleItem.name}
						</div>
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div>
		<Label>Beschreibung</Label>
		<Textarea placeholder="Beschreibung eintragen" class="h-32" bind:value={description}></Textarea>
	</div>
	<div>
		<Label>Passwort</Label>
		<Input type="password" placeholder="Passwort eingeben" bind:value={password}></Input>
	</div>
	<div class="buttonrow">
		<Button variant="outline" href="../">Zurück</Button>
		<Button class="w-full" type="submit" onclick={() => send(1, 'test')}>Senden</Button>
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
