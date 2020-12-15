import * as Mustache from 'mustache';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import base from '../template';
import {DieRollView} from '../view';
import {
    BLACK_ROLL_TABLE,
    BLUE_ROLL_TABLE,
    BROWN_ROLL_TABLE,
    Dice,
    DicePool,
    dieRollImages,
    Faces,
    GREEN_ROLL_TABLE,
    GREY_ROLL_TABLE,
    interpretResult,
    parseRollValues,
    RED_ROLL_TABLE,
    RollValues,
    rollValuesMonoid,
    YELLOW_ROLL_TABLE,
} from './dice';
import {SimpleParser} from './parser';
import tpl from './template';

export class Descent2Roller extends Roller<Dice, Faces, DicePool> {

    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()], false, false);
    }

    public roll(pool: DicePool): Roll<Dice, Faces>[] {
        return [
            ...rollDie(pool.green, Dice.GREEN, GREEN_ROLL_TABLE, this.rng),
            ...rollDie(pool.red, Dice.RED, RED_ROLL_TABLE, this.rng),
            ...rollDie(pool.yellow, Dice.YELLOW, YELLOW_ROLL_TABLE, this.rng),
            ...rollDie(pool.blue, Dice.BLUE, BLUE_ROLL_TABLE, this.rng),
            ...rollDie(pool.brown, Dice.BROWN, BROWN_ROLL_TABLE, this.rng),
            ...rollDie(pool.grey, Dice.GREY, GREY_ROLL_TABLE, this.rng),
            ...rollDie(pool.black, Dice.BLACK, BLACK_ROLL_TABLE, this.rng),
        ];
    }

    public combineRolls(rolls: Roll<Dice, Faces>[]): RollValues {
        const results = rolls
            .map((roll) => parseRollValues(roll));
        return combineAll(results, rollValuesMonoid);
    }

    public toRoll(die: number, face: number): Roll<Dice, Faces> {
        return new Roll(die, face);
    }

    public formatRolls(rolls: Roll<Dice, Faces>[], flavorText?: string): string {
        const combinedRolls = combineRolls(rolls, parseRollValues, rollValuesMonoid);
        return Mustache.render(
            base,
            {
                system: this.command,
                canReRoll: this.canReRoll,
                canKeep: this.canKeep,
                flavorText,
                rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages)),
                results: interpretResult(combinedRolls),
                rollIndex(): number {
                    return rolls.indexOf(this);
                },
            },
            {interpretation: tpl},
        );
    }

    protected toDicePool(dice: Dice[]): DicePool {
        const green = countMatches(dice, (die) => die === Dice.GREEN);
        const blue = countMatches(dice, (die) => die === Dice.BLUE);
        const red = countMatches(dice, (die) => die === Dice.RED);
        const yellow = countMatches(dice, (die) => die === Dice.YELLOW);
        const brown = countMatches(dice, (die) => die === Dice.BROWN);
        const grey = countMatches(dice, (die) => die === Dice.GREY);
        const black = countMatches(dice, (die) => die === Dice.BLACK);
        return new DicePool(
            green,
            blue,
            red,
            yellow,
            brown,
            grey,
            black,
        );
    }

}
