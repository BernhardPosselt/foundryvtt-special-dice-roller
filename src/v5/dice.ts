import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    HUNGER,
    SKILL,
}

export enum Faces {
    HUNGER_FAILURE_1,
    FAILURE,
    SUCCESS,
    POTENTIAL_CRITICAL_SUCCESS,
    HUNGER_POTENTIAL_CRITICAL_SUCCESS,
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

export class DicePool {
    constructor(
        public skills: number = 0,
        public hunger: number = 0,
    ) {
    }

    public toString(): string {
        return `skills: ${this.skills}, hunger: ${this.hunger}`;
    }
}

export class RollValues {
    constructor(
        public successes: number = 0,
        public failures: number = 0,
        public potentialCriticals: number = 0,
        public hungerFailures1: number = 0,
        public hungerPotentialCriticals: number = 0,
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

const rollToRollResultMapping = new Map<Faces, Partial<RollValues>>();
rollToRollResultMapping.set(Faces.SUCCESS, {successes: 1});
rollToRollResultMapping.set(Faces.FAILURE, {failures: 1});
rollToRollResultMapping.set(Faces.HUNGER_FAILURE_1, {hungerFailures1: 1});
rollToRollResultMapping.set(Faces.POTENTIAL_CRITICAL_SUCCESS, {potentialCriticals: 1});
rollToRollResultMapping.set(Faces.HUNGER_POTENTIAL_CRITICAL_SUCCESS, {hungerPotentialCriticals: 1});

export class InterpretedResult {
    constructor(
        public successes: number = 0,
        public messyCritical: boolean = false,
        public bestialFailure: boolean = false,
    ) {
    }
}

export function interpretResult(result: RollValues): InterpretedResult {
    // each pair of 10s is worth 4 successes
    const potentialCriticals = result.hungerPotentialCriticals + result.potentialCriticals;
    const leftOverCriticals = potentialCriticals % 2;
    const criticalSuccesses = Math.floor(potentialCriticals / 2);
    const successes = result.successes + criticalSuccesses * 4 + leftOverCriticals;
    // if there is at least one critical and a hunger critical, it becomes messy
    const messyCritical = criticalSuccesses > 0 && result.hungerPotentialCriticals > 0;
    const bestialFailure = result.hungerFailures1 > 0;

    return new InterpretedResult(
        successes,
        messyCritical,
        bestialFailure,
    );
}

export function parseRollValues(roll: Roll<Dice, Faces>): RollValues {
    const result = rollToRollResultMapping.get(roll.face);
    if (result !== undefined) {
        return toRollResult(result);
    } else {
        throw new Error(`Unhandled Face ${roll.face}`);
    }
}

export function toRollResult(partial: Partial<RollValues>): RollValues {
    return Object.assign(new RollValues(), partial);
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.successes + roll2.successes,
        roll1.failures + roll2.failures,
        roll1.potentialCriticals + roll2.potentialCriticals,

        roll1.hungerFailures1 + roll2.hungerFailures1,
        roll1.hungerPotentialCriticals + roll2.hungerPotentialCriticals,
    ),
};

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.skills + roll2.skills,
        roll1.hunger + roll2.hunger,
    ),
};
