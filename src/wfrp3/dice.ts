import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    CHAR,
    CONSERVATIVE,
    RECKLESS,
    EXPERTISE,
    FORTUNE,
    MISFORTUNE,
    CHALLENGE,
}

export enum Faces {
    BLANK,
    SUCCESS,
    SUCCESS_PLUS,
    SUCCESS_BOON,
    SUCCESS_FATIGUE,
    SUCCESS_DELAY,
    DOUBLE_SUCCESS,
    COMET,
    DOUBLE_BOON,
    BOON,
    DELAY,
    FATIGUE,
    FAILURE,
    DOUBLE_FAILURE,
    BANE,
    DOUBLE_BANE,
    CHAOS_STAR,
}

export const CHALLENGE_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BANE,
    Faces.DOUBLE_BANE,
    Faces.CHAOS_STAR,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.DOUBLE_FAILURE,
    Faces.DOUBLE_FAILURE,
];

export const CHARACTERISTIC_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BOON,
    Faces.SUCCESS,
    Faces.BLANK,
    Faces.BOON,
    Faces.SUCCESS,
];

export const CONSERVATIVE_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BOON,
    Faces.BOON,
    Faces.SUCCESS_BOON,
    Faces.SUCCESS_DELAY,
    Faces.SUCCESS_DELAY,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.SUCCESS,
];

export const RECKLESS_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BLANK,
    Faces.BANE,
    Faces.BANE,
    Faces.DOUBLE_BOON,
    Faces.SUCCESS_BOON,
    Faces.SUCCESS_FATIGUE,
    Faces.SUCCESS_FATIGUE,
    Faces.DOUBLE_SUCCESS,
    Faces.DOUBLE_SUCCESS,
];

export const FORTUNE_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BLANK,
    Faces.BLANK,
    Faces.BOON,
    Faces.SUCCESS,
    Faces.SUCCESS,
];

export const MISFORTUNE_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BLANK,
    Faces.BLANK,
    Faces.BANE,
    Faces.FAILURE,
    Faces.FAILURE,
];

export const EXPERTISE_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BOON,
    Faces.BOON,
    Faces.SUCCESS,
    Faces.SUCCESS_PLUS,
    Faces.COMET,
];

export class DicePool {
    constructor(
        public characteristics: number = 0,
        public conservative: number = 0,
        public reckless: number = 0,
        public expertise: number = 0,
        public fortune: number = 0,
        public misfortune: number = 0,
        public challenge: number = 0,
    ) {
    }

    public toString(): string {
        return `characteristics: ${this.characteristics}, conservative: ${this.conservative}, reckless: ${this.reckless}, expertise: ${this.expertise}, fortune: ${this.fortune}, misfortune: ${this.misfortune}, challenge: ${this.challenge}`;
    }
}

export class RollValues {
    constructor(
        public blanks: number = 0,
        public successes: number = 0,
        public failures: number = 0,
        public boons: number = 0,
        public banes: number = 0,
        public delays: number = 0,
        public fatigues: number = 0,
        public stars: number = 0,
        public comets: number = 0,
    ) {
    }
}

const charImages = new Map<Faces, string>();
charImages.set(Faces.BLANK, 'char-blank');
charImages.set(Faces.SUCCESS, 'char-success');
charImages.set(Faces.BOON, 'char-boon');

const conservativeImages = new Map<Faces, string>();
conservativeImages.set(Faces.BLANK, 'conservative-blank');
conservativeImages.set(Faces.BOON, 'conservative-boon');
conservativeImages.set(Faces.SUCCESS_BOON, 'conservative-boon-success');
conservativeImages.set(Faces.SUCCESS_DELAY, 'conservative-delay-success');
conservativeImages.set(Faces.SUCCESS, 'conservative-success');
conservativeImages.set(Faces.DELAY, 'conservative-delay');

const recklessImages = new Map<Faces, string>();
recklessImages.set(Faces.BLANK, 'reckless-blank');
recklessImages.set(Faces.BANE, 'reckless-bane');
recklessImages.set(Faces.SUCCESS_BOON, 'reckless-boon-success');
recklessImages.set(Faces.SUCCESS_FATIGUE, 'reckless-fatigue-success');
recklessImages.set(Faces.DOUBLE_BOON, 'reckless-2-boons');
recklessImages.set(Faces.DOUBLE_SUCCESS, 'reckless-2-successes');
recklessImages.set(Faces.FATIGUE, 'reckless-fatigue');

const expertiseImages = new Map<Faces, string>();
expertiseImages.set(Faces.BLANK, 'expertise-blank');
expertiseImages.set(Faces.BOON, 'expertise-boon');
expertiseImages.set(Faces.SUCCESS, 'expertise-success');
expertiseImages.set(Faces.SUCCESS_PLUS, 'expertise-success-plus');
expertiseImages.set(Faces.COMET, 'expertise-comet');

