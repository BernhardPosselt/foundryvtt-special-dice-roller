import {parseFormula} from '../parser';
import {ComplexParser, SimpleParser} from './parser';

const parsers = [new SimpleParser(), new ComplexParser()];

test('it should parse a roll formula', () => {
    const result = parseFormula("2db +1ds + 3da + 4dd +5dp+6dc", parsers);
    expect(result.boost).toBe(2);
    expect(result.setback).toBe(1);
    expect(result.ability).toBe(3);
    expect(result.difficulty).toBe(4);
    expect(result.proficiency).toBe(5);
    expect(result.challenge).toBe(6);
});

test('it should fail to parse a roll formula', () => {
    const msg = 'Incorrect roll formula 1dx + 4ds! Usage: bbssaaddppcc, bb, ss, aaa, dd, pp, cc; 2db+2ds+2da+2dd+2dp+2dc, 2db, 2ds, 2da, 2dd, 2dp, 2dc';
    expect(() => parseFormula("1dx + 4ds", parsers)).toThrow(msg);
});

test('it should parse a simple roll formula', () => {
    const result = parseFormula("bbsaaaddddpppppcccccc", parsers);
    expect(result.boost).toBe(2);
    expect(result.setback).toBe(1);
    expect(result.ability).toBe(3);
    expect(result.difficulty).toBe(4);
    expect(result.proficiency).toBe(5);
    expect(result.challenge).toBe(6);
});
