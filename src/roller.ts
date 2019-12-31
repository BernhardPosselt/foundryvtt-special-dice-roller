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

type IndexedRolls = Array<[number, number]>;

export interface IRoller {

    command: string;

    canReRoll: boolean;

    canKeep: boolean;

    handlesCommand(command: string): boolean;

    rollCommand(command: string): string;

    formatKeptRolls(keptRolls: IndexedRolls): string;

    formatReRolls(keptRolls: IndexedRolls, reRolls: IndexedRolls): string;
}

export abstract class Roller<D, F, P> implements IRoller {
    protected constructor(
        public command: string,
        protected parsers: Array<IParser<P>>,
        public canReRoll: boolean = false,
        public canKeep: boolean = false,
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

    public formatKeptRolls(keptRolls: IndexedRolls): string {
        const parsedRolls = keptRolls
            .map((roll) => this.toRoll(roll[0], roll[1]));
        return this.formatRolls(parsedRolls);
    }

    public formatReRolls(keptRolls: IndexedRolls, reRolls: IndexedRolls): string {
        const parsedKeptRolls = keptRolls
            .map((roll) => this.toRoll(roll[0], roll[1]));
        const parsedReRollsFaces = reRolls
            .map((roll) => this.toRoll(roll[0], roll[1]))
            .map((roll) => roll.die);
        const pool = this.toDicePool(parsedReRollsFaces);
        const result = [...parsedKeptRolls, ...this.roll(pool)];
        return this.formatRolls(result);
    }

    /**
     * Take the enum indices of a die and face and turn it into a roll
     * @param die
     * @param face
     */
    public abstract toRoll(die: number, face: number): Roll<D, F>;

    /**
     * Roll a dice pool and return the result rolls
     * @param dicePool
     */
    public abstract roll(dicePool: P): Array<Roll<D, F>>;

    /**
     * Return a template that displays and explains the roll
     * @param rolls
     */
    public abstract formatRolls(rolls: Array<Roll<D, F>>): string;

    /**
     * Create a dice pool from an array of different dice
     * @param dice
     */
    protected abstract toDicePool(dice: D[]): P;

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
    rollToRollResult: (roll: Roll<D, F>) => R,
    rollValuesMonoid: IMonoid<R>,
): R {
    const results = rolls
        .map((roll) => rollToRollResult(roll));
    return combineAll(results, rollValuesMonoid);
}
