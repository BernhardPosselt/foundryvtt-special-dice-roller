import {DicePool, rollsMonoid} from './dice';
import {DefaultSimpleParser} from '../parser';

function letterToRolls(letter: string, number: number): DicePool {
    if (letter === 'r' || letter === 'h') {
        return new DicePool(0, number);
    } else if (letter === 'b' || letter === 's') {
        return new DicePool(number, 0 );
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'hrsb',
            letterToRolls,
            rollsMonoid,
            ['hunger', 'hunger', 'skill', 'skill'],
        );
    }
}
