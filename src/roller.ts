import {Predicate} from './lang';
import {RandomNumberGenerator} from './rng';
import {shim} from 'array.prototype.flatmap';
import {parseFormula, Parser} from './parser';
import {escapeHtml} from './util';

export class Roll<D, F> {
    constructor(public die: D, public face: F) {
    }
}

export abstract class Roller<R, RS> {
    protected constructor(
        protected command: string,
        protected parsers: Parser<RS>[]
    ) {
    }

    handlesCommand(command: string): boolean {
        return command.startsWith(`/${this.command} `);
    }

    rollCommand(command: string): string {
        const formula = command
            .replace(new RegExp(`/${this.command} `, 'g'), '');
        return this.rollFormula(formula);
    }

    rollFormula(formula: string): string {
        try {
            const parsedFormula = parseFormula(formula, this.parsers);
            const rolls = this.roll(parsedFormula);
            return this.formatRolls(rolls);
        } catch (e) {
            return escapeHtml(e.message);
        }
    }

    abstract roll(parsedFormula: RS): R[]

    abstract formatRolls(rolls: R[]): string
}

export interface CanReRoll<R> {
    reRoll(keptResults: R[], reRollResults: R[]): R[]
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