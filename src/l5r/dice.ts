import {Monoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    RING,
    SKILL
}

export enum Faces {
    SUCCESS,
    FAILURE,
    EXPLODING,
    OPPORTUNITY,
    SUCCESS_STRIFE,
    OPPORTUNITY_STRIFE,
    EXPLODING_STRIFE,
    EXPLODING_OPPORTUNITY,
    SUCCESS_OPPORTUNITY,
}

export const RING_ROLL_TABLE: Faces[] = [
    Faces.FAILURE,
    Faces.SUCCESS,
    Faces.SUCCESS_STRIFE,
    Faces.EXPLODING_STRIFE,
    Faces.OPPORTUNITY,
    Faces.OPPORTUNITY_STRIFE,
];

export const SKILL_ROLL_TABLE: Faces[] = [
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.SUCCESS_OPPORTUNITY,
    Faces.SUCCESS_STRIFE,
    Faces.SUCCESS_STRIFE,
    Faces.EXPLODING,
    Faces.EXPLODING_STRIFE,
    Faces.OPPORTUNITY,
    Faces.OPPORTUNITY,
    Faces.OPPORTUNITY,
];

export class Rolls {
    constructor(
        public rings = 0,
        public skills = 0,
    ) {
    }
}

export class RollResult {
    constructor(
        public successes = 0,
        public failures = 0,
        public opportunity = 0,
        public exploding = 0,
        public strife = 0,
    ) {
    }
}

export class L5RRoll extends Roll<Dice, Faces> {

    public get imageName(): string {
        if (this.die === Dice.RING) {
            if (this.face === Faces.FAILURE) {
                return 'black';
            } else if (this.face === Faces.EXPLODING_STRIFE) {
                return 'blacket';
            } else if (this.face === Faces.OPPORTUNITY) {
                return 'blacko';
            } else if (this.face === Faces.OPPORTUNITY_STRIFE) {
                return 'blackot';
            } else if (this.face === Faces.SUCCESS) {
                return 'blacks';
            } else {
                return 'blackst';
            }
        } else {
            if (this.face === Faces.FAILURE) {
                return 'white';
            } else if (this.face === Faces.EXPLODING) {
                return 'whitee';
            } else if (this.face === Faces.EXPLODING_STRIFE) {
                return 'whiteet';
            } else if (this.face === Faces.OPPORTUNITY) {
                return 'whiteo';
            } else if (this.face === Faces.SUCCESS) {
                return 'whites';
            } else if (this.face === Faces.SUCCESS_OPPORTUNITY) {
                return 'whiteso';
            } else {
                return 'whitest';
            }
        }
    }
}

export function rollToRollResult(roll: L5RRoll): RollResult {
    if (roll.face === Faces.SUCCESS) {
        return toRollResult({successes: 1});
    } else if (roll.face === Faces.FAILURE) {
        return toRollResult({failures: 1});
    } else if (roll.face === Faces.EXPLODING) {
        return toRollResult({successes: 1, exploding: 1});
    } else if (roll.face === Faces.OPPORTUNITY) {
        return toRollResult({opportunity: 1});
    } else if (roll.face === Faces.SUCCESS_STRIFE) {
        return toRollResult({successes: 1, strife: 1});
    } else if (roll.face === Faces.OPPORTUNITY_STRIFE) {
        return toRollResult({opportunity: 1, strife: 1});
    } else if (roll.face === Faces.EXPLODING_STRIFE) {
        return toRollResult({successes: 1, exploding: 1, strife: 1});
    } else if (roll.face === Faces.EXPLODING_OPPORTUNITY) {
        return toRollResult({successes: 1, exploding: 1, opportunity: 1});
    } else if (roll.face === Faces.SUCCESS_OPPORTUNITY) {
        return toRollResult({successes: 1, opportunity: 1});
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
        roll1.successes + roll2.successes,
        roll1.failures + roll2.failures,
        roll1.opportunity + roll2.opportunity,
        roll1.exploding + roll2.exploding,
        roll1.strife + roll2.strife,
    ),
};

export const rollsMonoid: Monoid<Rolls> = {
    identity: new Rolls(),
    combine: (roll1: Rolls, roll2: Rolls) => new Rolls(
        roll1.rings + roll2.rings,
        roll1.skills + roll2.skills,
    ),
};