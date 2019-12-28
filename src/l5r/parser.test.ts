import {parseFormula} from '../parser';
import {ComplexParser, SimpleParser} from './parser';

const parsers = [new SimpleParser(), new ComplexParser()];

test('it should parse a roll formula', () => {
    const result = parseFormula("2dr +1ds", parsers);
    expect(result.rings).toBe(2);
    expect(result.skills).toBe(1);
});

test('it should parse a mixed roll formula', () => {
    const result = parseFormula("1ds + 4dr", parsers);
    expect(result.rings).toBe(4);
    expect(result.skills).toBe(1);
});

test('it should fail to parse a roll formula', () => {
    const msg = 'Incorrect roll formula 1dx + 4ds! Usage: ssrr, ss, rr, wwbb, ww, bb, 2dr+1ds, 2db+1dw, 2dr, 1ds, 2dw, 1db';
    expect(() => parseFormula("1dx + 4ds", parsers)).toThrow(msg);
});

test('it should parse a sky jedi roll formula', () => {
    const result = parseFormula("wwbbsrs", parsers);
    expect(result.rings).toBe(3);
    expect(result.skills).toBe(4);
});

test('it should parse a roll formula', () => {
    const result = parseFormula("2dw +1db", parsers);
    expect(result.rings).toBe(1);
    expect(result.skills).toBe(2);
});
