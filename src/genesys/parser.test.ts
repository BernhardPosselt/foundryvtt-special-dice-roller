import {parseFormula} from '../parser';
import {SimpleParser} from './parser';

const parsers = [new SimpleParser()];

test('it should fail to parse a roll formula', () => {
    const msg = 'Incorrect roll formula 1dx + 4ds! Usage: Any combination of the following letters: a, b, s, d, p, c (a = boost, b = setback, s = ability, d = difficulty, p = proficiency, c = challenge). To roll multiple dice simply add multiple letters or prepend a number, e.g.: c3ba';
    expect(() => parseFormula('1dx + 4ds', parsers)).toThrow(msg);
});

test('it should parse a simple roll formula', () => {
    const result = parseFormula('bbsaaaddddpppppcccccc', parsers);
    expect(result.boost).toBe(2);
    expect(result.setback).toBe(1);
    expect(result.ability).toBe(3);
    expect(result.difficulty).toBe(4);
    expect(result.proficiency).toBe(5);
    expect(result.challenge).toBe(6);
});

test('it should parse a simple counted roll formula', () => {
    const result = parseFormula('bbs3aaddddpppppcccccc', parsers);
    expect(result.boost).toBe(2);
    expect(result.setback).toBe(1);
    expect(result.ability).toBe(4);
    expect(result.difficulty).toBe(4);
    expect(result.proficiency).toBe(5);
    expect(result.challenge).toBe(6);
});
