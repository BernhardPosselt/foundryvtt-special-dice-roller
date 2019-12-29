import {RandomNumberGenerator} from '../rng';
import {
    Dice,
    Faces,
    interpretResult,
    L5RRoll,
    RING_ROLL_TABLE,
    RollResult,
    rollResultMonoid,
    Rolls,
    rollToRollResult,
    SKILL_ROLL_TABLE,
} from './dice';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';
import {CanReRoll, rollDie, Roller} from '../roller';
import * as Mustache from 'mustache';
import tpl from './template';
import {SimpleParser} from './parser';

export class L5RRoller extends Roller<L5RRoll, Rolls> implements CanReRoll<L5RRoll>{

    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()]);
    }

    roll(rolls: Rolls): L5RRoll[] {
        const rings = rollDie(rolls.rings, RING_ROLL_TABLE, isExploding, this.rng)
            .map((face) => new L5RRoll(Dice.RING, face));
        const skills = rollDie(rolls.skills, SKILL_ROLL_TABLE, isExploding, this.rng)
            .map((face) => new L5RRoll(Dice.SKILL, face));
        return [...rings, ...skills];
    }

    reRoll(keptResults: L5RRoll[], reRollResults: L5RRoll[]): L5RRoll[] {
        const reRolledDice = reRollResults.map((roll) => roll.die);
        const ringReRolls = countMatches(reRolledDice, (die) => die === Dice.RING);
        const skillReRolls = countMatches(reRolledDice, (die) => die === Dice.SKILL);
        const reRolls = this.roll(new Rolls(ringReRolls, skillReRolls));
        return [...keptResults, ...reRolls];
    }

    combineRolls(rolls: L5RRoll[]): RollResult {
        const results = rolls
            .map((roll) => rollToRollResult(roll));
        return combineAll(results, rollResultMonoid);
    }

    public formatRolls(rolls: L5RRoll[]): string {
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

function isExploding(face: Faces): boolean {
    return face === Faces.EXPLODING_STRIFE ||
        face === Faces.EXPLODING_OPPORTUNITY ||
        face === Faces.EXPLODING;
}
