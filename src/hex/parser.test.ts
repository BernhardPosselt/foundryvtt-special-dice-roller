import {parseFormula} from '../parser';
import {SimpleParser} from './parser';

const parsers = [new SimpleParser()];

test('it should fail to parse a roll formula', () => {
    const msg = 'Incorrect roll formula 1dx + 4ds! Usage: Any combination of the following letters: h, +, -, s, b, e, f (h = HEXXEN, + = BONUS, - = MALUS, s = SEGNUNG, b = BLUT, e = ELIXIR, f = FLUCH). To roll multiple dice simply add multiple letters or prepend a number, e.g.: c3ba';
    expect(() => parseFormula('1dx + 4ds', parsers)).toThrow(msg);
});

test('it should parse a simple roll formula', () => {
    const result = parseFormula('hhhhh++-sebf', parsers);
    expect(result.HEXXEN).toBe(5);
    expect(result.BONUS).toBe(2);
    expect(result.MALUS).toBe(1);
    expect(result.SEGNUNG).toBe(1);
    expect(result.ELIXIR).toBe(1);
    expect(result.BLUT).toBe(1);
    expect(result.FLUCH).toBe(1);
});

test('it should parse a simple counted roll formula', () => {
    const result = parseFormula('3h2-', parsers);
    expect(result.HEXXEN).toBe(3);
    expect(result.MALUS).toBe(2);
});

test('should cap bonus and malus to a maximum of 5', () => {
    const result = parseFormula('8+7-', parsers);
    expect(result.BONUS).toBe(5);
    expect(result.MALUS).toBe(5);
});
