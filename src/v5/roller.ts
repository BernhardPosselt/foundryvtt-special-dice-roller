import {RandomNumberGenerator} from '../rng';
import {
    Dice,
    interpretResult,
    RollValues,
    rollValuesMonoid,
    DicePool,
    parseRollValues,
    SKILL_ROLL_TABLE,
    HUNGER_ROLL_TABLE, Faces, dieRollImages,
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
        const hunger = rollDie(rolls.hunger, HUNGER_ROLL_TABLE, () => false, this.rng)
            .map((face) => new Roll(Dice.HUNGER, face));
        const skills = rollDie(rolls.skills, SKILL_ROLL_TABLE, () => false, this.rng)
            .map((face) => new Roll(Dice.SKILL, face));
        return [...hunger, ...skills];
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
