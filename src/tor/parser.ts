import {DefaultSimpleParser} from '../parser';
import {DicePool, dicePoolMonoid} from './dice';

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'dst',
            letterToRolls,
            dicePoolMonoid,
            ['success', 'shadow', 'tired'],
        );
    }
}

function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'd') {
        return new DicePool(1, occurrences, 0, 0);
    } else if (letter === 's') {
        return new DicePool(1, 0, 1, 0);
    } else if (letter === 't') {
        return new DicePool(1, 0, 0, 1);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}
