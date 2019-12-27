export type RandomNumberGenerator = (zeroUpToExclusive: number) => number;

export function secureRandomNumber(zeroUpToExclusive: number): number {
    let randomValue = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return Math.floor((randomValue / 2 ** 32) * zeroUpToExclusive);
}