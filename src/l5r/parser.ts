import {DicePool, rollsMonoid} from './dice';
import {DefaultSimpleParser} from '../parser';

function letterToRolls(letter: string, number: number): DicePool {
    if (letter === 'r' || letter === 'b') {
        return new DicePool(number, 0);
    } else if (letter === 's' || letter === 'w') {
        return new DicePool(0, number);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'rbws',
            letterToRolls,
            rollsMonoid,
            ['ring', 'ring', 'skill', 'skill'],
        );
    }
}
