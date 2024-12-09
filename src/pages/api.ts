let value = 0;

import entries from "../../data.json"
entries.sort((a, b) => b.date.localeCompare(a.date));
entries = entries.slice(0, 5)

value = getValue(entries)
function getValue(entries: any) {
    let temp = 0;

    entries.forEach((entry: any) => {
        temp += entry.value;
    });

    return temp / entries.length;
}

export async function GET({ }) {
    return new Response(value.toString());
}