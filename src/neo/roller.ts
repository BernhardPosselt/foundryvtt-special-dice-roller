import Mustache from 'mustache';
import { SimpleParser } from './parser';
import { RandomNumberGenerator } from '../rng';
import {Roller, Roll, rollDie, combineRolls} from '../roller';
import {
    Dice,
    Faces,
    DicePool,
    ACTION_ROLL_TABLE,
    DANGER_ROLL_TABLE,
    rollValuesMonoid,
    dieRollImages,
    interpretResult,
    rollToRollResult,
} from './dice';
import { DieRollView } from '../view';
import tpl from './template';
import base from '../template';
import { countMatches } from '../arrays';

export class NeonCityOverdriveRoller extends Roller<Dice, Faces, DicePool> {
    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()]);
    }

    public roll(rolls: DicePool): Roll<Dice, Faces>[] {
        return [
            ...rollDie(rolls.action, Dice.ACTION, ACTION_ROLL_TABLE, this.rng),
            ...rollDie(rolls.danger, Dice.DANGER, DANGER_ROLL_TABLE, this.rng),
        ];
    }

    public formatRolls(rolls: Roll<Dice, Faces>[], flavorText?: string): string {
        const combinedRolls = combineRolls(rolls, rollToRollResult, rollValuesMonoid);

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
        const actions = countMatches(dice, (die) => die === Dice.ACTION);
        const dangers = countMatches(dice, (die) => die === Dice.DANGER);

        return new DicePool(actions, dangers);
    }

    public toRoll(die: number, face: number): Roll<Dice, Faces> {
        return new Roll(die, face);
    }
}