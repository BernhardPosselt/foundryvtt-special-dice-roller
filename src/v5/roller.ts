import * as Mustache from 'mustache';
import {countMatches} from '../arrays';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import {DieRollView} from '../view';
import {
    Dice,
    DicePool,
    dieRollImages,
    Faces,
    HUNGER_ROLL_TABLE,
    interpretResult,
    parseRollValues,
    rollValuesMonoid,
    SKILL_ROLL_TABLE,
} from './dice';
import {SimpleParser} from './parser';
import tpl from './template';

export class V5Roller extends Roller<Dice, Faces, DicePool> {
    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()]);
    }

    public roll(rolls: DicePool): Array<Roll<Dice, Faces>> {
        return [
            ...rollDie(rolls.hunger, Dice.HUNGER, HUNGER_ROLL_TABLE, this.rng),
            ...rollDie(rolls.skills, Dice.SKILL, SKILL_ROLL_TABLE, this.rng),
        ];
    }

    public formatRolls(rolls: Array<Roll<Dice, Faces>>): string {
        const combinedRolls = combineRolls(rolls, parseRollValues, rollValuesMonoid);
        return Mustache.render(tpl, {
            rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages)),
            results: interpretResult(combinedRolls),
            rollIndex() {
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
