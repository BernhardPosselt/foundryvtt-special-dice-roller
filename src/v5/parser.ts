import {DefaultSimpleParser} from '../parser';
import {DicePool, dicePoolMonoid} from './dice';

function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'r' || letter === 'h') {
        return new DicePool(0, occurrences);
    } else if (letter === 'b' || letter === 's') {
        return new DicePool(occurrences, 0 );
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'hrsb',
            letterToRolls,
            dicePoolMonoid,
            ['hunger', 'hunger', 'skill', 'skill'],
        );
    }
}
