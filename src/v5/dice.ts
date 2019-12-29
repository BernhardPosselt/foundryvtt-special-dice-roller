import {Monoid} from '../lang';
import {Roll} from '../roller';
import {getDieImage} from '../images';

export enum Dice {
    HUNGER,
    SKILL
}

export enum Faces {
    HUNGER_FAILURE_1,
    FAILURE,
    SUCCESS,
    POTENTIAL_CRITICAL_SUCCESS,
    HUNGER_POTENTIAL_CRITICAL_SUCCESS
}

export const SKILL_ROLL_TABLE: Faces[] = [
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.POTENTIAL_CRITICAL_SUCCESS,
];

export const HUNGER_ROLL_TABLE: Faces[] = [
    Faces.HUNGER_FAILURE_1,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.HUNGER_POTENTIAL_CRITICAL_SUCCESS,
];

export class Rolls {
    constructor(
        public skills = 0,
        public hunger = 0,
    ) {
    }
}

export class RollResult {
    constructor(
        public successes = 0,
        public failures = 0,
        public potentialCriticals = 0,
        public hungerFailures1 = 0,
        public hungerPotentialCriticals = 0,
    ) {
    }
}

const skillImages = new Map<Faces, string>();
skillImages.set(Faces.FAILURE, 'blackf');
skillImages.set(Faces.SUCCESS, 'blacks');
skillImages.set(Faces.POTENTIAL_CRITICAL_SUCCESS, 'blackpcs');

const hungerImages = new Map<Faces, string>();
hungerImages.set(Faces.HUNGER_FAILURE_1, 'redf1');
hungerImages.set(Faces.FAILURE, 'redf');
hungerImages.set(Faces.SUCCESS, 'reds');
hungerImages.set(Faces.HUNGER_POTENTIAL_CRITICAL_SUCCESS, 'redpcs');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.HUNGER, hungerImages);
dieRollImages.set(Dice.SKILL, skillImages);

export class V5Roll extends Roll<Dice, Faces> {

    public get imageName(): string {
        return getDieImage(dieRollImages, this.die, this.face);
    }
}

const rollToRollResultMapping = new Map<Faces, Partial<RollResult>>();
rollToRollResultMapping.set(Faces.SUCCESS, {successes: 1});
rollToRollResultMapping.set(Faces.FAILURE, {failures: 1});
rollToRollResultMapping.set(Faces.HUNGER_FAILURE_1, {hungerFailures1: 1});
rollToRollResultMapping.set(Faces.POTENTIAL_CRITICAL_SUCCESS, {potentialCriticals: 1});
rollToRollResultMapping.set(Faces.HUNGER_POTENTIAL_CRITICAL_SUCCESS, {hungerPotentialCriticals: 1});

export class InterpretedResult {
    constructor(
        public successes = 0,
        public messyCritical = false,
        public bestialFailure = false,
    ) {
    }
}

export function interpretResult(result: RollResult): InterpretedResult {
    // each pair of 10s is worth 4 successes
    const criticalSuccesses = Math.floor((result.hungerPotentialCriticals + result.potentialCriticals) / 2);
    const successes = result.successes + criticalSuccesses * 4;
    // if there is at least one critical and a hunger critical, it becomes messy
    const messyCritical = criticalSuccesses > 0 && result.hungerPotentialCriticals > 0;
    const bestialFailure = result.hungerFailures1 > 0;

    return new InterpretedResult(
        successes,
        messyCritical,
        bestialFailure
    );
}

export function rollToRollResult(roll: V5Roll): RollResult {
    const result = rollToRollResultMapping.get(roll.face);
    if (result !== undefined) {
        return toRollResult(result);
    } else {
        throw new Error('Unhandled Face');
    }
}

export function toRollResult(partial: Partial<RollResult>): RollResult {
    return Object.assign(new RollResult(), partial);
}

export const rollResultMonoid: Monoid<RollResult> = {
    identity: new RollResult(),
    combine: (roll1: RollResult, roll2: RollResult) => new RollResult(
        roll1.successes + roll2.successes,
        roll1.failures + roll2.failures,
        roll1.hungerFailures1 + roll2.hungerFailures1,
        roll1.potentialCriticals + roll2.potentialCriticals,
        roll1.hungerPotentialCriticals + roll2.hungerPotentialCriticals,
    ),
};

export const rollsMonoid: Monoid<Rolls> = {
    identity: new Rolls(),
    combine: (roll1: Rolls, roll2: Rolls) => new Rolls(
        roll1.skills + roll2.skills,
        roll1.hunger + roll2.hunger,
    ),
};
