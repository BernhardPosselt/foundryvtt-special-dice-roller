import {shim} from 'array.prototype.flatmap';
import {combineAll, IMonoid, Predicate} from './lang';
import {IParser, parseFormula} from './parser';
import {RandomNumberGenerator} from './rng';
import {escapeHtml} from './util';

export class Roll<D, F> {
    constructor(public die: D, public face: F) {
    }

    public toString(): string {
        return `die: ${this.die}, face: ${this.face}`;
    }
}

export interface IRoller {
    handlesCommand(command: string): boolean;
    rollCommand(command: string): string;
}

export abstract class Roller<D, F, P> implements IRoller {
    protected constructor(
        protected command: string,
        protected parsers: Array<IParser<P>>,
    ) {
    }

    public handlesCommand(command: string): boolean {
        return command.startsWith(`/${this.command} `);
    }

    public rollCommand(command: string): string {
        const formula = command
            .replace(new RegExp(`/${this.command} `, 'g'), '');
        return this.rollFormula(formula);
    }

    public rollFormula(formula: string): string {
        try {
            const parsedFormula = parseFormula(formula, this.parsers);
            const rolls = this.roll(parsedFormula);
            console.log(`Rolled ${rolls} with formula ${parsedFormula}`);
            return this.formatRolls(rolls);
        } catch (e) {
            return escapeHtml(e.message);
        }
    }

    public reRoll(keptResults: Array<Roll<D, F>>, reRollResults: Array<Roll<D, F>>): Array<Roll<D, F>> {
        const reRolledDice: D[] = reRollResults.map((roll) => roll.die);
        const pool = this.toDicePool(reRolledDice);
        const reRolls = this.roll(pool);
        return [...keptResults, ...reRolls];
    }

    public abstract roll(dicePool: P): Array<Roll<D, F>>;

    public abstract formatRolls(rolls: Array<Roll<D, F>>): string;

    protected abstract toDicePool(faces: D[]): P;
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
): Array<Roll<D, F>> {
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

export function combineRolls<D, F, R>(
    rolls: Array<Roll<D, F>>,
    rollToRollResult: (roll: Roll<D, F>) => R ,
    rollValuesMonoid: IMonoid<R>,
): R {
    const results = rolls
        .map((roll) => rollToRollResult(roll));
    return combineAll(results, rollValuesMonoid);
}
