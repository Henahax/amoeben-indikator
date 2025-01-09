import type { entry } from '$lib/types';

let items = $state([]) as entry[];
let score = $derived(calculateScore()) as number;

export const store = {
    get items() {
        return items;
    },
    set items(value) {
        items = value.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        }).slice(0, 5);;
    },
    get score() {
        return score;
    }
}

function calculateScore() {
    let value = 0;

    console.log(value + "a");

    if(items.length === 0) {
        return 0;
    }

    console.log(value + "b");

    items.forEach(item => {
        value += item.value;
    });

    console.log(value + "c");

    return parseFloat((value / items.length).toFixed(2));
}