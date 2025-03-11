<script lang="ts">
</script>

<div class="card">
	<form class="grid grid-cols-[auto_1fr] items-center gap-4">
		<label for="scale_ide">Bewertung</label>
		<select id="scaale_id">
			<option>a</option>
			<option>b</option>
		</select>
		<label for="comment">Kommentar</label>
		<textarea id="comment"></textarea>

		<a class="btn btn-secondary" href="/">Abbrechen</a>
		<button class="btn btn-primary" type="submit">Speichern</button>
	</form>
</div>

<style>
	.card {
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
	}
	input,
	select,
	textarea {
		border-radius: 0.5rem;
	}

	.btn {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
	}

	.btn-primary {
		background-color: #007bff;
		color: white;
	}

	.btn-secondary {
	}
</style>
