import {RandomNumberGenerator} from '../rng';
import {
    Dice,
    Faces,
    interpretResult,
    RING_ROLL_TABLE,
    RollValues,
    rollValuesMonoid,
    DicePool,
    rollToRollResult,
    SKILL_ROLL_TABLE, dieRollImages,
} from './dice';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';
import {Roll, rollDie, Roller} from '../roller';
import * as Mustache from 'mustache';
import tpl from './template';
import {SimpleParser} from './parser';
import {DieRollView} from '../view';

export class L5RRoller extends Roller<Dice, Faces, DicePool> {

    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()]);
    }

    roll(pool: DicePool): Roll<Dice, Faces>[] {
        const rings = rollDie(pool.rings, RING_ROLL_TABLE, isExploding, this.rng)
            .map((face) => new Roll(Dice.RING, face));
        const skills = rollDie(pool.skills, SKILL_ROLL_TABLE, isExploding, this.rng)
            .map((face) => new Roll(Dice.SKILL, face));
        return [...rings, ...skills];
    }

    combineRolls(rolls: Roll<Dice, Faces>[]): RollValues {
        const results = rolls
            .map((roll) => rollToRollResult(roll));
        return combineAll(results, rollValuesMonoid);
    }

    public formatRolls(rolls: Roll<Dice, Faces>[]): string {
        return Mustache.render(tpl, {
            rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages)),
            results: interpretResult(this.combineRolls(rolls)),
            timestamp: new Date().getTime(),
            rollIndex: function () {
                return rolls.indexOf(this);
            },
        });
    }

    protected toDicePool(faces: Dice[]): DicePool {
        const rings = countMatches(faces, (die) => die === Dice.RING);
        const skills = countMatches(faces, (die) => die === Dice.SKILL);
        return new DicePool(rings, skills);
    }
}

function isExploding(face: Faces): boolean {
    return face === Faces.EXPLODING_STRIFE ||
        face === Faces.EXPLODING_OPPORTUNITY ||
        face === Faces.EXPLODING;
}
