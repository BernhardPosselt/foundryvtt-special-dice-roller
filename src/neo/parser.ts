import { DefaultSimpleParser } from '../parser';
import { DicePool, dicePoolMonoid } from './dice';

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'ad',
            letterToRolls,
            dicePoolMonoid,
            ['action', 'danger'],
        );
    }
}

function letterToRolls(letter: string, occurrences: number): DicePool {
    switch (letter) {
        case 'a':
            return new DicePool(occurrences, 0);
        case 'd':
            return new DicePool(0, occurrences);
        default:
            throw new Error(`Unknown letter ${letter}`);
    }
}