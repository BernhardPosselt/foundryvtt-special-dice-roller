import {parseFormula} from '../parser';
import {SimpleWarhammerParser} from './parser';

const parsers = [new SimpleWarhammerParser()];

test('it should fail to parse a roll formula', () => {
    const msg = 'Incorrect roll formula 1dx + 4ds! Usage: Any combination of the following letters: a, c, r, e, f, m, x (a = characteristics, c = conservative, r = reckless, e = expertise, f = fortune, m = misfortune, x = challenge). To roll multiple dice simply add multiple letters or prepend a number, e.g.: c3ba';
    expect(() => parseFormula('1dx + 4ds', parsers)).toThrow(msg);
});

test('it should parse a simple roll formula', () => {
    const result = parseFormula('aacccrrrrefffmmmmmxxxxxx', parsers);
    expect(result.characteristics).toBe(2);
    expect(result.conservative).toBe(3);
    expect(result.reckless).toBe(4);
    expect(result.expertise).toBe(1);
    expect(result.fortune).toBe(3);
    expect(result.misfortune).toBe(5);
    expect(result.challenge).toBe(6);
});

test('it should parse a simple counted roll formula', () => {
    const result = parseFormula('2a3c4r5e6f7m8x', parsers);
    expect(result.characteristics).toBe(2);
    expect(result.conservative).toBe(3);
    expect(result.reckless).toBe(4);
    expect(result.expertise).toBe(5);
    expect(result.fortune).toBe(6);
    expect(result.misfortune).toBe(7);
    expect(result.challenge).toBe(8);
});
