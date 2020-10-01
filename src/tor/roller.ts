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
    FEAT_ROLL_TABLE,
    interpretResult,
    parseRollValues,
    rollValuesMonoid,
    SHADOW_ROLL_TABLE,
    SUCCESS_ROLL_TABLE,
    TIRED_ROLL_TABLE,
} from './dice';
import { SimpleParser } from './parser';
import tpl from './template';

export class TorRoller extends Roller<Dice, Faces, DicePool> {
    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()]);
    }

    public roll(pool: DicePool): Roll<Dice, Faces>[] {
        return [
            ...rollDie(pool.feat, Dice.FEAT, FEAT_ROLL_TABLE, this.rng),
            ...rollDie(pool.success, Dice.SUCCESS, SUCCESS_ROLL_TABLE, this.rng),
            ...rollDie(pool.shadow, Dice.SHADOW, SHADOW_ROLL_TABLE, this.rng),
            ...rollDie(pool.tired, Dice.TIRED, TIRED_ROLL_TABLE, this.rng),
        ];
    }

    public toRoll(die: number, face: number): Roll<Dice, Faces> {
        return new Roll(die, face);
    }

    public formatRolls(rolls: Roll<Dice, Faces>[], flavorText?: string): string {
        const combinedRolls = combineRolls(rolls, parseRollValues, rollValuesMonoid);
        const res = Mustache.render(
            base,
            {
                system: this.command,
                canReRoll: this.canReRoll,
                canKeep: this.canKeep,
                flavorText,
                rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages, true)),
                results: interpretResult(combinedRolls),
                rollIndex(): number {
                    return rolls.indexOf(this);
                },
            },
            {interpretation: tpl},
        );
        return res;
    }

    protected toDicePool(dice: Dice[]): DicePool {
        const success = countMatches(dice, (die) => die === Dice.SUCCESS);
        const shadow = countMatches(dice, (die) => die === Dice.SHADOW);
        const tired = countMatches(dice, (die) => die === Dice.TIRED);
        return new DicePool(1, success, shadow, tired);
    }
}
