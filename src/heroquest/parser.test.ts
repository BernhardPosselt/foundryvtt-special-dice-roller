import {parseFormula} from '../parser';
import {SimpleParser} from './parser';

const parsers = [new SimpleParser()];

test('it should fail to parse a roll formula', () => {
    const msg = 'Incorrect roll formula 1dx + 4ds! Usage: Any combination of the following letters: h, m (h = hero, m = monster). To roll multiple dice simply add multiple letters or prepend a number, e.g.: c3ba';
    expect(() => parseFormula('1dx + 4ds', parsers)).toThrow(msg);
});

test('it should parse a simple roll formula', () => {
    const result = parseFormula('mmhhh', parsers);
    expect(result.hero).toBe(3);
    expect(result.monster).toBe(2);
});

test('it should parse a simple counted roll formula', () => {
    const result = parseFormula('m3h', parsers);
    expect(result.hero).toBe(3);
    expect(result.monster).toBe(1);
});
