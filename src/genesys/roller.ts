import {rollDie, Roller} from '../roller';
import {RandomNumberGenerator} from '../rng';
import {
    ABILITY_ROLL_TABLE,
    BOOST_ROLL_TABLE, CHALLENGE_ROLL_TABLE,
    Dice, DIFFICULTY_ROLL_TABLE, FORCE_ROLL_TABLE,
    GenesysRoll,
    interpretResult, PROFICIENCY_ROLL_TABLE, RollResult, rollResultMonoid,
    Rolls, rollToRollResult,
    SETBACK_ROLL_TABLE,
} from './dice';
import {SimpleParser, SimpleSWParser} from './parser';
import * as Mustache from 'mustache';
import {combineAll} from '../lang';
import {tpl} from './template';
import {Parser} from '../parser';

export function genesysRoller(rng: RandomNumberGenerator, command: string) {
    return new GenesysRoller(rng, command, [new SimpleParser()])
}

export function starWarsRoller(rng: RandomNumberGenerator, command: string) {
    return new GenesysRoller(rng, command, [new SimpleSWParser()])
}

export class GenesysRoller extends Roller<GenesysRoll, Rolls> {
    constructor(private rng: RandomNumberGenerator, command: string, parsers: Parser<Rolls>[]) {
        super(command, parsers);
    }

    roll(rolls: Rolls): GenesysRoll[] {
        const boosts = rollDie(rolls.boost, BOOST_ROLL_TABLE, () => false, this.rng)
            .map((face) => new GenesysRoll(Dice.BOOST, face));
        const setbacks = rollDie(rolls.setback, SETBACK_ROLL_TABLE, () => false, this.rng)
            .map((face) => new GenesysRoll(Dice.SETBACK, face));
        const abilities = rollDie(rolls.advantage, ABILITY_ROLL_TABLE, () => false, this.rng)
            .map((face) => new GenesysRoll(Dice.ABILITY, face));
        const difficulties = rollDie(rolls.difficulty, DIFFICULTY_ROLL_TABLE, () => false, this.rng)
            .map((face) => new GenesysRoll(Dice.DIFFICULTY, face));
        const proficiencies = rollDie(rolls.proficiency, PROFICIENCY_ROLL_TABLE, () => false, this.rng)
            .map((face) => new GenesysRoll(Dice.PROFICIENCY, face));
        const challenges = rollDie(rolls.challenge, CHALLENGE_ROLL_TABLE, () => false, this.rng)
            .map((face) => new GenesysRoll(Dice.CHALLENGE, face));
        const forces = rollDie(rolls.force, FORCE_ROLL_TABLE, () => false, this.rng)
            .map((face) => new GenesysRoll(Dice.FORCE, face));
        const result = [
            ...boosts,
            ...setbacks,
            ...abilities,
            ...difficulties,
            ...proficiencies,
            ...challenges,
            ...forces,
        ];
        console.log(`Rolled ${result} with formula ${rolls}`);
        return result;
    }

    combineRolls(rolls: GenesysRoll[]): RollResult {
        const results = rolls
            .map((roll) => rollToRollResult(roll));
        return combineAll(results, rollResultMonoid);
    }

    protected formatRolls(rolls: GenesysRoll[]): string {
        return Mustache.render(tpl(this.command), {
            rolls: rolls,
            results: interpretResult(this.combineRolls(rolls)),
            timestamp: new Date().getTime(),
            rollIndex: function () {
                return rolls.indexOf(this);
            },
        });
    }
}