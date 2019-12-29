import {Rolls, rollsMonoid} from './dice';
import {DefaultSimpleParser} from '../parser';

function letterToRolls(letter: string, number: number): Rolls {
    if (letter === 'r' || letter === 'h') {
        return new Rolls(0, number);
    } else if (letter === 'b' || letter === 's') {
        return new Rolls(number, 0 );
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}

export class SimpleParser extends DefaultSimpleParser<Rolls> {
    constructor() {
        super(
            'hrsb',
            letterToRolls,
            rollsMonoid,
            ['hunger', 'hunger', 'skill', 'skill'],
        );
    }
}
