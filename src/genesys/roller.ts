import * as Mustache from 'mustache';
import {countMatches} from '../arrays';
import {IParser} from '../parser';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import base from '../template';
import {DieRollView} from '../view';
import {
    ABILITY_ROLL_TABLE,
    BOOST_ROLL_TABLE,
    CHALLENGE_ROLL_TABLE,
    Dice,
    DicePool,
    dieRollImages,
    DIFFICULTY_ROLL_TABLE,
    Faces,
    FORCE_ROLL_TABLE,
    interpretResult,
    parseRollValues,
    PROFICIENCY_ROLL_TABLE,
    rollValuesMonoid,
    SETBACK_ROLL_TABLE,
} from './dice';
import {SimpleParser, SimpleSWParser} from './parser';
import tpl from './template';

export function genesysRoller(rng: RandomNumberGenerator, command: string): GenesysRoller {
    return new GenesysRoller(rng, command, [new SimpleParser()]);
}

export function starWarsRoller(rng: RandomNumberGenerator, command: string): GenesysRoller {
    return new GenesysRoller(rng, command, [new SimpleSWParser()]);
}

export class GenesysRoller extends Roller<Dice, Faces, DicePool> {
    constructor(private rng: RandomNumberGenerator, command: string, parsers: IParser<DicePool>[]) {
        super(command, parsers);
    }

    public roll(pool: DicePool): Roll<Dice, Faces>[] {
        return [
            ...rollDie(pool.proficiency, Dice.PROFICIENCY, PROFICIENCY_ROLL_TABLE, this.rng),
            ...rollDie(pool.ability, Dice.ABILITY, ABILITY_ROLL_TABLE, this.rng),
            ...rollDie(pool.challenge, Dice.CHALLENGE, CHALLENGE_ROLL_TABLE, this.rng),
            ...rollDie(pool.difficulty, Dice.DIFFICULTY, DIFFICULTY_ROLL_TABLE, this.rng),
            ...rollDie(pool.boost, Dice.BOOST, BOOST_ROLL_TABLE, this.rng),
            ...rollDie(pool.setback, Dice.SETBACK, SETBACK_ROLL_TABLE, this.rng),
            ...rollDie(pool.force, Dice.FORCE, FORCE_ROLL_TABLE, this.rng),
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
        const boost = countMatches(dice, (die) => die === Dice.BOOST);
        const setback = countMatches(dice, (die) => die === Dice.SETBACK);
        const ability = countMatches(dice, (die) => die === Dice.ABILITY);
        const difficulty = countMatches(dice, (die) => die === Dice.DIFFICULTY);
        const proficiency = countMatches(dice, (die) => die === Dice.PROFICIENCY);
        const challenge = countMatches(dice, (die) => die === Dice.CHALLENGE);
        const force = countMatches(dice, (die) => die === Dice.FORCE);
        return new DicePool(boost, setback, ability, difficulty, proficiency, challenge, force);
    }
}
