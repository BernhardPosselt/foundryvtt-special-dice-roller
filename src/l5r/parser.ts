import {Rolls, rollsMonoid} from './dice';
import {combineAll} from '../lang';
import {countMatches} from '../arrays';
import {Parser, splitComplexRoll} from '../parser';

export class SimpleParser extends Parser<Rolls> {
    constructor() {
        super(/^[rswb]+$/);
    }

    parse(formula: string): Rolls {
        const letters = formula.split('');
        const rings = countMatches(letters, (letter) => letter === 'r' || letter === 'b');
        const skills = countMatches(letters, (letter) => letter === 's' || letter === 'w');
        return new Rolls(rings, skills);
    }

    help(): string {
        return 'ssrr, ss, rr, wwbb, ww, bb';
    }
}

export class ComplexParser extends Parser<Rolls> {
    constructor() {
        super(/^[1-9][0-9]*d(?:[rswb])(?:\+[1-9][0-9]*d(?:[rswb]))*$/);
    }

    parse(formula: string): Rolls {
        const rolls = formula.split('+')
            .map((part) => {
                const [die, number] = splitComplexRoll(part);
                if (die === 'r' || die === 'b') {
                    return new Rolls(number, 0);
                } else if (die === 's' || die === 'w') {
                    return new Rolls(0, number);
                } else {
                    throw new Error(`Unexpected die letter ${die}`);
                }
            });
        return combineAll(rolls, rollsMonoid);
    }

    help(): string {
        return '2dr+1ds, 2db+1dw, 2dr, 1ds, 2dw, 1db';
    }
}
