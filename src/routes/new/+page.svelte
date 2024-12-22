<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';

	import bcrypt from 'bcryptjs';

	let {data} = $props();

	const { users, scale } = data;

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
		console.log(password);
		console.log(userHash);
		console.log(passwordHash);

		return passwordHash === userHash;
	}

	let selectedUserId:number = $state(0);
    let selectedScaleId:number = $state(0);
</script>

<h2 class="text-center text-2xl">Neuer Eintrag</h2>

<form class="mx-auto flex w-full max-w-screen-sm flex-col gap-4 p-4" method="POST" action="/new">
	<div>
		<!-- TODO: Bind value -->

		<Label>Name</Label>
		<Select.Root name="user_id" onSelectedChange={(v) => {
			v && (selectedUserId = v.value);
		  }}>
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
		<input type="hidden" name="user_id" value={selectedUserId} />
	</div>
	<div>
		<Label>Bewertung</Label>
		<Select.Root name="scale_id" onSelectedChange={(v) => {
			v && (selectedScaleId = v.value);
		  }}>
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
