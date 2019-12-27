import {shim} from 'array.prototype.flatmap';
import {RandomNumberGenerator} from '../rng';
import {
    Dice,
    Faces,
    L5RRoll,
    RING_ROLL_TABLE,
    RollResult,
    rollResultMonoid, Rolls,
    rollToRollResult,
    SKILL_ROLL_TABLE,
} from './dice';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';

export function countResults(rolls: L5RRoll[]): RollResult {
    const results = rolls
        .map((roll) => rollToRollResult(roll));
    return combineAll(results, rollResultMonoid);
}

export function reRoll(
    keptResults: L5RRoll[],
    reRollResults: L5RRoll[],
    rng: RandomNumberGenerator,
): L5RRoll[] {
    const reRolledDice = reRollResults.map((roll) => roll.die);
    const ringReRolls = countMatches(reRolledDice, (die) => die === Dice.RING);
    const skillReRolls = countMatches(reRolledDice, (die) => die === Dice.SKILL);
    const reRolls = roll(new Rolls(ringReRolls, skillReRolls), rng);
    return [...keptResults, ...reRolls];
}

export function roll(
    rolls: Rolls,
    rng: RandomNumberGenerator,
): L5RRoll[] {
    const rings = rollResults(rolls.rings, RING_ROLL_TABLE, rng)
        .map((face) => new L5RRoll(Dice.RING, face));
    const skills = rollResults(rolls.skills, SKILL_ROLL_TABLE, rng)
        .map((face) => new L5RRoll(Dice.SKILL, face));
    return [...rings, ...skills];
}

function isExploding(face: Faces): boolean {
    return face === Faces.EXPLODING_STRIFE ||
        face === Faces.EXPLODING_OPPORTUNITY ||
        face === Faces.EXPLODING;
}

function rollResults(
    rolls: number,
    rollTable: Faces[],
    rng: RandomNumberGenerator,
): number[] {
    shim();
    return Array.from({length: rolls}, () => rng(rollTable.length))
        .map((randomNumber: number) => rollTable[randomNumber])
        .flatMap((face) => {
            if (isExploding(face)) {
                return [face, ...rollResults(1, rollTable, rng)];
            } else {
                return [face];
            }
        });
}