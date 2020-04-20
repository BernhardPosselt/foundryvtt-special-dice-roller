function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'h') {
        return new DicePool(occurrences, 0);
    } else if (letter === 'j') {
        return new DicePool(0, occurrences);
    } else if (letter === 's') {
        return new DicePool(0, occurrences);
    } else if (letter === 'b') {
        return new DicePool(0, occurrences);
    } else if (letter === 'e') {
        return new DicePool(0, occurrences);
    } else if (letter === 'f') {
        return new DicePool(0, occurrences);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'hjsbef',
            letterToRolls,
            dicePoolMonoid,
            ['HEXXEN', 'JANUS', 'SEGNUNG', 'BLUT', 'ELIXIR', 'FLUCH'],
        );
    }
}
