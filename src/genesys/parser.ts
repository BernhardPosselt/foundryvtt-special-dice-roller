import {DicePool, rollsMonoid} from './dice';
import {DefaultSimpleParser} from '../parser';

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'absdpc',
            letterToRolls,
            rollsMonoid,
            ['boost', 'setback', 'ability', 'difficulty', 'proficiency', 'challenge']
        );
    }
}

export class SimpleSWParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'absdpcf',
            letterToRolls,
            rollsMonoid,
            ['boost', 'setback', 'ability', 'difficulty', 'proficiency', 'challenge', 'force']
        );
    }
}

function letterToRolls(letter: string, number: number): DicePool {
    if (letter === 'b') {
        return new DicePool(number, 0, 0, 0, 0, 0, 0);
    } else if (letter === 's') {
        return new DicePool(0, number, 0, 0, 0, 0, 0);
    } else if (letter === 'a') {
        return new DicePool(0, 0, number, 0, 0, 0, 0);
    } else if (letter === 'd') {
        return new DicePool(0, 0, 0, number, 0, 0, 0);
    } else if (letter === 'p') {
        return new DicePool(0, 0, 0, 0, number, 0, 0);
    } else if (letter === 'c') {
        return new DicePool(0, 0, 0, 0, 0, number, 0);
    } else if (letter === 'f') {
        return new DicePool(0, 0, 0, 0, 0, 0, number);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}
