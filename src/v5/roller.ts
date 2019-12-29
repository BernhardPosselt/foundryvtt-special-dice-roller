import {RandomNumberGenerator} from '../rng';
import {
    Dice,
    DicePool,
    dieRollImages,
    Faces,
    HUNGER_ROLL_TABLE,
    interpretResult,
    parseRollValues,
    RollValues,
    rollValuesMonoid,
    SKILL_ROLL_TABLE,
} from './dice';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';
import {Roll, rollDie, Roller} from '../roller';
import * as Mustache from 'mustache';
import tpl from './template';
import {SimpleParser} from './parser';
import {DieRollView} from '../view';

export class V5Roller extends Roller<Dice, Faces, DicePool> {
    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()]);
    }

    roll(rolls: DicePool): Roll<Dice, Faces>[] {
        return [
            ...(rollDie(rolls.hunger, Dice.HUNGER, HUNGER_ROLL_TABLE, this.rng)),
            ...(rollDie(rolls.skills, Dice.SKILL, SKILL_ROLL_TABLE, this.rng))
        ];
    }

    combineRolls(rolls: Roll<Dice, Faces>[]): RollValues {
        const results = rolls
            .map((roll) => parseRollValues(roll));
        return combineAll(results, rollValuesMonoid);
    }

    formatRolls(rolls: Roll<Dice, Faces>[]): string {
        return Mustache.render(tpl, {
            rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages)),
            results: interpretResult(this.combineRolls(rolls)),
            timestamp: new Date().getTime(),
            rollIndex: function () {
                return rolls.indexOf(this);
            },
        });
    }

    protected toDicePool(faces: Dice[]): DicePool {
        const hunger = countMatches(faces, (die) => die === Dice.HUNGER);
        const skills = countMatches(faces, (die) => die === Dice.SKILL);
        return new DicePool(skills, hunger);
    }
}
