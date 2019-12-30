import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    BOOST,
    SETBACK,
    ABILITY,
    DIFFICULTY,
    PROFICIENCY,
    CHALLENGE,
    FORCE,
}

export enum Faces {
    BLANK,
    SUCCESS,
    DOUBLE_SUCCESS,
    FAILURE,
    DOUBLE_FAILURE,
    ADVANTAGE,
    DOUBLE_ADVANTAGE,
    THREAT,
    DOUBLE_THREAT,
    TRIUMPH,
    DESPAIR,
    SUCCESS_ADVANTAGE,
    FAILURE_THREAT,
    DARK_FORCE,
    DOUBLE_DARK_FORCE,
    FORCE,
    DOUBLE_FORCE,
}

export const BOOST_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BLANK,
    Faces.SUCCESS,
    Faces.SUCCESS_ADVANTAGE,
    Faces.DOUBLE_ADVANTAGE,
    Faces.ADVANTAGE,
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
    Faces.ADVANTAGE,
    Faces.ADVANTAGE,
    Faces.SUCCESS_ADVANTAGE,
    Faces.DOUBLE_ADVANTAGE,
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
    Faces.ADVANTAGE,
    Faces.SUCCESS_ADVANTAGE,
    Faces.SUCCESS_ADVANTAGE,
    Faces.SUCCESS_ADVANTAGE,
    Faces.DOUBLE_ADVANTAGE,
    Faces.DOUBLE_ADVANTAGE,
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

export class DicePool {
    constructor(
        public boost: number = 0,
        public setback: number = 0,
        public ability: number = 0,
        public difficulty: number = 0,
        public proficiency: number = 0,
        public challenge: number = 0,
        public force: number = 0,
    ) {
    }

    public toString(): string {
        return `boost: ${this.boost}, setback: ${this.setback}, ability: ${this.ability}, difficulty: ${this.difficulty}, difficulty: ${this.difficulty}, proficiency: ${this.proficiency}, challenge: ${this.challenge}, force: ${this.force}`;
    }
}

export class RollValues {
    constructor(
        public blanks: number = 0,
        public successes: number = 0,
        public failures: number = 0,
        public advantages: number = 0,
        public threats: number = 0,
        public triumphs: number = 0,
        public despairs: number = 0,
        public force: number = 0,
        public darkForce: number = 0,
    ) {
    }
}

const boostImages = new Map<Faces, string>();
boostImages.set(Faces.BLANK, 'blue');
boostImages.set(Faces.SUCCESS, 'blues');
boostImages.set(Faces.SUCCESS_ADVANTAGE, 'bluesa');
boostImages.set(Faces.DOUBLE_ADVANTAGE, 'blueaa');
boostImages.set(Faces.ADVANTAGE, 'bluea');

const setbackImages = new Map<Faces, string>();
setbackImages.set(Faces.BLANK, 'black');
setbackImages.set(Faces.FAILURE, 'blackf');
setbackImages.set(Faces.THREAT, 'blackt');

const abilityImages = new Map<Faces, string>();
abilityImages.set(Faces.BLANK, 'green');
abilityImages.set(Faces.SUCCESS, 'greens');
abilityImages.set(Faces.DOUBLE_SUCCESS, 'greenss');
abilityImages.set(Faces.ADVANTAGE, 'greena');
abilityImages.set(Faces.SUCCESS_ADVANTAGE, 'greensa');
abilityImages.set(Faces.DOUBLE_ADVANTAGE, 'greenaa');

const difficultyImages = new Map<Faces, string>();
difficultyImages.set(Faces.BLANK, 'purple');
difficultyImages.set(Faces.FAILURE, 'purplef');
difficultyImages.set(Faces.DOUBLE_FAILURE, 'purpleff');
difficultyImages.set(Faces.THREAT, 'purplet');
difficultyImages.set(Faces.DOUBLE_THREAT, 'purplett');
difficultyImages.set(Faces.FAILURE_THREAT, 'purpleft');

const proficiencyImages = new Map<Faces, string>();
proficiencyImages.set(Faces.BLANK, 'yellow');
proficiencyImages.set(Faces.SUCCESS, 'yellows');
proficiencyImages.set(Faces.DOUBLE_SUCCESS, 'yellowss');
proficiencyImages.set(Faces.ADVANTAGE, 'yellowa');
proficiencyImages.set(Faces.SUCCESS_ADVANTAGE, 'yellowsa');
proficiencyImages.set(Faces.DOUBLE_ADVANTAGE, 'yellowaa');
proficiencyImages.set(Faces.TRIUMPH, 'yellowr');

