import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { store } from '$lib/store.svelte.js';
import bcrypt from 'bcrypt'
import entries from '$lib/entries.json';
import * as fs from "fs";
import type { entry } from '$lib/types';

export const actions = {
	default: async ({ request }) => {

		let data = await request.formData();

		let userId = Number(data.get("user_id"));
		let scaleId = Number(data.get("scale_id"));
		let description = data.get("description")?.toString();
		let password = data.get("password")?.toString();

		if(userId < 1){
			return fail(400, {userId, userInvalid: true, scaleId, description});
		}

		if(scaleId < 1){
			return fail(400, {scaleId, scaleInvalid: true, userId, description});
		}

		if(!description || description.length < 1){
			return fail(400, {description, descriptionInvalid: true, userId, scaleId});
		}
		
		if(!password || password.length < 1){
			return fail(400, {password, passwordInvalid: true, userId, scaleId, description});
		}

		const user = store.users.find(user => user.id === userId);

		if (!user || !(await bcrypt.compareSync(password, user.password))) {
			return fail(400, {password, passwordInvalid: true, userId, scaleId, description});
		}

		let entry:entry = { "user_id" : userId, "scale_id" : scaleId, "date" : new Date().toISOString(), "description" : description };
		entries.push(entry);
		fs.writeFileSync("entries.json", JSON.stringify(entries));
		store.entries = entries;

		redirect(303, "/");
	}
} satisfies Actions;
