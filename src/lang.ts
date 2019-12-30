export interface IMonoid<T> {
    readonly combine: (x: T, y: T) => T;
    readonly identity: T;
}

export function combineAll<T>(values: T[], monoid: IMonoid<T>): T {
    return values
        .reduce((prev, curr) => monoid.combine(prev, curr), monoid.identity);
}

export type Predicate<T> = (value: T) => boolean;
