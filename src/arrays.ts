export type Predicate<T> = (value: T) => boolean

export function countMatches<T>(array: T[], match: Predicate<T>): number {
    let count = 0;
    for (let elem of array) {
        if (match(elem)) {
            count += 1;
        }
    }
    return count;
}
