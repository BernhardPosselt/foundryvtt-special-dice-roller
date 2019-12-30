import {DefaultSimpleParser} from '../parser';
import {DicePool, dicePoolMonoid} from './dice';

function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'r' || letter === 'b') {
        return new DicePool(occurrences, 0);
    } else if (letter === 's' || letter === 'w') {
        return new DicePool(0, occurrences);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'rbws',
            letterToRolls,
            dicePoolMonoid,
            ['ring', 'ring', 'skill', 'skill'],
        );
    }
}
