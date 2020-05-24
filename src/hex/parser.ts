import {DefaultSimpleParser} from '../parser';
import {DicePool, dicePoolMonoid} from './dice';

function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'h') {
        return new DicePool(occurrences, 0, 0, 0, 0, 0, 0);
    } else if (letter === '+') {
        return new DicePool(0, occurrences <= 5 ? occurrences : 5, 0, 0, 0, 0, 0);
    } else if (letter === '-') {
        return new DicePool(0, 0, occurrences <= 5 ? occurrences : 5, 0, 0, 0, 0);
    } else if (letter === 's') {
        return new DicePool(0, 0, 0, occurrences, 0, 0, 0);
    } else if (letter === 'b') {
        return new DicePool(0, 0, 0, 0, occurrences, 0, 0);
    } else if (letter === 'e') {
        return new DicePool(0, 0, 0, 0, 0, occurrences, 0);
    } else if (letter === 'f') {
        return new DicePool(0, 0, 0, 0, 0, 0, occurrences);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'h+-sbef',
            letterToRolls,
            dicePoolMonoid,
            ['HEXXEN', 'BONUS', 'MALUS', 'SEGNUNG', 'BLUT', 'ELIXIR', 'FLUCH'],
        );
    }
}
