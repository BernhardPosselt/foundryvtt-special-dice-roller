import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    RING,
    SKILL,
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

export class DicePool {
    constructor(
        public rings: number = 0,
        public skills: number = 0,
    ) {
    }

    public toString(): string {
        return `rings: ${this.rings}, skills: ${this.skills}`;
    }
}

export class RollValues {
    constructor(
        public successes: number = 0,
        public failures: number = 0,
        public opportunity: number = 0,
        public exploding: number = 0,
        public strife: number = 0,
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

const rollToRollResultMapping = new Map<Faces, Partial<RollValues>>();
rollToRollResultMapping.set(Faces.SUCCESS, {successes: 1});
rollToRollResultMapping.set(Faces.FAILURE, {failures: 1});
rollToRollResultMapping.set(Faces.EXPLODING, {exploding: 1});
rollToRollResultMapping.set(Faces.OPPORTUNITY, {opportunity: 1});
rollToRollResultMapping.set(Faces.SUCCESS_STRIFE, {successes: 1, strife: 1});
rollToRollResultMapping.set(Faces.OPPORTUNITY_STRIFE, {opportunity: 1, strife: 1});
rollToRollResultMapping.set(Faces.EXPLODING_STRIFE, {exploding: 1, strife: 1});
rollToRollResultMapping.set(Faces.EXPLODING_OPPORTUNITY, {exploding: 1, opportunity: 1});
rollToRollResultMapping.set(Faces.SUCCESS_OPPORTUNITY, {successes: 1, opportunity: 1});

export function interpretResult(result: RollValues): RollValues {
    return new RollValues(
        result.successes + result.exploding,
        result.failures,
        result.opportunity,
        result.exploding,
        result.strife,
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

function toRollResult(partial: Partial<RollValues>): RollValues {
    return Object.assign(new RollValues(), partial);
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.successes + roll2.successes,
        roll1.failures + roll2.failures,
        roll1.opportunity + roll2.opportunity,
        roll1.exploding + roll2.exploding,
        roll1.strife + roll2.strife,
    ),
};

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.rings + roll2.rings,
        roll1.skills + roll2.skills,
    ),
};
