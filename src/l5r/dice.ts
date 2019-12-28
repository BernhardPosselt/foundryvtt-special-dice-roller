import {Monoid} from '../lang';
import {Roll} from '../roller';
import {getDieImage} from '../images';

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

const ringImages = new Map<Faces, string>();
ringImages.set(Faces.FAILURE, 'black');
ringImages.set(Faces.EXPLODING_STRIFE, 'blacket');
ringImages.set(Faces.OPPORTUNITY, 'blacko');
ringImages.set(Faces.OPPORTUNITY_STRIFE, 'blackot');
ringImages.set(Faces.SUCCESS, 'blacks');
ringImages.set(Faces.SUCCESS_STRIFE, 'blackst');

const skillImages = new Map<Faces, string>();
skillImages.set(Faces.FAILURE, 'white');
skillImages.set(Faces.EXPLODING, 'whitee');
skillImages.set(Faces.EXPLODING_STRIFE, 'whiteet');
skillImages.set(Faces.OPPORTUNITY, 'whiteo');
skillImages.set(Faces.SUCCESS, 'whites');
skillImages.set(Faces.SUCCESS_OPPORTUNITY, 'whiteso');
skillImages.set(Faces.SUCCESS_STRIFE, 'whitest');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.RING, ringImages);
dieRollImages.set(Dice.SKILL, skillImages);

export class L5RRoll extends Roll<Dice, Faces> {

    public get imageName(): string {
        return getDieImage(dieRollImages, this.die, this.face);
    }
}

const rollToRollResultMapping = new Map<Faces, Partial<RollResult>>();
rollToRollResultMapping.set(Faces.SUCCESS, {successes: 1});
rollToRollResultMapping.set(Faces.FAILURE, {failures: 1});
rollToRollResultMapping.set(Faces.EXPLODING, {exploding: 1});
rollToRollResultMapping.set(Faces.OPPORTUNITY, {opportunity: 1});
rollToRollResultMapping.set(Faces.SUCCESS_STRIFE, {successes: 1, strife: 1});
rollToRollResultMapping.set(Faces.OPPORTUNITY_STRIFE, {opportunity: 1, strife: 1});
rollToRollResultMapping.set(Faces.EXPLODING_STRIFE, {exploding: 1, strife: 1});
rollToRollResultMapping.set(Faces.EXPLODING_OPPORTUNITY, {exploding: 1, opportunity: 1});
rollToRollResultMapping.set(Faces.SUCCESS_OPPORTUNITY, {successes: 1, opportunity: 1});

export function interpretResult(result: RollResult): RollResult {
    return new RollResult(
        result.successes + result.exploding,
        result.failures,
        result.opportunity,
        result.exploding,
        result.strife
    )
}

export function rollToRollResult(roll: L5RRoll): RollResult {
    const result = rollToRollResultMapping.get(roll.face);
    if (result !== undefined) {
        return toRollResult(result);
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
