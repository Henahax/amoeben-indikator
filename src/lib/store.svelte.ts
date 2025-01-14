import type { user, scale, entry } from '$lib/types';
import jsonScales from '$lib/scales.json';
import jsonUsers from '$lib/users.json';
import jsonEntries from '$lib/entries.json';

let scales = $state(jsonScales as scale[]) as scale[];
let users = $state(jsonUsers as user[]) as user[];
let entries = $state(jsonEntries as entry[]) as entry[];

let score = $derived(calculateScore(entries)) as number;
let highestScale = $derived(highestReached(scales)) as number

entries = cutEntries(entries);

export const store = {
    get scales() {
        return scales;
    },
    get users() {
        return users;
    },
    get entries() {
        return entries;
    },
    set entries(values:entry[]){
        entries = values;
    },
    get score() {
        return score;
    },
    get highestScale(){
        return highestScale;
    }
}

function cutEntries(entries: entry[]) {
    return entries.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }).slice(0, 5);
}

function calculateScore(entries: entry[]) {
    let sum = 0;

    if(entries.length === 0) {
        return 0;
    }

    entries.forEach(entry => {
        const foundScale = scales.find((scale: scale) => scale.id === entry.scale_id);
        if (foundScale) {
            sum += foundScale.value;
        }
    });

    return parseFloat((sum / entries.length).toFixed(2));
}

function highestReached(scales:scale[]){
    let highestReached = 0;
    scales.forEach((scale) => {
        if (score >= Number(scale.value)) {
            highestReached = scale.id;
        }
    });

    return highestReached;
}