const challengeImages = new Map<Faces, string>();
challengeImages.set(Faces.BLANK, 'red');
challengeImages.set(Faces.FAILURE, 'redf');
challengeImages.set(Faces.DOUBLE_FAILURE, 'redff');
challengeImages.set(Faces.THREAT, 'redt');
challengeImages.set(Faces.FAILURE_THREAT, 'redft');
challengeImages.set(Faces.DOUBLE_THREAT, 'redtt');
challengeImages.set(Faces.DESPAIR, 'redd');

const forceImages = new Map<Faces, string>();
forceImages.set(Faces.DARK_FORCE, 'whiten');
forceImages.set(Faces.DOUBLE_DARK_FORCE, 'whitenn');
forceImages.set(Faces.FORCE, 'whitel');
forceImages.set(Faces.DOUBLE_FORCE, 'whitell');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.BOOST, boostImages);
dieRollImages.set(Dice.SETBACK, setbackImages);
dieRollImages.set(Dice.ABILITY, abilityImages);
dieRollImages.set(Dice.DIFFICULTY, difficultyImages);
dieRollImages.set(Dice.PROFICIENCY, proficiencyImages);
dieRollImages.set(Dice.CHALLENGE, challengeImages);
dieRollImages.set(Dice.FORCE, forceImages);

const rollToRollResultMapping = new Map<Faces, Partial<RollValues>>();
rollToRollResultMapping.set(Faces.BLANK, {blanks: 1});
rollToRollResultMapping.set(Faces.SUCCESS, {successes: 1});
rollToRollResultMapping.set(Faces.DOUBLE_SUCCESS, {successes: 2});
rollToRollResultMapping.set(Faces.FAILURE, {failures: 1});
rollToRollResultMapping.set(Faces.DOUBLE_FAILURE, {failures: 2});
rollToRollResultMapping.set(Faces.ADVANTAGE, {advantages: 1});
rollToRollResultMapping.set(Faces.DOUBLE_ADVANTAGE, {advantages: 2});
rollToRollResultMapping.set(Faces.THREAT, {threats: 1});
rollToRollResultMapping.set(Faces.DOUBLE_THREAT, {threats: 2});
rollToRollResultMapping.set(Faces.TRIUMPH, {triumphs: 1});
rollToRollResultMapping.set(Faces.DESPAIR, {despairs: 1});
rollToRollResultMapping.set(Faces.SUCCESS_ADVANTAGE, {successes: 1, advantages: 1});
rollToRollResultMapping.set(Faces.FAILURE_THREAT, {failures: 1, threats: 1});
rollToRollResultMapping.set(Faces.DARK_FORCE, {darkForce: 1});
rollToRollResultMapping.set(Faces.DOUBLE_DARK_FORCE, {darkForce: 2});
rollToRollResultMapping.set(Faces.FORCE, {force: 1});
rollToRollResultMapping.set(Faces.DOUBLE_FORCE, {force: 2});

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
        public despairs: number = 0,
        public triumphs: number = 0,
        public successes: number = 0,
        public failures: number = 0,
        public advantages: number = 0,
        public threats: number = 0,
        public force: number = 0,
        public darkForce: number = 0,
    ) {
    }
}

export function interpretResult(result: RollValues): InterpretedResult {
    const successBalance = result.successes + result.triumphs - result.failures - result.despairs;
    const advantageBalance = result.advantages - result.threats;
    const failures = successBalance < 0 ? Math.abs(successBalance) : 0;
    const threats = advantageBalance < 0 ? Math.abs(advantageBalance) : 0;
    const successes = successBalance > 0 ? successBalance : 0;
    const advantages = advantageBalance > 0 ? advantageBalance : 0;
    const succeeded = successBalance > 0;
    return new InterpretedResult(
        succeeded,
        result.despairs,
        result.triumphs,
        successes,
        failures,
        advantages,
        threats,
        result.force,
        result.darkForce,
    );
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.blanks + roll2.blanks,
        roll1.successes + roll2.successes,
        roll1.failures + roll2.failures,
        roll1.advantages + roll2.advantages,
        roll1.threats + roll2.threats,
        roll1.triumphs + roll2.triumphs,
        roll1.despairs + roll2.despairs,
        roll1.force + roll2.force,
        roll1.darkForce + roll2.darkForce,
    ),
};

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.boost + roll2.boost,
        roll1.setback + roll2.setback,
        roll1.ability + roll2.ability,
        roll1.difficulty + roll2.difficulty,
        roll1.proficiency + roll2.proficiency,
        roll1.challenge + roll2.challenge,
        roll1.force + roll2.force,
    ),
};
