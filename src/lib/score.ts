export function calculateScore(values: readonly (number | null | undefined)[]): number {
	if (values.length === 0) return 0;

	let total = 0;
	for (const value of values) total += value ?? 0;
	return Number((total / values.length).toFixed(2));
}

/** Splits the indicator range evenly; these thresholds are independent of per-entry scale values. */
export function getScaleThreshold(index: number, count: number): number {
	return count > 0 ? index / count : 0;
}

export function getHighestReachedScaleId(scales: readonly { id: number }[], score: number): number {
	let highest = scales[0]?.id ?? 0;

	for (let index = 1; index < scales.length; index++) {
		if (score >= getScaleThreshold(index, scales.length)) {
			highest = scales[index].id;
		}
	}

	return highest;
}
