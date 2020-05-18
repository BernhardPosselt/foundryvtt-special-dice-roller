import {parseFormula} from '../parser';
import {SimpleParser} from './parser';

const parsers = [new SimpleParser()];

test('it should fail to parse a roll formula', () => {
    const msg = 'Incorrect roll formula 1dx + 4ds! Usage: Any combination of the following letters: d (d = dice). To roll multiple dice simply add multiple letters or prepend a number, e.g.: c3ba';
    expect(() => parseFormula('1dx + 4ds', parsers)).toThrow(msg);
});

test('it should parse a simple roll formula', () => {
    const result = parseFormula('ddd', parsers);
    expect(result.dice).toBe(3);
});

test('it should parse a simple counted roll formula', () => {
    const result = parseFormula('d3d', parsers);
    expect(result.dice).toBe(4);
});
