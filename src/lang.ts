export interface Monoid<T> {
    readonly combine: (x: T, y: T) => T;
    readonly identity: T;
}

export function combineAll<T>(values: T[], monoid: Monoid<T>) {
    return values
        .reduce((prev, curr) => monoid.combine(prev, curr), monoid.identity);
}


export type Predicate<T> = (value: T) => boolean;