import {Roll, rollDie, Roller} from '../roller';
import {RandomNumberGenerator} from '../rng';
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
    PROFICIENCY_ROLL_TABLE,
    rollToRollResult,
    RollValues,
    rollValuesMonoid,
    SETBACK_ROLL_TABLE,
} from './dice';
import {SimpleParser, SimpleSWParser} from './parser';
import * as Mustache from 'mustache';
import {combineAll} from '../lang';
import {tpl} from './template';
import {Parser} from '../parser';
import {countMatches} from '../arrays';
import {DieRollView} from '../view';

export function genesysRoller(rng: RandomNumberGenerator, command: string) {
    return new GenesysRoller(rng, command, [new SimpleParser()]);
}

export function starWarsRoller(rng: RandomNumberGenerator, command: string) {
    return new GenesysRoller(rng, command, [new SimpleSWParser()]);
}

export class GenesysRoller extends Roller<Dice, Faces, DicePool> {
    constructor(private rng: RandomNumberGenerator, command: string, parsers: Parser<DicePool>[]) {
        super(command, parsers);
    }

    roll(pool: DicePool): Roll<Dice, Faces>[] {
        const boosts = rollDie(pool.boost, BOOST_ROLL_TABLE, () => false, this.rng)
            .map((face) => new Roll(Dice.BOOST, face));
        const setbacks = rollDie(pool.setback, SETBACK_ROLL_TABLE, () => false, this.rng)
            .map((face) => new Roll(Dice.SETBACK, face));
        const abilities = rollDie(pool.ability, ABILITY_ROLL_TABLE, () => false, this.rng)
            .map((face) => new Roll(Dice.ABILITY, face));
        const difficulties = rollDie(pool.difficulty, DIFFICULTY_ROLL_TABLE, () => false, this.rng)
            .map((face) => new Roll(Dice.DIFFICULTY, face));
        const proficiencies = rollDie(pool.proficiency, PROFICIENCY_ROLL_TABLE, () => false, this.rng)
            .map((face) => new Roll(Dice.PROFICIENCY, face));
        const challenges = rollDie(pool.challenge, CHALLENGE_ROLL_TABLE, () => false, this.rng)
            .map((face) => new Roll(Dice.CHALLENGE, face));
        const forces = rollDie(pool.force, FORCE_ROLL_TABLE, () => false, this.rng)
            .map((face) => new Roll(Dice.FORCE, face));
        return [
            ...boosts,
            ...setbacks,
            ...abilities,
            ...difficulties,
            ...proficiencies,
            ...challenges,
            ...forces,
        ];
    }

    combineRolls(rolls: Roll<Dice, Faces>[]): RollValues {
        const results = rolls
            .map((roll) => rollToRollResult(roll));
        return combineAll(results, rollValuesMonoid);
    }

    formatRolls(rolls: Roll<Dice, Faces>[]): string {
        return Mustache.render(tpl(this.command), {
            rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages)),
            results: interpretResult(this.combineRolls(rolls)),
            timestamp: new Date().getTime(),
            rollIndex: function () {
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