export function countMatches<T>(array: T[], matches: (value: T) => boolean): number {
    let count = 0;
    for (let elem of array) {
        if (matches(elem)) {
            count += 1;
        }
    }
    return count;
}
