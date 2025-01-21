import type { user, scale, entry } from '$lib/types';

import { db} from '$lib/server/database/client'
import {scales}from '$lib/server/database/schema'

import jsonScales from '$lib/scales.json';
import jsonUsers from '$lib/users.json';
import jsonEntries from '$lib/entries.json';

export const store = {
    get scales() {
        return myScales;
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




const getScales = async() => {
        const myScales = await db.select().from(scales);
        return myScales;
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
        const foundScale = scales2.find((scale: scale) => scale.id === entry.scale_id);
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

let myScales = $state(await getScales() as scale[]);

let scales2 = $state(jsonScales as scale[]) as scale[];
let users = $state(jsonUsers as user[]) as user[];
let entries = $state(jsonEntries as entry[]) as entry[];

let score = $derived(calculateScore(entries)) as number;
let highestScale = $derived(highestReached(scales2)) as number

entries = cutEntries(entries);