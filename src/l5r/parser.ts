import {Rolls, rollsMonoid} from './dice';
import {DefaultSimpleParser} from '../parser';

function letterToRolls(letter: string, number: number): Rolls {
    if (letter === 'r' || letter === 'b') {
        return new Rolls(number, 0);
    } else if (letter === 's' || letter === 'w') {
        return new Rolls(0, number);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}

export class SimpleParser extends DefaultSimpleParser<Rolls> {
    constructor() {
        super(
            'rbws',
            letterToRolls,
            rollsMonoid,
            ['ring', 'ring', 'skill', 'skill'],
        );
    }
}
