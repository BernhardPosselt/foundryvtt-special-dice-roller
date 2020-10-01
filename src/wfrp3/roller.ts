import * as Mustache from 'mustache';
import {countMatches} from '../arrays';
import {IParser} from '../parser';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import base from '../template';
import {DieRollView} from '../view';
import {
    CHALLENGE_ROLL_TABLE,
    CHARACTERISTIC_ROLL_TABLE,
    CONSERVATIVE_ROLL_TABLE,
    Dice,
    DicePool,
    dieRollImages,
    EXPERTISE_ROLL_TABLE,
    Faces,
    FORTUNE_ROLL_TABLE,
    interpretResult,
    MISFORTUNE_ROLL_TABLE,
    parseRollValues,
    RECKLESS_ROLL_TABLE,
    rollValuesMonoid,
} from './dice';
import {SimpleWarhammerParser} from './parser';
import tpl from './template';

export function warhammerRoller(rng: RandomNumberGenerator, command: string): WarhammerRoller {
    return new WarhammerRoller(rng, command, [new SimpleWarhammerParser()]);
}

export class WarhammerRoller extends Roller<Dice, Faces, DicePool> {
    constructor(private rng: RandomNumberGenerator, command: string, parsers: IParser<DicePool>[]) {
        super(command, parsers);
    }

    public roll(pool: DicePool): Roll<Dice, Faces>[] {
        return [
            ...rollDie(pool.characteristics, Dice.CHAR, CHARACTERISTIC_ROLL_TABLE, this.rng),
            ...rollDie(pool.conservative, Dice.CONSERVATIVE, CONSERVATIVE_ROLL_TABLE, this.rng),
            ...rollDie(pool.reckless, Dice.RECKLESS, RECKLESS_ROLL_TABLE, this.rng),
            ...rollDie(pool.expertise, Dice.EXPERTISE, EXPERTISE_ROLL_TABLE, this.rng, (x) => x === Faces.SUCCESS_PLUS),
            ...rollDie(pool.fortune, Dice.FORTUNE, FORTUNE_ROLL_TABLE, this.rng),
            ...rollDie(pool.misfortune, Dice.MISFORTUNE, MISFORTUNE_ROLL_TABLE, this.rng),
            ...rollDie(pool.challenge, Dice.CHALLENGE, CHALLENGE_ROLL_TABLE, this.rng),
        ];
    }

    public toRoll(die: number, face: number): Roll<Dice, Faces> {
        return new Roll(die, face);
    }

    public formatRolls(rolls: Roll<Dice, Faces>[]): string {
        const combinedRolls = combineRolls(rolls, parseRollValues, rollValuesMonoid);
        const res = Mustache.render(
            base,
            {
                system: this.command,
                canReRoll: this.canReRoll,
                canKeep: this.canKeep,
                rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages, true)),
                results: interpretResult(combinedRolls),
                rollIndex(): number {
                    return rolls.indexOf(this);
                },
            },
            {interpretation: tpl},
        );
        console.log(res);
        return res;
    }

    protected toDicePool(dice: Dice[]): DicePool {
        const characteristic = countMatches(dice, (die) => die === Dice.CHAR);
        const conservative = countMatches(dice, (die) => die === Dice.CONSERVATIVE);
        const reckless = countMatches(dice, (die) => die === Dice.RECKLESS);
        const expertise = countMatches(dice, (die) => die === Dice.EXPERTISE);
        const fortune = countMatches(dice, (die) => die === Dice.FORTUNE);
        const misfortune = countMatches(dice, (die) => die === Dice.MISFORTUNE);
        const challenge = countMatches(dice, (die) => die === Dice.CHALLENGE);
        return new DicePool(characteristic, conservative, reckless, expertise, fortune, misfortune, challenge);
    }
}
