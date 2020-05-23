import {DefaultSimpleParser} from '../parser';
import {DicePool, dicePoolMonoid} from './dice';

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'hm',
            letterToRolls,
            dicePoolMonoid,
            ['hero', 'monster'],
        );
    }
}

function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'h') {
        return new DicePool(occurrences, 0);
    } else if (letter === 'm') {
        return new DicePool(0, occurrences);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}
