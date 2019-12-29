import {Predicate} from './lang';
import {RandomNumberGenerator} from './rng';
import {shim} from 'array.prototype.flatmap';
import {parseFormula, Parser} from './parser';
import {escapeHtml} from './util';

export class Roll<D, F> {
    constructor(public die: D, public face: F) {
    }

    toString(): string {
        return `die: ${this.die}, face: ${this.face}`
    }
}

export abstract class Roller<D, F, P> {
    protected constructor(
        protected command: string,
        protected parsers: Parser<P>[]
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
            console.log(`Rolled ${rolls} with formula ${parsedFormula}`);
            return this.formatRolls(rolls);
        } catch (e) {
            return escapeHtml(e.message);
        }
    }

    reRoll(keptResults: Roll<D, F>[], reRollResults: Roll<D, F>[]): Roll<D, F>[] {
        const reRolledDice: D[] = reRollResults.map((roll) => roll.die);
        const pool = this.toDicePool(reRolledDice);
        const reRolls = this.roll(pool);
        return [...keptResults, ...reRolls];
    }

    protected abstract toDicePool(faces: D[]): P

    abstract roll(dicePool: P): Roll<D, F>[]

    abstract formatRolls(rolls: Roll<D, F>[]): string
}

/**
 * Given a die and various die faces, roll it (and potentially explode)
 * @param times how many times a die should be rolled
 * @param die enum value
 * @param faces the enum with all the die's faces
 * @param explodes a function that returns true if a dice explodes
 * @param rng random number generator
 * @return an array with all rolled faces
 */
export function rollDie<D, F>(
    times: number,
    die: D,
    faces: F[],
    rng: RandomNumberGenerator,
    explodes: Predicate<F> = () => false,
): Roll<D, F>[] {
    shim();
    return Array.from({length: times}, () => rng(faces.length))
        .map((randomNumber: number) => faces[randomNumber])
        .flatMap((face) => {
            const result = new Roll(die, face);
            if (explodes(face)) {
                return [result, ...rollDie(1, die, faces, rng, explodes)];
            } else {
                return [result];
            }
        });
}