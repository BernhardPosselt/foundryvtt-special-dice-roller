import {countMatches} from '../arrays';
import {Rolls, rollsMonoid, toRolls} from './dice';
import {combineAll} from '../lang';
import {Parser, splitComplexRoll} from '../parser';

export class SimpleParser extends Parser<Rolls> {
    constructor() {
        super(/^[absdpc]+$/);
    }

    help(): string {
        return 'bbssaaddppcc, bb, ss, aaa, dd, pp, cc';
    }

    parse(formula: string): Rolls {
        const letters = formula.split('');
        const boost = countMatches(letters, (letter) => letter === 'b');
        const setback = countMatches(letters, (letter) => letter === 's');
        const ability = countMatches(letters, (letter) => letter === 'a');
        const difficulty = countMatches(letters, (letter) => letter === 'd');
        const proficiency = countMatches(letters, (letter) => letter === 'p');
        const challenge = countMatches(letters, (letter) => letter === 'c');
        return new Rolls(
            boost,
            setback,
            ability,
            difficulty,
            proficiency,
            challenge,
        );
    }
}

export class ComplexParser extends Parser<Rolls> {
    constructor() {
        super(/^[1-9][0-9]*d(?:[absdpc])(?:\+[1-9][0-9]*d(?:[absdpc]))*$/);
    }

    help(): string {
        return '2db+2ds+2da+2dd+2dp+2dc, 2db, 2ds, 2da, 2dd, 2dp, 2dc';
    }

    parse(formula: string): Rolls {
        const rolls = formula.split('+')
            .map((part) => {
                const [die, number] = splitComplexRoll(part);
                if (die === 'b') {
                    return toRolls({boost: number});
                } else if (die === 's') {
                    return toRolls({setback: number});
                } else if (die === 'a') {
                    return toRolls({ability: number});
                } else if (die === 'd') {
                    return toRolls({difficulty: number});
                } else if (die === 'p') {
                    return toRolls({proficiency: number});
                } else if (die === 'c') {
                    return toRolls({challenge: number});
                } else {
                    throw new Error(`Unexpected die letter ${die}`);
                }
            });
        return combineAll(rolls, rollsMonoid);
    }
}
