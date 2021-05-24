import Mustache from 'mustache';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import base from '../template';
import {DieRollView} from '../view';
import {
    BLUT_ROLL_TABLE,
    BONUS_ROLL_TABLE,
    Dice,
    DicePool,
    dieRollImages,
    ELIXIR_ROLL_TABLE,
    Faces,
    FLUCH_ROLL_TABLE,
    HEXXEN_ROLL_TABLE,
    interpretResult,
    MALUS_ROLL_TABLE,
    parseRollValues,
    RollValues,
    rollValuesMonoid,
    SEGNUNG_ROLL_TABLE,
} from './dice';
import {SimpleParser} from './parser';
import tpl from './template';

export class HEXRoller extends Roller<Dice, Faces, DicePool> {

    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()], true, true);
    }

    public roll(pool: DicePool): Roll<Dice, Faces>[] {
        if (pool.BONUS >= pool.MALUS) {
          pool.BONUS = pool.BONUS - pool.MALUS;
          pool.MALUS = 0;
        } else if (pool.MALUS > pool.BONUS) {
          pool.MALUS = pool.MALUS - pool.BONUS;
          pool.BONUS = 0;
        }
        return [
            ...rollDie(pool.HEXXEN, Dice.HEXXEN, HEXXEN_ROLL_TABLE, this.rng),
            ...rollDie(pool.BONUS, Dice.BONUS, BONUS_ROLL_TABLE, this.rng),
            ...rollDie(pool.MALUS, Dice.MALUS, MALUS_ROLL_TABLE, this.rng),
            ...rollDie(pool.SEGNUNG, Dice.SEGNUNG, SEGNUNG_ROLL_TABLE, this.rng),
            ...rollDie(pool.BLUT, Dice.BLUT, BLUT_ROLL_TABLE, this.rng),
            ...rollDie(pool.ELIXIR, Dice.ELIXIR, ELIXIR_ROLL_TABLE, this.rng),
            ...rollDie(pool.FLUCH, Dice.FLUCH, FLUCH_ROLL_TABLE, this.rng),
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
        const HEXXEN = countMatches(dice, (die) => die === Dice.HEXXEN);
        const BONUS = countMatches(dice, (die) => die === Dice.BONUS);
        const MALUS = countMatches(dice, (die) => die === Dice.MALUS);
        const SEGNUNG = countMatches(dice, (die) => die === Dice.SEGNUNG);
        const BLUT = countMatches(dice, (die) => die === Dice.BLUT);
        const ELIXIR = countMatches(dice, (die) => die === Dice.ELIXIR);
        const FLUCH = countMatches(dice, (die) => die === Dice.FLUCH);
        return new DicePool(HEXXEN, BONUS, MALUS, SEGNUNG, BLUT, ELIXIR, FLUCH);
    }

}
