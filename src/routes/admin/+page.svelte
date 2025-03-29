<script lang="ts">
	let { data }: { data: any } = $props();

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	async function handleRoleChange(event: Event, userId: number) {
		const roleId = (event.target as HTMLSelectElement).value;
		const formData = new FormData();
		formData.append('userId', userId.toString());
		formData.append('roleId', roleId);

		await fetch('?/changeUserRole', {
			method: 'POST',
			body: formData
		});
	}

	function confirmDelete(event: Event, type: 'user' | 'entry') {
		const message =
			type === 'user'
				? 'Möchten Sie diesen Benutzer wirklich löschen?'
				: 'Möchten Sie diesen Eintrag wirklich löschen?';

		if (!confirm(message)) {
			event.preventDefault();
		}
	}
</script>

<div class="flex flex-col gap-16 py-4">
	<div
		class="grid w-fit grid-cols-[auto_auto_auto] items-center gap-x-4 divide-y self-center sm:gap-x-6"
	>
		<div class="col-span-full grid grid-cols-subgrid items-center px-2 text-sm">
			<div class="font-bold">Benutzer</div>
			<div class="font-bold">Rolle</div>
			<div></div>
		</div>
		{#each data.users as user}
			<div class="col-span-full grid grid-cols-subgrid items-center p-2 hover:bg-neutral-50">
				<div>{user.users.username}</div>
				<select
					class="text-sm"
					disabled={data.user.users.id === user.users.id}
					onchange={(e) => handleRoleChange(e, user.users.id)}
				>
					{#each data.roles as role}
						<option value={role.id} selected={user.users.roleId === role.id}>{role.name}</option>
					{/each}
				</select>
				{#if data.user.users.id !== user.users.id}
					<form action="?/deleteUser" onsubmit={(e) => confirmDelete(e, 'user')}>
						<input type="hidden" name="userId" value={user.users.id} />
						<button class="hover:text-neutral-500" aria-label="löschen" type="submit">
							<i class="fa-solid fa-trash-can"></i>
						</button>
					</form>
				{:else}
					<div></div>
				{/if}
			</div>
		{/each}
	</div>

	<div
		class="grid w-fit grid-cols-[auto_auto_auto] items-center gap-x-4 divide-y self-center sm:gap-x-6"
	>
		<div class="col-span-full grid grid-cols-subgrid items-center px-2 text-sm">
			<div class="flex flex-col font-bold">
				<span>Benutzer</span>
				<span>Datum</span>
			</div>
			<div class="flex flex-col font-bold">
				<span>Bewertung</span>
				<span>Kommentar</span>
			</div>
			<div></div>
		</div>
		{#each data.entries as entry}
			<div class="col-span-full grid grid-cols-subgrid items-center p-2 hover:bg-neutral-50">
				<div class="flex flex-col">
					<span>{entry.users.username}</span>
					<span class="text-xs">{formatDate(entry.entries.date)}</span>
				</div>
				<div class="flex flex-col">
					<span class="flex items-center gap-2"
						><i class={entry.scales.icon}></i>{entry.scales.name}</span
					>
					<span class="text-xs">{entry.entries.comment}</span>
				</div>
				<form action="?/deleteEntry" method="POST" onsubmit={(e) => confirmDelete(e, 'entry')}>
					<input type="hidden" name="entryId" value={entry.entries.id} />
					<button class="hover:text-neutral-500" aria-label="löschen" type="submit">
						<i class="fa-solid fa-trash-can"></i>
					</button>
				</form>
			</div>
		{/each}
	</div>
</div>
