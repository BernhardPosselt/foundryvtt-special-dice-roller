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
    const help = helpMessages.join(', ');
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