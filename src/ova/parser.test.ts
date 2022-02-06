import {parseFormula} from '../parser';
import {OVAParser} from './parser';

const parsers = [new OVAParser()];

test('it should fail to parse a roll formula', () => {
    const msg = 'Incorrect roll formula 5+4! Usage: A positive number (5), negative number (-5), or 0. No decimal or fractions.';
    expect(() => parseFormula('5+4', parsers)).toThrow(msg);
});

test('it should fail to parse a decimal', () => {
    const msg = 'Incorrect roll formula 5.4! Usage: A positive number (5), negative number (-5), or 0. No decimal or fractions.';
    expect(() => parseFormula('5.4', parsers)).toThrow(msg);
});

test('it should fail to parse a fraction', () => {
    const msg = 'Incorrect roll formula 5/4! Usage: A positive number (5), negative number (-5), or 0. No decimal or fractions.';
    expect(() => parseFormula('5/4', parsers)).toThrow(msg);
});

test('it should parse positive numbers', () => {
    const result = parseFormula('5', parsers);
    expect(result.d6).toBe(5);
});

test('it should parse negative numbers', () => {
    const result = parseFormula('-5', parsers);
    expect(result.d6).toBe(-5);
});

test('it should parse zero', () => {
    const result = parseFormula('0', parsers);
    expect(result.d6).toBe(0);
});
