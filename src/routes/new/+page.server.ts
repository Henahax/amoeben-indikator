import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		var test = 1;
		if(test === 0){
			return fail(400, { "test" : "test", incorrect: true });
		}


		return { success: true };
	}
} satisfies Actions;