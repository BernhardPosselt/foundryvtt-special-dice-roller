import {parseFormula} from '../parser';
import {ComplexParser, SimpleParser} from './parser';

const parsers = [new SimpleParser(), new ComplexParser()];

test('it should parse a roll formula', () => {
    const result = parseFormula("2db +1ds + 3da + 4dd +5dp+6dc", parsers);
    expect(result.boost).toBe(2);
    expect(result.setback).toBe(1);
    expect(result.advantage).toBe(3);
    expect(result.difficulty).toBe(4);
    expect(result.proficiency).toBe(5);
    expect(result.challenge).toBe(6);
});

test('it should fail to parse a roll formula', () => {
    const msg = 'Incorrect roll formula 1dx + 4ds! Usage: Any combination of the following letters: a, b, s, d, p, c (a = boost, b = setback, s = ability, d = difficulty, p = proficiency, c = challenge). To roll multiple dice simply add multiple letters; Any combination of the following letters: a, b, s, d, p, c (a = boost, b = setback, s = ability, d = difficulty, p = proficiency, c = challenge) formatted like: ndl (n = number, l = letter), e.g.: 2da. To roll different dice, simply separate them via a +, e.g.: 2da+1db';
    expect(() => parseFormula("1dx + 4ds", parsers)).toThrow(msg);
});

test('it should parse a simple roll formula', () => {
    const result = parseFormula("bbsaaaddddpppppcccccc", parsers);
    expect(result.boost).toBe(2);
    expect(result.setback).toBe(1);
    expect(result.advantage).toBe(3);
    expect(result.difficulty).toBe(4);
    expect(result.proficiency).toBe(5);
    expect(result.challenge).toBe(6);
});
