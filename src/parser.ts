import {combineAll, IMonoid} from './lang';

export interface IParser<R> {
    canParse(formula: string): boolean;
    parse(formula: string): R;
    help(): string;
}

export abstract class Parser<R> implements IParser<R> {
    protected constructor(protected formulaRegex: RegExp) {
    }

    public canParse(formula: string): boolean {
        return this.formulaRegex.test(formula);
    }

    public abstract help(): string;

    public abstract parse(formula: string): R;
}

export function parseFormula<R>(formula: string, parsers: IParser<R>[]): R {
    const trimmedFormula = formula.replace(/\s+/g, '')
        .toLowerCase();
    const helpMessages = [];
    for (const parser of parsers) {
        if (parser.canParse(trimmedFormula)) {
            return parser.parse(trimmedFormula);
        } else {
            helpMessages.push(parser.help());
        }
    }
    const help = helpMessages.join('; ');
    throw new FormulaParseError(`Incorrect roll formula ${formula}! Usage: ${help}`);
}

export class FormulaParseError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export class DefaultSimpleParser<R> extends Parser<R> {
    private readonly letters: string[];
    private numbers = new Set<string>();

    constructor(
        alphabet: string,
        private letterToRolls: (letter: string, occurrences: number) => R,
        private rollValuesMonoid: IMonoid<R>,
        private letterExplanation: string[],
    ) {
        super(new RegExp(`^(?:(?:[0-9]*)?[${escapeRegExp(alphabet)}])+$`));
        this.letters = alphabet.split('');
        this.numbers.add('0');
        this.numbers.add('1');
        this.numbers.add('2');
        this.numbers.add('3');
        this.numbers.add('4');
        this.numbers.add('5');
        this.numbers.add('6');
        this.numbers.add('7');
        this.numbers.add('8');
        this.numbers.add('9');
    }

    public parse(formula: string): R {
        const letters = formula.split('');
        const rolls = [];
        let modifier = '';
        for (const letter of letters) {
            if (this.numbers.has(letter)) {
                modifier += letter;
            } else {
                if (modifier.length > 0) {
                    const multiplier = parseInt(modifier, 10);
                    rolls.push(this.letterToRolls(letter, multiplier));
                    modifier = '';
                } else {
                    rolls.push(this.letterToRolls(letter, 1));
                }
            }
        }
        return combineAll(rolls, this.rollValuesMonoid);
    }

    public help(): string {
        const mappings = this.letterExplanation
            .map((explanation, index) => `${this.letters[index]} = ${explanation}`)
            .join(', ');
        return `Any combination of the following letters: ${this.letters.join(', ')} (${mappings}). To roll multiple dice simply add multiple letters or prepend a number, e.g.: c3ba`;
    }

}
