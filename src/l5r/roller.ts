import Mustache from 'mustache';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import base from '../template';
import {DieRollView} from '../view';
import {
    Dice,
    DicePool,
    dieRollImages,
    Faces,
    interpretResult,
    parseRollValues,
    RING_ROLL_TABLE,
    RollValues,
    rollValuesMonoid,
    SKILL_ROLL_TABLE,
} from './dice';
import {SimpleParser} from './parser';
import tpl from './template';

export class L5RRoller extends Roller<Dice, Faces, DicePool> {

    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()], true, true);
    }

    public roll(pool: DicePool): Roll<Dice, Faces>[] {
        return [
            ...rollDie(pool.rings, Dice.RING, RING_ROLL_TABLE, this.rng),
            ...rollDie(pool.skills, Dice.SKILL, SKILL_ROLL_TABLE, this.rng),
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
        const rings = countMatches(dice, (die) => die === Dice.RING);
        const skills = countMatches(dice, (die) => die === Dice.SKILL);
        return new DicePool(rings, skills);
    }

}
