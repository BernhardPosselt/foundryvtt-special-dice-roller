import {DefaultSimpleParser} from '../parser';
import {DicePool, dicePoolMonoid} from './dice';

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'absdpc',
            letterToRolls,
            dicePoolMonoid,
            ['boost', 'setback', 'ability', 'difficulty', 'proficiency', 'challenge'],
        );
    }
}

export class SimpleSWParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'absdpcf',
            letterToRolls,
            dicePoolMonoid,
            ['boost', 'setback', 'ability', 'difficulty', 'proficiency', 'challenge', 'force'],
        );
    }
}

function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'b') {
        return new DicePool(occurrences, 0, 0, 0, 0, 0, 0);
    } else if (letter === 's') {
        return new DicePool(0, occurrences, 0, 0, 0, 0, 0);
    } else if (letter === 'a') {
        return new DicePool(0, 0, occurrences, 0, 0, 0, 0);
    } else if (letter === 'd') {
        return new DicePool(0, 0, 0, occurrences, 0, 0, 0);
    } else if (letter === 'p') {
        return new DicePool(0, 0, 0, 0, occurrences, 0, 0);
    } else if (letter === 'c') {
        return new DicePool(0, 0, 0, 0, 0, occurrences, 0);
    } else if (letter === 'f') {
        return new DicePool(0, 0, 0, 0, 0, 0, occurrences);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}
