import {
    D6_ROLL_TABLE,
    Dice,
    DicePool,
    dieRollImages,
    Faces,
    interpretResult,
    parseRollValues,
    rollValuesMonoid
} from './dice';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import {RandomNumberGenerator} from '../rng';
import Mustache from 'mustache';
import base from '../template';
import {DieRollView} from '../view';
import {countMatches} from '../arrays';
import tpl from './template';
import {OVAParser} from './parser';

export function ovaRoller(rng: RandomNumberGenerator, command: string): OVARoller {
    return new OVARoller(rng, command);
}

export class OVARoller extends Roller<Dice, Faces, DicePool> {
    negative: boolean;

    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new OVAParser()]);
        this.negative = false;
        this.canKeep = false;
        this.canReRoll = false;
    }

    public roll(rolls: DicePool): Roll<Dice, Faces>[] {
        let amount: number;
        if (rolls.d6 <= 0) {
            amount = 2 + Math.abs(rolls.d6);
            this.negative = true;
        } else {
            amount = rolls.d6;
            this.negative = false;
        }
        return [
            ...rollDie(amount, Dice.D6, D6_ROLL_TABLE, this.rng),
        ];
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
                rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages, true)),
                results: interpretResult(combinedRolls, this.negative),
                rollIndex(): number {
                    return rolls.indexOf(this);
                },
            },
            {interpretation: tpl},
        );
    }

    public toRoll(die: number, face: number): Roll<Dice, Faces> {
        return new Roll(die, face);
    }

    protected toDicePool(dice: Dice[]): DicePool {
        const d6 = countMatches(dice, (die) => die === Dice.D6);
        return new DicePool(d6);
    }

}
