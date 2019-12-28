import {Monoid} from '../lang';
import {Roll} from '../roller';
import {getDieImage} from '../images';

export enum Dice {
    BOOST,
    SETBACK,
    ABILITY,
    DIFFICULTY,
    PROFICIENCY,
    CHALLENGE,
    FORCE
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
    FAILURE_THREAT,
    DARK_FORCE,
    DOUBLE_DARK_FORCE,
    FORCE,
    DOUBLE_FORCE
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

export const FORCE_ROLL_TABLE: Faces[] = [
    Faces.DARK_FORCE,
    Faces.DARK_FORCE,
    Faces.DARK_FORCE,
    Faces.DARK_FORCE,
    Faces.DARK_FORCE,
    Faces.DARK_FORCE,
    Faces.DOUBLE_DARK_FORCE,
    Faces.FORCE,
    Faces.FORCE,
    Faces.DOUBLE_FORCE,
    Faces.DOUBLE_FORCE,
    Faces.DOUBLE_FORCE,
];

export class Rolls {
    constructor(
        public boost = 0,
        public setback = 0,
        public ability = 0,
        public difficulty = 0,
        public proficiency = 0,
        public challenge = 0,
        public force = 0
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
        public force = 0,
        public darkForce = 0
    ) {
    }
}

const boostImages = new Map<Faces, string>();
boostImages.set(Faces.BLANK, 'blue');
boostImages.set(Faces.SUCCESS, 'blues');
boostImages.set(Faces.SUCCESS_ABILITY, 'bluesa');
boostImages.set(Faces.DOUBLE_ABILITY, 'blueaa');
boostImages.set(Faces.ABILITY, 'bluea');

const setbackImages = new Map<Faces, string>();
setbackImages.set(Faces.BLANK, 'black');
setbackImages.set(Faces.FAILURE, 'blackf');
setbackImages.set(Faces.THREAT, 'blackt');

const abilityImages = new Map<Faces, string>();
abilityImages.set(Faces.SUCCESS, 'greens');
abilityImages.set(Faces.DOUBLE_SUCCESS, 'greenss');
abilityImages.set(Faces.ABILITY, 'greena');
abilityImages.set(Faces.SUCCESS_ABILITY, 'greensa');
abilityImages.set(Faces.DOUBLE_ABILITY, 'greenaa');

const difficultyImages = new Map<Faces, string>();
difficultyImages.set(Faces.FAILURE, 'purplef');
difficultyImages.set(Faces.DOUBLE_FAILURE, 'purpleff');
difficultyImages.set(Faces.THREAT, 'purplet');
difficultyImages.set(Faces.DOUBLE_THREAT, 'purplett');
difficultyImages.set(Faces.FAILURE_THREAT, 'purpleft');

const proficiencyImages = new Map<Faces, string>();
proficiencyImages.set(Faces.SUCCESS, 'yellows');
proficiencyImages.set(Faces.DOUBLE_SUCCESS, 'yellowss');
proficiencyImages.set(Faces.ABILITY, 'yellowa');
proficiencyImages.set(Faces.SUCCESS_ABILITY, 'yellowsa');
proficiencyImages.set(Faces.DOUBLE_ABILITY, 'yellowaa');
proficiencyImages.set(Faces.TRIUMPH, 'yellowr');

const challengeImages = new Map<Faces, string>();
proficiencyImages.set(Faces.FAILURE, 'redf');
proficiencyImages.set(Faces.DOUBLE_FAILURE, 'redff');
proficiencyImages.set(Faces.THREAT, 'redt');
proficiencyImages.set(Faces.FAILURE_THREAT, 'redft');
proficiencyImages.set(Faces.DOUBLE_THREAT, 'redtt');
proficiencyImages.set(Faces.DESPAIR, 'redd');

const forceImages = new Map<Faces, string>();
proficiencyImages.set(Faces.DARK_FORCE, 'whiten');
proficiencyImages.set(Faces.DOUBLE_DARK_FORCE, 'whitenn');
proficiencyImages.set(Faces.FORCE, 'whitel');
proficiencyImages.set(Faces.DOUBLE_FORCE, 'whitell');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.BOOST, boostImages);
dieRollImages.set(Dice.SETBACK, setbackImages);
dieRollImages.set(Dice.ABILITY, abilityImages);
dieRollImages.set(Dice.DIFFICULTY, difficultyImages);
dieRollImages.set(Dice.PROFICIENCY, proficiencyImages);
dieRollImages.set(Dice.CHALLENGE, challengeImages);
dieRollImages.set(Dice.FORCE, forceImages);

export class GenesysRoll extends Roll<Dice, Faces> {
    public get imageName(): string {
        return getDieImage(dieRollImages, this.die, this.face);
    }
}

const rollToRollResultMapping = new Map<Faces, Partial<RollResult>>();
rollToRollResultMapping.set(Faces.BLANK, {blanks: 1});
rollToRollResultMapping.set(Faces.SUCCESS, {successes: 1});
rollToRollResultMapping.set(Faces.DOUBLE_SUCCESS, {successes: 2});
rollToRollResultMapping.set(Faces.FAILURE, {failures: 1});
rollToRollResultMapping.set(Faces.DOUBLE_FAILURE, {failures: 2});
rollToRollResultMapping.set(Faces.ABILITY, {abilities: 1});
rollToRollResultMapping.set(Faces.DOUBLE_ABILITY, {abilities: 2});
rollToRollResultMapping.set(Faces.THREAT, {threats: 1});
rollToRollResultMapping.set(Faces.DOUBLE_THREAT, {threats: 2});
rollToRollResultMapping.set(Faces.TRIUMPH, {triumphs: 1, successes: 1});
rollToRollResultMapping.set(Faces.DESPAIR, {despairs: 1, failures: 1});
rollToRollResultMapping.set(Faces.SUCCESS_ABILITY, {successes: 1, abilities: 1});
rollToRollResultMapping.set(Faces.FAILURE_THREAT, {failures: 1, threats: 1});
rollToRollResultMapping.set(Faces.DARK_FORCE, {darkForce: 1});
rollToRollResultMapping.set(Faces.DOUBLE_DARK_FORCE, {darkForce: 2});
rollToRollResultMapping.set(Faces.FORCE, {force: 1});
rollToRollResultMapping.set(Faces.DOUBLE_DARK_FORCE, {force: 2});

export function rollToRollResult(roll: GenesysRoll): RollResult {
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

export function toRolls(partial: Partial<Rolls>): Rolls {
    return Object.assign(new Rolls(), partial);
}

export class InterpretedResult {
    constructor(
        public succeeded: boolean = false,
        public despairs = 0,
        public triumphs = 0,
        public successes = 0,
        public failures = 0,
        public abilities = 0,
        public threats = 0,
        public force = 0,
        public darkForce = 0
    ) {
    }
}

export function interpretRollResult(result: RollResult) {
    const successBalance = result.successes + result.triumphs - result.failures - result.despairs;
    const abilityBalance = result.abilities - result.threats;
    const failures = successBalance < 0 ? Math.abs(successBalance) : 0;
    const threats = abilityBalance < 0 ? Math.abs(abilityBalance) : 0;
    const successes = successBalance > 0 ? successBalance : 0;
    const abilities = abilityBalance > 0 ? abilityBalance : 0;
    const succeeded = successBalance > 0;
    return new InterpretedResult(
        succeeded,
        result.despairs,
        result.triumphs,
        successes,
        failures,
        abilities,
        threats,
        result.force,
        result.darkForce
    );
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
        roll1.force + roll2.force,
        roll1.darkForce + roll2.darkForce,
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
        roll1.force + roll2.force,
    ),
};