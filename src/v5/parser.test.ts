import {parseFormula} from '../parser';
import {SimpleParser} from './parser';

const parsers = [new SimpleParser()];

test('it should parse a roll formula', () => {
    const result = parseFormula('s30hr3s', parsers);
    expect(result.hunger).toBe(31);
    expect(result.skills).toBe(4);
});
