import {parseFormula} from './parser';

test('it should parse a roll formula', () => {
    const result = parseFormula("2dr +1ds");
    expect(result.rings).toBe(2);
    expect(result.skills).toBe(1);
});

test('it should parse a mixed roll formula', () => {
    const result = parseFormula("1ds + 4dr");
    expect(result.rings).toBe(4);
    expect(result.skills).toBe(1);
});

test('it should fail to parse a roll formula', () => {
    const msg = 'Could not parse formula 1dx + 4ds! Needs to be formatted like: \"wwbb\" or \"rss\" or "xdr" or "xds" or "xdr+yds" where x and y are positive numbers';
    expect(() => parseFormula("1dx + 4ds")).toThrow(msg);
});

test('it should parse a sky jedi roll formula', () => {
    const result = parseFormula("wwbbsrs");
    expect(result.rings).toBe(3);
    expect(result.skills).toBe(4);
});

test('it should parse a roll formula', () => {
    const result = parseFormula("2dw +1db");
    expect(result.rings).toBe(1);
    expect(result.skills).toBe(2);
});
