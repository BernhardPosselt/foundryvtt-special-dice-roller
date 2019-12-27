import {shim} from 'array.prototype.flatmap';
import {RandomNumberGenerator} from '../rng';
import {countMatches} from '../util';

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

export enum Dice {
    RING,
    SKILL
}

function isSuccess(face: Faces): boolean {
    return face === Faces.SUCCESS ||
        face === Faces.SUCCESS_OPPORTUNITY ||
        face === Faces.SUCCESS_STRIFE ||
        face === Faces.EXPLODING_OPPORTUNITY ||
        face === Faces.EXPLODING ||
        face === Faces.EXPLODING_STRIFE;
}

function isFailure(face: Faces): boolean {
    return face === Faces.FAILURE;
}

function isStrife(face: Faces): boolean {
    return face === Faces.SUCCESS_STRIFE ||
        face === Faces.OPPORTUNITY_STRIFE ||
        face === Faces.EXPLODING_STRIFE;
}

function isOpportunity(face: Faces): boolean {
    return face === Faces.OPPORTUNITY_STRIFE ||
        face === Faces.SUCCESS_OPPORTUNITY ||
        face === Faces.OPPORTUNITY ||
        face === Faces.EXPLODING_OPPORTUNITY;
}

function isExploding(face: Faces): boolean {
    return face === Faces.EXPLODING_STRIFE ||
        face === Faces.EXPLODING_OPPORTUNITY ||
        face === Faces.EXPLODING;
}

const RING_ROLL_TABLE: Faces[] = [
    Faces.FAILURE,
    Faces.SUCCESS,
    Faces.SUCCESS_STRIFE,
    Faces.EXPLODING_STRIFE,
    Faces.OPPORTUNITY,
    Faces.OPPORTUNITY_STRIFE,
];

const SKILL_ROLL_TABLE: Faces[] = [
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

export class RollResult {
    constructor(public die: Dice, public face: Faces) {
    }

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
            }  else if (this.face === Faces.EXPLODING) {
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

export class Result {
    constructor(
        public successes = 0,
        public failures = 0,
        public opportunity = 0,
        public exploding = 0,
        public strife = 0,
    ) {
    }
}

export function countResults(results: RollResult[]): Result {
    const faceResults = results.map((result) => result.face);
    return new Result(
        countMatches(faceResults, isSuccess),
        countMatches(faceResults, isFailure),
        countMatches(faceResults, isOpportunity),
        countMatches(faceResults, isExploding),
        countMatches(faceResults, isStrife),
    );
}


export class Rolls {
    constructor(public rings = 0, public skills = 0) {
    }
}

function parseComplexFormula(trimmedFormula: string) {
    return trimmedFormula.split('+')
        .map((part) => {
            const parts = part.split('d');
            const number = parseInt(parts[0], 10);
            if (parts[1] === 'r' || parts[1] === 'b') {
                return new Rolls(number, 0);
            } else {
                return new Rolls(0, number);
            }
        })
        .reduce((prev: Rolls, curr: Rolls) => {
            return new Rolls(
                prev.rings + curr.rings,
                prev.skills + curr.skills,
            );
        }, new Rolls());
}

function parseSimpleFormula(trimmedFormula: string) {
    const letters = trimmedFormula.split('');
    const rings = countMatches(letters, (letter) => letter === 'r' || letter === 'b');
    const skills = countMatches(letters, (letter) => letter === 's' || letter === 'w');
    return new Rolls(rings, skills);
}

export function parseFormula(formula: string): Rolls {
    const trimmedFormula = formula.replace(/\s+/g, '')
        .toLowerCase();
    if (/^[1-9][0-9]*d(?:[rswb])(?:\+[1-9][0-9]*d(?:[rswb]))*$/.test(trimmedFormula)) {
        return parseComplexFormula(trimmedFormula);
    } else if (/^[rswb]+$/.test(trimmedFormula)) {
        return parseSimpleFormula(trimmedFormula);
    } else {
        throw new FormulaParseError(`Could not parse formula ${formula}! Needs to be formatted like: "wwbb" or "rss" or "xdr" or "xds" or "xdr+yds" where x and y are positive numbers`);
    }
}

export class FormulaParseError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

export function reRoll(
    keptResults: RollResult[],
    reRollResults: RollResult[],
    rng: RandomNumberGenerator
): RollResult[] {
    const reRolledDice = reRollResults.map((roll) => roll.die);
    const ringReRolls = countMatches(reRolledDice, (die) => die === Dice.RING);
    const skillReRolls = countMatches(reRolledDice, (die) => die === Dice.SKILL);
    const reRolls = roll(ringReRolls, skillReRolls, rng);
    return [...keptResults, ...reRolls];
}

export function roll(
    ringDice: number,
    skillDice: number,
    rng: RandomNumberGenerator,
): RollResult[] {
    const rings = rollResults(ringDice, RING_ROLL_TABLE, rng)
        .map((face) => new RollResult(Dice.RING, face));
    const skills = rollResults(skillDice, SKILL_ROLL_TABLE, rng)
        .map((face) => new RollResult(Dice.SKILL, face));
    return [...rings, ...skills];
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