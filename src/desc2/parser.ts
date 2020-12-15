import {DefaultSimpleParser} from '../parser';
import {DicePool, dicePoolMonoid} from './dice';

function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'g') {
        return new DicePool(occurrences);
    } else if (letter === 'b') {
        return new DicePool(0, occurrences);
    } else if (letter === 'r') {
        return new DicePool(0, 0, occurrences);
    } else if (letter === 'y') {
        return new DicePool(0, 0, 0, occurrences);
    } else if (letter === 'l') {
        return new DicePool(0, 0, 0, 0, occurrences);
    } else if (letter === 'm') {
        return new DicePool(0, 0, 0, 0, 0, occurrences);
    } else if (letter === 'h') {
        return new DicePool(0, 0, 0, 0, 0, 0, occurrences);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'gbrylmh',
            letterToRolls,
            dicePoolMonoid,
            ['green', 'blue', 'red', 'yellow', 'low defense (brown)', 'medium defense (grey)', 'high defense (black)'],
        );
    }
}
