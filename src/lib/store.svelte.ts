import type { user, scale, entry } from '$lib/types';
import jsonScales from '$lib/scales.json';
import jsonUsers from '$lib/users.json';

let theScales = $state(jsonScales as scale[]) as scale[];
let theUsers = $state(jsonUsers as user[]) as user[];
let theEntries = $state([]) as entry[];

let score = $derived(calculateScore(theEntries)) as number;
let highestScale = $derived(highestReached()) as number

export const store = {
    get scales() {
        return theScales;
    },
    set scales(value: scale[]) {
        theScales = value;
    },
    get users() {
        return theUsers;
    },
    set users(value: user[]) {
        theUsers = value;
    },
    get entries() {
        return theEntries;
    },
    set entries(value: entry[]) {
        theEntries = value.sort(function (a, b) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }).slice(0, 5);;
    },
    get score() {
        return score;
    },
    get highestScale(){
        return highestScale;
    }
}

function calculateScore(entries: entry[]) {
    let value = 0;

    if(entries.length === 0) {
        return 0;
    }

    entries.forEach(entry => {
        const foundScale = store.scales.find((scale: scale) => scale.id === entry.scale_id);
        if (foundScale) {
            value += foundScale.value;
        }
    });

    return parseFloat((value / entries.length).toFixed(2));
}

function highestReached(){
    let highestReached = 0;
    theScales.forEach((scale) => {
        if (score >= Number(scale.value)) {
            highestReached = scale.id;
        }
    });

    return highestReached;
}
