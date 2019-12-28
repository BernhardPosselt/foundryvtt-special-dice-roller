import {Rolls, rollsMonoid} from './dice';
import {DefaultComplexParser, DefaultSimpleParser} from '../parser';

export class SimpleParser extends DefaultSimpleParser<Rolls> {
    constructor() {
        super(
            'absdpc',
            (letter) => {
                if (letter === 'b') {
                    return new Rolls(1, 0, 0, 0, 0, 0, 0);
                } else if (letter === 's') {
                    return new Rolls(0, 1, 0, 0, 0, 0, 0);
                } else if (letter === 'a') {
                    return new Rolls(0, 0, 1, 0, 0, 0, 0);
                } else if (letter === 'd') {
                    return new Rolls(0, 0, 0, 1, 0, 0, 0);
                } else if (letter === 'p') {
                    return new Rolls(0, 0, 0, 0, 1, 0, 0);
                } else if (letter === 'c') {
                    return new Rolls(0, 0, 0, 0, 0, 1, 0);
                } else {
                    throw new Error(`Unknown letter ${letter}`);
                }
            },
            rollsMonoid,
            ['boost', 'setback', 'ability', 'difficulty', 'proficiency', 'challenge']);
    }
}

export class ComplexParser extends DefaultComplexParser<Rolls> {
    constructor() {
        super(
            'absdpc',
            (letter, number) => {
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
                } else {
                    throw new Error(`Unknown letter ${letter}`);
                }
            },
            rollsMonoid,
            ['boost', 'setback', 'ability', 'difficulty', 'proficiency', 'challenge'])
    }
}

export class SimpleSWParser extends DefaultSimpleParser<Rolls> {
    constructor() {
        super(
            'absdpcf',
            (letter) => {
                if (letter === 'b') {
                    return new Rolls(1, 0, 0, 0, 0, 0, 0);
                } else if (letter === 's') {
                    return new Rolls(0, 1, 0, 0, 0, 0, 0);
                } else if (letter === 'a') {
                    return new Rolls(0, 0, 1, 0, 0, 0, 0);
                } else if (letter === 'd') {
                    return new Rolls(0, 0, 0, 1, 0, 0, 0);
                } else if (letter === 'p') {
                    return new Rolls(0, 0, 0, 0, 1, 0, 0);
                } else if (letter === 'c') {
                    return new Rolls(0, 0, 0, 0, 0, 1, 0);
                } else if (letter === 'f') {
                    return new Rolls(0, 0, 0, 0, 0, 0, 1);
                } else {
                    throw new Error(`Unknown letter ${letter}`);
                }
            },
            rollsMonoid,
            ['boost', 'setback', 'ability', 'difficulty', 'proficiency', 'challenge', 'force']);
    }
}

export class ComplexSWParser extends DefaultComplexParser<Rolls> {
    constructor() {
        super(
            'absdpcf',
            (letter, number) => {
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
            },
            rollsMonoid,
            ['boost', 'setback', 'ability', 'difficulty', 'proficiency', 'challenge', 'force'])
    }
}
