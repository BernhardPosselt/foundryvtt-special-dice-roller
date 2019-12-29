import {RandomNumberGenerator} from '../rng';
import {
    Dice,
    interpretResult,
    V5Roll,
    RollResult,
    rollResultMonoid,
    Rolls,
    rollToRollResult,
    SKILL_ROLL_TABLE,
    HUNGER_ROLL_TABLE
} from './dice';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';
import {rollDie, Roller} from '../roller';
import * as Mustache from 'mustache';
import tpl from './template';
import {SimpleParser} from './parser';

export class V5Roller extends Roller<V5Roll, Rolls> {
    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()]);
    }

    roll(rolls: Rolls): V5Roll[] {
        const hunger = rollDie(rolls.hunger, HUNGER_ROLL_TABLE, () => false, this.rng)
            .map((face) => new V5Roll(Dice.HUNGER, face));
        const skills = rollDie(rolls.skills, SKILL_ROLL_TABLE, () => false, this.rng)
            .map((face) => new V5Roll(Dice.SKILL, face));
        return [...hunger, ...skills];
    }

    reRoll(keptResults: V5Roll[], reRollResults: V5Roll[]): V5Roll[] {
        const reRolledDice = reRollResults.map((roll) => roll.die);
        const hungerReRolls = countMatches(reRolledDice, (die) => die === Dice.HUNGER);
        const skillReRolls = countMatches(reRolledDice, (die) => die === Dice.SKILL);
        const reRolls = this.roll(new Rolls(hungerReRolls, skillReRolls));
        return [...keptResults, ...reRolls];
    }

    combineRolls(rolls: V5Roll[]): RollResult {
        const results = rolls
            .map((roll) => rollToRollResult(roll));
        return combineAll(results, rollResultMonoid);
    }

    protected formatRolls(rolls: V5Roll[]): string {
        return Mustache.render(tpl, {
            rolls: rolls,
            results: interpretResult(this.combineRolls(rolls)),
            timestamp: new Date().getTime(),
            rollIndex: function () {
                return rolls.indexOf(this);
            },
        });
    }
}
