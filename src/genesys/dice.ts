import {Monoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    BOOST,
    SETBACK,
    ABILITY,
    DIFFICULTY,
    PROFICIENCY,
    CHALLENGE
}

export enum Faces {
    BLANK,
    SUCCESS,
    DOUBLE_SUCCESS,
    FAILURE,
    DOUBLE_FAILURE,
    ABILITY,
    DOUBLE_ABILITY,
    THREAT,
    DOUBLE_THREAT,
    TRIUMPH,
    DESPAIR,
    SUCCESS_ABILITY,
    FAILURE_THREAT
}

export const BOOST_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BLANK,
    Faces.SUCCESS,
    Faces.SUCCESS_ABILITY,
    Faces.DOUBLE_ABILITY,
    Faces.ABILITY,
];

export const SETBACK_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BLANK,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.THREAT,
    Faces.THREAT,
];

export const ABILITY_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.DOUBLE_SUCCESS,
    Faces.ABILITY,
    Faces.ABILITY,
    Faces.SUCCESS_ABILITY,
    Faces.DOUBLE_ABILITY,
];

export const DIFFICULTY_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.FAILURE,
    Faces.DOUBLE_FAILURE,
    Faces.THREAT,
    Faces.THREAT,
    Faces.THREAT,
    Faces.DOUBLE_THREAT,
    Faces.FAILURE_THREAT,
];

export const PROFICIENCY_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.DOUBLE_SUCCESS,
    Faces.DOUBLE_SUCCESS,
    Faces.ABILITY,
    Faces.SUCCESS_ABILITY,
    Faces.SUCCESS_ABILITY,
    Faces.SUCCESS_ABILITY,
    Faces.DOUBLE_ABILITY,
    Faces.DOUBLE_ABILITY,
    Faces.TRIUMPH,
];

export const CHALLENGE_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.DOUBLE_FAILURE,
    Faces.DOUBLE_FAILURE,
    Faces.THREAT,
    Faces.THREAT,
    Faces.FAILURE_THREAT,
    Faces.FAILURE_THREAT,
    Faces.DOUBLE_THREAT,
    Faces.DOUBLE_THREAT,
    Faces.DESPAIR,
];

export class Rolls {
    constructor(
        public boost = 0,
        public setback = 0,
        public ability = 0,
        public difficulty = 0,
        public proficiency = 0,
        public challenge = 0,
    ) {
    }
}

export class RollResult {
    constructor(
        public blanks = 0,
        public successes = 0,
        public failures = 0,
        public abilities = 0,
        public threats = 0,
        public triumphs = 0,
        public despairs = 0,
    ) {
    }
}

export class GenesysRoll extends Roll<Dice, Faces> {

}

export function rollToRollResult(roll: GenesysRoll): RollResult {
    if (roll.face === Faces.BLANK) {
        return toRollResult({blanks: 1});
    } else if (roll.face === Faces.SUCCESS) {
        return toRollResult({successes: 1});
    } else if (roll.face === Faces.DOUBLE_SUCCESS) {
        return toRollResult({successes: 2});
    } else if (roll.face === Faces.FAILURE) {
        return toRollResult({failures: 1});
    } else if (roll.face === Faces.DOUBLE_FAILURE) {
        return toRollResult({failures: 2});
    } else if (roll.face === Faces.ABILITY) {
        return toRollResult({abilities: 1});
    } else if (roll.face === Faces.DOUBLE_ABILITY) {
        return toRollResult({abilities: 2});
    } else if (roll.face === Faces.THREAT) {
        return toRollResult({threats: 1});
    } else if (roll.face === Faces.DOUBLE_THREAT) {
        return toRollResult({threats: 2});
    } else if (roll.face === Faces.TRIUMPH) {
        return toRollResult({triumphs: 1});
    } else if (roll.face === Faces.DESPAIR) {
        return toRollResult({despairs: 1});
    } else if (roll.face === Faces.SUCCESS_ABILITY) {
        return toRollResult({successes: 1, abilities: 1});
    } else if (roll.face === Faces.FAILURE_THREAT) {
        return toRollResult({failures: 1, threats: 1});
    } else {
        throw new Error('Unhandled Face');
    }
}

function toRollResult(partial: Partial<RollResult>): RollResult {
    return Object.assign(new RollResult(), partial);
}

export const rollResultMonoid: Monoid<RollResult> = {
    identity: new RollResult(),
    combine: (roll1: RollResult, roll2: RollResult) => new RollResult(
        roll1.blanks + roll2.blanks,
        roll1.successes + roll2.successes,
        roll1.failures + roll2.failures,
        roll1.abilities + roll2.failures,
        roll1.threats + roll2.threats,
        roll1.triumphs + roll2.triumphs,
        roll1.despairs + roll2.despairs,
    ),
};

export const rollsMonoid: Monoid<Rolls> = {
    identity: new Rolls(),
    combine: (roll1: Rolls, roll2: Rolls) => new Rolls(
        roll1.boost + roll2.boost,
        roll1.setback + roll2.setback,
        roll1.ability + roll2.ability,
        roll1.difficulty + roll2.difficulty,
        roll1.proficiency + roll2.proficiency,
        roll1.challenge + roll2.challenge,
    ),
};