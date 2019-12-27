import {Rolls, rollsMonoid} from './dice';
import {combineAll} from '../lang';
import {countMatches} from '../arrays';

export function parseComplexFormula(trimmedFormula: string) {
    const rolls = trimmedFormula.split('+')
        .map((part) => {
            const parts = part.split('d');
            const number = parseInt(parts[0], 10);
            if (parts[1] === 'r' || parts[1] === 'b') {
                return new Rolls(number, 0);
            } else {
                return new Rolls(0, number);
            }
        });
    return combineAll(rolls, rollsMonoid);
}

export function parseSimpleFormula(trimmedFormula: string) {
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
