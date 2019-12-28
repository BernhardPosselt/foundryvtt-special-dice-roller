import {rollDie, Roller} from '../roller';
import {parseFormula, Parser} from '../parser';
import {RandomNumberGenerator} from '../rng';
import {
    ABILITY_ROLL_TABLE,
    BOOST_ROLL_TABLE, CHALLENGE_ROLL_TABLE,
    Dice, DIFFICULTY_ROLL_TABLE, FORCE_ROLL_TABLE,
    GenesysRoll,
    interpretRollResult, PROFICIENCY_ROLL_TABLE, RollResult, rollResultMonoid,
    Rolls, rollToRollResult,
    SETBACK_ROLL_TABLE,
} from './dice';
import {ComplexParser, ComplexSWParser, SimpleParser, SimpleSWParser} from './parser';
import * as Mustache from 'mustache';
import {combineAll} from '../lang';
import {tpl} from './template';

export class GenesysRoller extends Roller {
    private readonly parsers: Parser<Rolls>[];

    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command);
        if (command === 'sw') {
            this.parsers = [new SimpleSWParser(), new ComplexSWParser()];
        } else {
            this.parsers = [new SimpleParser(), new ComplexParser()];
        }
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

    protected rollFormula(formula: string): string {
        try {
            const parsedFormula = parseFormula(formula, this.parsers);
            const rolls = this.roll(parsedFormula);
            return this.formatRolls(rolls);
        } catch (e) {
            return e.message;
        }
    }

    combineRolls(rolls: GenesysRoll[]): RollResult {
        const results = rolls
            .map((roll) => rollToRollResult(roll));
        return combineAll(results, rollResultMonoid);
    }

    private formatRolls(rolls: GenesysRoll[]): string {
        return Mustache.render(tpl(this.command), {
            rolls: rolls,
            results: interpretRollResult(this.combineRolls(rolls)),
            timestamp: new Date().getTime(),
            rollIndex: function () {
                return rolls.indexOf(this);
            },
        });
    }
}