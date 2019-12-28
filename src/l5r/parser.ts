import {Rolls, rollsMonoid} from './dice';
import {DefaultComplexParser, DefaultSimpleParser} from '../parser';

export class SimpleParser extends DefaultSimpleParser<Rolls> {
    constructor() {
        super(
            'rbws',
            (letter) => {
                if (letter === 'r' || letter === 'b') {
                    return new Rolls(1, 0);
                } else if (letter === 's' || letter === 'w') {
                    return new Rolls(0, 1);
                } else {
                    throw new Error(`Unknown letter ${letter}`);
                }
            },
            rollsMonoid,
            ['ring', 'ring', 'skill', 'skill'],
        );
    }
}

export class ComplexParser extends DefaultComplexParser<Rolls> {
    constructor() {
        super(
            'rbws',
            (letter, value) => {
                if (letter === 'r' || letter === 'b') {
                    return new Rolls(value, 0);
                } else if (letter === 's' || letter === 'w') {
                    return new Rolls(0, value);
                } else {
                    throw new Error(`Unknown letter ${letter}`);
                }
            },
            rollsMonoid,
            ['ring', 'ring', 'skill', 'skill']
        );
    }
}
