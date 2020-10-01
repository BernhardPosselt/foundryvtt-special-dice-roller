import * as Mustache from 'mustache';
import {combineAll} from '../lang';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import base from '../template';
import {DieRollView} from '../view';
import {
    Dice,
    DicePool,
    dieRollImages,
    Faces, HERO_TABLE,
    interpretResult, MONSTER_TABLE,
    parseRollValues,
    RollValues,
    rollValuesMonoid,
} from './dice';
import {SimpleParser} from './parser';
import tpl from './template';

export class HeroQuestRoller extends Roller<Dice, Faces, DicePool> {

    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()], false, false);
    }

    public roll(pool: DicePool): Roll<Dice, Faces>[] {
        return [
            ...rollDie(pool.hero, Dice.HERO, HERO_TABLE, this.rng),
            ...rollDie(pool.monster, Dice.MONSTER, MONSTER_TABLE, this.rng),
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
        return new DicePool(dice.length);
    }
}
