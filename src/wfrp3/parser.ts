import {DefaultSimpleParser} from '../parser';
import {DicePool, dicePoolMonoid} from './dice';

export class SimpleWarhammerParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'acrefmx',
            letterToRolls,
            dicePoolMonoid,
            ['characteristics', 'conservative', 'reckless', 'expertise', 'fortune', 'misfortune', 'challenge'],
        );
    }
}

function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'a') {
        return new DicePool(occurrences, 0, 0, 0, 0, 0, 0);
    } else if (letter === 'c') {
        return new DicePool(0, occurrences, 0, 0, 0, 0, 0);
    } else if (letter === 'r') {
        return new DicePool(0, 0, occurrences, 0, 0, 0, 0);
    } else if (letter === 'e') {
        return new DicePool(0, 0, 0, occurrences, 0, 0, 0);
    } else if (letter === 'f') {
        return new DicePool(0, 0, 0, 0, occurrences, 0, 0);
    } else if (letter === 'm') {
        return new DicePool(0, 0, 0, 0, 0, occurrences, 0);
    } else if (letter === 'x') {
        return new DicePool(0, 0, 0, 0, 0, 0, occurrences);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}
