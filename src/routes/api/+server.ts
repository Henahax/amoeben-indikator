import { json } from "@sveltejs/kit";
import { store } from '$lib/store.svelte.js';

let api = { "score": 0 };
api.score = store.score;

export function GET(){
    return json(api);
}