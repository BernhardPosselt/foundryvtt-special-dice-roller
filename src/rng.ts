export type RandomNumberGenerator = (zeroUpToExclusive: number) => number;

export function secureRandomNumber(zeroUpToExclusive: number): number {
    const randomValue = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return Math.floor((randomValue / 2 ** 32) * zeroUpToExclusive);
}

export function makeRng(...constNumber: number[]): RandomNumberGenerator {
    return () => {
        const result = constNumber.shift();
        if (result === undefined) {
            throw new Error('out of entropy');
        } else {
            return result;
        }
    };
}
