import * as Mustache from 'mustache';
import {countMatches} from '../arrays';
import {IParser} from '../parser';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
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
import {tpl} from './template';

export function genesysRoller(rng: RandomNumberGenerator, command: string) {
    return new GenesysRoller(rng, command, [new SimpleParser()]);
}

export function starWarsRoller(rng: RandomNumberGenerator, command: string) {
    return new GenesysRoller(rng, command, [new SimpleSWParser()]);
}

export class GenesysRoller extends Roller<Dice, Faces, DicePool> {
    constructor(private rng: RandomNumberGenerator, command: string, parsers: Array<IParser<DicePool>>) {
        super(command, parsers);
    }

    public roll(pool: DicePool): Array<Roll<Dice, Faces>> {
        return [
            ...rollDie(pool.boost, Dice.BOOST, BOOST_ROLL_TABLE, this.rng),
            ...rollDie(pool.setback, Dice.SETBACK, SETBACK_ROLL_TABLE, this.rng),
            ...rollDie(pool.ability, Dice.ABILITY, ABILITY_ROLL_TABLE, this.rng),
            ...rollDie(pool.difficulty, Dice.DIFFICULTY, DIFFICULTY_ROLL_TABLE, this.rng),
            ...rollDie(pool.proficiency, Dice.PROFICIENCY, PROFICIENCY_ROLL_TABLE, this.rng),
            ...rollDie(pool.challenge, Dice.CHALLENGE, CHALLENGE_ROLL_TABLE, this.rng),
            ...rollDie(pool.force, Dice.FORCE, FORCE_ROLL_TABLE, this.rng),
        ];
    }

    public formatRolls(rolls: Array<Roll<Dice, Faces>>): string {
        const combinedRolls = combineRolls(rolls, parseRollValues, rollValuesMonoid);
        return Mustache.render(tpl(this.command), {
            rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages)),
            results: interpretResult(combinedRolls),
            rollIndex() {
                return rolls.indexOf(this);
            },
        });
    }

    protected toDicePool(faces: Dice[]): DicePool {
        const boost = countMatches(faces, (die) => die === Dice.BOOST);
        const setback = countMatches(faces, (die) => die === Dice.SETBACK);
        const ability = countMatches(faces, (die) => die === Dice.ABILITY);
        const difficulty  = countMatches(faces, (die) => die === Dice.DIFFICULTY);
        const proficiency = countMatches(faces, (die) => die === Dice.PROFICIENCY);
        const challenge  = countMatches(faces, (die) => die === Dice.CHALLENGE);
        const force = countMatches(faces, (die) => die === Dice.FORCE);
        return new DicePool(boost, setback, ability, difficulty, proficiency, challenge, force);
    }
}
