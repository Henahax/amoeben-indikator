import { json } from "@sveltejs/kit";
import { store } from '$lib/store.svelte.js';

export function GET(){
    return json(store.score);
}