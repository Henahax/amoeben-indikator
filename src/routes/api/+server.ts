import { json } from '@sveltejs/kit';
import {scorer} from '$lib/state/score.svelte.js'

export function GET() {
    return json(scorer.score);
}