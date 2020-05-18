import {DefaultSimpleParser} from '../parser';
import {DicePool, dicePoolMonoid} from './dice';

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'd',
            letterToRolls,
            dicePoolMonoid,
            ['dice'],
        );
    }
}

function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'd') {
        return new DicePool(occurrences);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}
