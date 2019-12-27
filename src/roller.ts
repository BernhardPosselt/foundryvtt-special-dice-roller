import {Predicate} from './lang';
import {RandomNumberGenerator} from './rng';
import {shim} from 'array.prototype.flatmap';

export class Roll<D, F> {
    constructor(public die: D, public face: F) {
    }
}

export abstract class Roller {
    protected constructor(private command: string) {
    }

    handlesCommand(command: string): boolean {
        return command.startsWith(`/${this.command} `);
    }

    rollCommand(command: string): string {
        const formula = command
            .replace(new RegExp(`/${this.command} `, 'g'), '');
        return this.rollFormula(formula);
    }

    protected abstract rollFormula(formula: string): string
}

/**
 * Rolls a roll table
 * @param times how many times a die should be rolled
 * @param faces the enum with all the die's faces
 * @param explodes a function that returns true if a dice explodes
 * @param rng random number generator
 * @return an array with all rolled faces
 */
export function rollDie<T>(
    times: number,
    faces: T[],
    explodes: Predicate<T>,
    rng: RandomNumberGenerator,
): T[] {
    shim();
    return Array.from({length: times}, () => rng(faces.length))
        .map((randomNumber: number) => faces[randomNumber])
        .flatMap((face) => {
            if (explodes(face)) {
                return [face, ...rollDie(1, faces, explodes, rng)];
            } else {
                return [face];
            }
        });
}