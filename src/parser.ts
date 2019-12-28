import {combineAll, Monoid} from './lang';

export abstract class Parser<R> {
    protected constructor(protected formulaRegex: RegExp) {
    }

    canParse(formula: string): boolean {
        return this.formulaRegex.test(formula)
    }

    abstract help(): string

    abstract parse(formula: string): R
}

export function parseFormula<R>(formula: string, parsers: Parser<R>[]): R {
    const trimmedFormula = formula.replace(/\s+/g, '')
        .toLowerCase();
    const helpMessages = [];
    for (let parser of parsers) {
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

export function splitComplexRoll(roll: string): [string, number] {
    const number = parseInt(roll.substring(0, roll.indexOf('d')), 10);
    const die = roll.substring(roll.indexOf('d')+1);
    return [die, number];
}

export class DefaultSimpleParser<R> extends Parser<R> {
    private readonly letters: string[];

    constructor(
        alphabet: string,
        private letterToRolls: (letter: string) => R,
        private rollsMonoid: Monoid<R>,
        private letterExplanation: string[]
    ) {
        super(new RegExp(`^[${alphabet}]+$`));
        this.letters = alphabet.split('');
    }

    parse(formula: string): R {
        const rolls = formula.split('')
            .map((letter) => {
                return this.letterToRolls(letter);
            });
        return combineAll(rolls, this.rollsMonoid);
    }

    help(): string {
        const mappings = this.letterExplanation
            .map((explanation, index) => `${this.letters[index]} = ${explanation}`)
            .join(', ');
        return `Any combination of the following letters: ${this.letters.join(', ')} (${mappings}). To roll multiple dice simply add multiple letters`;
    }
}

export class DefaultComplexParser<R> extends Parser<R> {
    private readonly letters: string[];

    constructor(
        alphabet: string,
        private letterToRolls: (letter: string, value: number) => R,
        private rollsMonoid: Monoid<R>,
        private letterExplanation: string[]
    ) {
        super(new RegExp(`^[1-9][0-9]*d(?:[${alphabet}])(?:\\+[1-9][0-9]*d(?:[${alphabet}]))*$`));
        this.letters = alphabet.split('');
    }

    parse(formula: string): R {
        const rolls = formula.split('+')
            .map((part) => {
                const [die, number] = splitComplexRoll(part);
                return this.letterToRolls(die, number);
            });
        return combineAll(rolls, this.rollsMonoid);
    }

    help(): string {
        const mappings = this.letterExplanation
            .map((explanation, index) => `${this.letters[index]} = ${explanation}`)
            .join(', ');
        const singleExample = '2d' + this.letters[0];
        const multipleExample = singleExample + '+1d' + this.letters[1];
        return `Any combination of the following letters: ${this.letters.join(', ')} (${mappings}) formatted like: ndl (n = number, l = letter), e.g.: ${singleExample}. To roll different dice, simply separate them via a +, e.g.: ${multipleExample}`;

    }
}
