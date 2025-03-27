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

	console.log(data.entries);
</script>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Rolle</th>
		</tr>
	</thead>
	<tbody>
		{#each data.users as user}
			<tr>
				<td>{user.users.username}</td>
				<td><i class={user.roles.icon}></i>{user.roles.name}</td>
			</tr>
		{/each}
	</tbody>
</table>

<table>
	<thead>
		<tr>
			<th>Datum</th>
			<th>Benutzer</th>
			<th>Bewertung</th>
		</tr>
	</thead>
	<tbody>
		{#each data.entries as entry}
			<tr>
				<td>{formatDate(entry.entries.date)}</td>
				<td>{entry.users.username}</td>
				<td><i class={entry.scales.icon}></i>{entry.scales.name}</td>

				<td><button><i class="fa-solid fa-trash"></i></button></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		text-align: left;
		width: fit-content;
		border-spacing: 1rem;
	}

	th,
	td {
	}
</style>
