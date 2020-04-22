import * as Mustache from 'mustache';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import base from '../template';
import {DieRollView} from '../view';
import {
    BLUT_ROLL_TABLE,
    Dice,
    DicePool,
    dieRollImages,
    ELIXIR_ROLL_TABLE,
    Faces,
    FLUCH_ROLL_TABLE,
    HEXXEN_ROLL_TABLE,
    interpretResult,
    JANUS_ROLL_TABLE,
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

    public roll(pool: DicePool): Array<Roll<Dice, Faces>> {
        return [
            ...rollDie(pool.HEXXEN, Dice.HEXXEN, HEXXEN_ROLL_TABLE, this.rng),
            ...rollDie(pool.JANUS, Dice.JANUS, JANUS_ROLL_TABLE, this.rng),
            ...rollDie(pool.SEGNUNG, Dice.SEGNUNG, SEGNUNG_ROLL_TABLE, this.rng),
            ...rollDie(pool.BLUT, Dice.BLUT, BLUT_ROLL_TABLE, this.rng),
            ...rollDie(pool.ELIXIR, Dice.ELIXIR, ELIXIR_ROLL_TABLE, this.rng),
            ...rollDie(pool.FLUCH, Dice.FLUCH, FLUCH_ROLL_TABLE, this.rng),
        ];
    }

    public combineRolls(rolls: Array<Roll<Dice, Faces>>): RollValues {
        const results = rolls
            .map((roll) => parseRollValues(roll));
        return combineAll(results, rollValuesMonoid);
    }

    public toRoll(die: number, face: number): Roll<Dice, Faces> {
        return new Roll(die, face);
    }

    public formatRolls(rolls: Array<Roll<Dice, Faces>>): string {
        const combinedRolls = combineRolls(rolls, parseRollValues, rollValuesMonoid);
        return Mustache.render(
            base,
            {
                system: this.command,
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
        const JANUS = countMatches(dice, (die) => die === Dice.JANUS);
        const SEGNUNG = countMatches(dice, (die) => die === Dice.SEGNUNG);
        const BLUT = countMatches(dice, (die) => die === Dice.BLUT);
        const ELIXIR = countMatches(dice, (die) => die === Dice.ELIXIR);
        const FLUCH = countMatches(dice, (die) => die === Dice.FLUCH);
        return new DicePool(HEXXEN, JANUS, SEGNUNG, BLUT, ELIXIR, FLUCH);
    }

}
