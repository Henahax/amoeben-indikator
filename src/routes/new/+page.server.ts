import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {

		let data = await request.formData();

		let userId = data.get("user_id");
		let scaleId = data.get("scale_id");
		let description = data.get("description");
		let password = data.get("password");

		if(!userId || !scaleId || !description || !password){
			console.log('aa')
			return fail(400, { "error" : "missing data" });
		}

		return { success: true };
	}
} satisfies Actions;