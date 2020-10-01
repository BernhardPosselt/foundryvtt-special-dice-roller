import * as Mustache from 'mustache';
import {countMatches} from '../arrays';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import base from '../template';
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
        super(
            command,
            [new SimpleParser()],
            true,
        );
    }

    public roll(rolls: DicePool): Roll<Dice, Faces>[] {
        return [
            ...rollDie(rolls.hunger, Dice.HUNGER, HUNGER_ROLL_TABLE, this.rng),
            ...rollDie(rolls.skills, Dice.SKILL, SKILL_ROLL_TABLE, this.rng),
        ];
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
                rolls: rolls.map((roll) => {
                    const isHungerDie = roll.die === Dice.HUNGER;
                    return new DieRollView(roll, dieRollImages, isHungerDie);
                }),
                results: interpretResult(combinedRolls),
                rollIndex(): number {
                    return rolls.indexOf(this);
                },
            },
            {interpretation: tpl},
        );
    }

    protected toDicePool(dice: Dice[]): DicePool {
        const hunger = countMatches(dice, (die) => die === Dice.HUNGER);
        const skills = countMatches(dice, (die) => die === Dice.SKILL);
        return new DicePool(skills, hunger);
    }

}
