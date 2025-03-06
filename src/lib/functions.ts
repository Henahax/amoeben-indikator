export function getScore(entries: any, scales: any) {

    if (entries.length === 0) {
        return 0;
    }

    let totalScore = 0;

    entries.forEach((entry: any) => {
        const scale = scales.find((scale: any) => scale.id === entry.entries.scaleId);
        if (scale) {
            totalScore += scale.value ?? 0;
        }
    });

    return Number((totalScore / entries.length).toFixed(2));
}