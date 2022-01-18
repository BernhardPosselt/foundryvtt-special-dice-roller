import {Parser} from '../parser';
import {DicePool} from './dice';

export class OVAParser extends Parser<DicePool> {
    constructor() {
        super(new RegExp('^-?[0-9]+$'));
    }

    public help(): string {
        return 'A positive number (5), negative number (-5), or 0. No decimal or fractions.';
    }

    public parse(formula: string): DicePool {
        const occurrences = parseInt(formula, 10);
        return new DicePool(occurrences);
    }
}
