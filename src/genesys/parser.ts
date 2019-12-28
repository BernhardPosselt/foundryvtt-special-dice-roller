import {Rolls, rollsMonoid} from './dice';
import {DefaultSimpleParser} from '../parser';

export class SimpleParser extends DefaultSimpleParser<Rolls> {
    constructor() {
        super(
            'absdpc',
            letterToRolls,
            rollsMonoid,
            ['boost', 'setback', 'ability', 'difficulty', 'proficiency', 'challenge']
        );
    }
}

export class SimpleSWParser extends DefaultSimpleParser<Rolls> {
    constructor() {
        super(
            'absdpcf',
            letterToRolls,
            rollsMonoid,
            ['boost', 'setback', 'ability', 'difficulty', 'proficiency', 'challenge', 'force']
        );
    }
}

function letterToRolls(letter: string, number: number): Rolls {
    if (letter === 'b') {
        return new Rolls(number, 0, 0, 0, 0, 0, 0);
    } else if (letter === 's') {
        return new Rolls(0, number, 0, 0, 0, 0, 0);
    } else if (letter === 'a') {
        return new Rolls(0, 0, number, 0, 0, 0, 0);
    } else if (letter === 'd') {
        return new Rolls(0, 0, 0, number, 0, 0, 0);
    } else if (letter === 'p') {
        return new Rolls(0, 0, 0, 0, number, 0, 0);
    } else if (letter === 'c') {
        return new Rolls(0, 0, 0, 0, 0, number, 0);
    } else if (letter === 'f') {
        return new Rolls(0, 0, 0, 0, 0, 0, number);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}