const fortuneImages = new Map<Faces, string>();
fortuneImages.set(Faces.BLANK, 'fortune-blank');
fortuneImages.set(Faces.BOON, 'fortune-boon');
fortuneImages.set(Faces.SUCCESS, 'fortune-success');

const misfortuneImages = new Map<Faces, string>();
misfortuneImages.set(Faces.BLANK, 'misfortune-blank');
misfortuneImages.set(Faces.BANE, 'misfortune-bane');
misfortuneImages.set(Faces.FAILURE, 'misfortune-failure');

const challengeImages = new Map<Faces, string>();
challengeImages.set(Faces.BLANK, 'challenge-blank');
challengeImages.set(Faces.BANE, 'challenge-bane');
challengeImages.set(Faces.DOUBLE_BANE, 'challenge-2-banes');
challengeImages.set(Faces.CHAOS_STAR, 'challenge-star');
challengeImages.set(Faces.FAILURE, 'challenge-failure');
challengeImages.set(Faces.DOUBLE_FAILURE, 'challenge-2-failures');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.CHAR, charImages);
dieRollImages.set(Dice.CONSERVATIVE, conservativeImages);
dieRollImages.set(Dice.RECKLESS, recklessImages);
dieRollImages.set(Dice.EXPERTISE, expertiseImages);
dieRollImages.set(Dice.FORTUNE, fortuneImages);
dieRollImages.set(Dice.MISFORTUNE, misfortuneImages);
dieRollImages.set(Dice.CHALLENGE, challengeImages);

const rollToRollResultMapping = new Map<Faces, Partial<RollValues>>();
rollToRollResultMapping.set(Faces.BLANK, {blanks: 1});
rollToRollResultMapping.set(Faces.SUCCESS, {successes: 1});
rollToRollResultMapping.set(Faces.DOUBLE_SUCCESS, {successes: 2});
rollToRollResultMapping.set(Faces.FAILURE, {failures: 1});
rollToRollResultMapping.set(Faces.DOUBLE_FAILURE, {failures: 2});
rollToRollResultMapping.set(Faces.BOON, {boons: 1});
rollToRollResultMapping.set(Faces.SUCCESS_DELAY, {successes: 1, delays: 1});
rollToRollResultMapping.set(Faces.SUCCESS_FATIGUE, {successes: 1, fatigues: 1});
rollToRollResultMapping.set(Faces.DOUBLE_BOON, {boons: 2});
rollToRollResultMapping.set(Faces.SUCCESS_BOON, {successes: 1, boons: 1});
rollToRollResultMapping.set(Faces.SUCCESS_PLUS, {successes: 1});
rollToRollResultMapping.set(Faces.COMET, {comets: 1});
rollToRollResultMapping.set(Faces.BANE, {banes: 1});
rollToRollResultMapping.set(Faces.DOUBLE_BANE, {banes: 2});
rollToRollResultMapping.set(Faces.CHAOS_STAR, {stars: 1});

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

export class InterpretedResult {
    constructor(
        public succeeded: boolean = false,
        public successes: number = 0,
        public failures: number = 0,
        public boons: number = 0,
        public banes: number = 0,
        public comets: number = 0,
        public stars: number = 0,
        public delays: number = 0,
        public fatigues: number = 0,
    ) {
    }
}

export function interpretResult(result: RollValues): InterpretedResult {
    const successBalance = result.successes - result.failures;
    const boonsBalance = result.boons - result.banes;
    const delays = result.delays > 0 ? 1 : 0;
    const fatigues = result.fatigues > 0 ? 1 : 0;
    const stars = result.stars;
    const comets = result.comets;

    const failures = successBalance < 0 ? Math.abs(successBalance) : 0;
    const banes = boonsBalance < 0 ? Math.abs(boonsBalance) : 0;
    const successes = successBalance > 0 ? successBalance : 0;
    const boons = boonsBalance > 0 ? boonsBalance : 0;
    const succeeded = successBalance > 0;
    return new InterpretedResult(
        succeeded,
        successes,
        failures,
        boons,
        banes,
        comets,
        stars,
        delays,
        fatigues,
    );
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.blanks + roll2.blanks,
        roll1.successes + roll2.successes,
        roll1.failures + roll2.failures,
        roll1.boons + roll2.boons,
        roll1.banes + roll2.banes,
        roll1.delays + roll2.delays,
        roll1.fatigues + roll2.fatigues,
        roll1.stars + roll2.stars,
        roll1.comets + roll2.comets,
    ),
};

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.characteristics + roll2.characteristics,
        roll1.conservative + roll2.conservative,
        roll1.reckless + roll2.reckless,
        roll1.expertise + roll2.expertise,
        roll1.fortune + roll2.fortune,
        roll1.misfortune + roll2.misfortune,
        roll1.challenge + roll2.challenge,
    ),
};
