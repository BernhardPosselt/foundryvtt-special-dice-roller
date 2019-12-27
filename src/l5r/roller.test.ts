import {countResults, Dice, Faces, parseFormula, reRoll, roll, RollResult} from './roller';
import {RandomNumberGenerator} from '../rng';

function makeRng(...constNumber: number[]): RandomNumberGenerator {
    return () => {
        const result = constNumber.shift();
        if (result === undefined) {
            throw new Error("out of entropy");
        } else {
            return result;
        }
    }
}

test('should roll a ring 1', () => {
    const result = roll(1, 0, makeRng(0));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.FAILURE);
});

test('should roll a ring 2', () => {
    const result = roll(1, 0, makeRng(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.SUCCESS);
});


test('should roll a ring 3', () => {
    const result = roll(1, 0, makeRng(2));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.SUCCESS_STRIFE);
});

test('should roll a ring 4', () => {
    const result = roll(1, 0, makeRng(3, 2));

    expect(result.length).toBe(2);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.EXPLODING_STRIFE);
    expect(result[1].die).toBe(Dice.RING);
    expect(result[1].face).toBe(Faces.SUCCESS_STRIFE);
});

test('should roll a ring 5', () => {
    const result = roll(1, 0, makeRng(4));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.OPPORTUNITY);
});

test('should roll a ring 6', () => {
    const result = roll(1, 0, makeRng(5));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.OPPORTUNITY_STRIFE);
});

test('should roll a ring 1 and skill 1', () => {
    const result = roll(1, 1, makeRng(0, 1));

    expect(result.length).toBe(2);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.FAILURE);
    expect(result[1].die).toBe(Dice.SKILL);
    expect(result[1].face).toBe(Faces.FAILURE);
});

test('should roll a skill 1', () => {
    const result = roll(0, 1, makeRng(0));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.FAILURE);
});

test('should roll a skill 2', () => {
    const result = roll(0,1, makeRng(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.FAILURE);
});

test('should roll a skill 3', () => {
    const result = roll(0,1, makeRng(2));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.SUCCESS);
});

test('should roll a skill 4', () => {
    const result = roll(0,1, makeRng(3));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.SUCCESS);
});

test('should roll a skill 5', () => {
    const result = roll(0,1, makeRng(4));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.SUCCESS_OPPORTUNITY);
});

test('should roll a skill 6', () => {
    const result = roll(0,1, makeRng(5));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.SUCCESS_STRIFE);
});

test('should roll a skill 7', () => {
    const result = roll(0,1, makeRng(6));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.SUCCESS_STRIFE);
});

test('should roll a skill 8', () => {
    const result = roll(0,1, makeRng(7, 9));

    expect(result.length).toBe(2);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.EXPLODING);
    expect(result[1].die).toBe(Dice.SKILL);
    expect(result[1].face).toBe(Faces.OPPORTUNITY);
});


test('should roll a skill 9', () => {
    const result = roll(0,1, makeRng(8, 7, 9));

    expect(result.length).toBe(3);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.EXPLODING_STRIFE);
    expect(result[1].die).toBe(Dice.SKILL);
    expect(result[1].face).toBe(Faces.EXPLODING);
    expect(result[2].die).toBe(Dice.SKILL);
    expect(result[2].face).toBe(Faces.OPPORTUNITY);
});

test('should roll a skill 10', () => {
    const result = roll(0,1, makeRng(9));

    expect(result.length).toBe(1);
    expect(result[0].face).toBe(Faces.OPPORTUNITY);
});

test('should roll a skill 11', () => {
    const result = roll(0,1, makeRng(10));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.OPPORTUNITY);
});

test('should roll a skill 12', () => {
    const result = roll(0,1, makeRng(11));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.OPPORTUNITY);
});

test('should count results', () => {
    const result = roll(0,7, makeRng(0, 2, 4, 5, 7, 0, 8, 0, 9));
    const count = countResults(result);

    expect(count.exploding).toBe(2);
    expect(count.strife).toBe(2);
    expect(count.successes).toBe(5);
    expect(count.failures).toBe(3);
    expect(count.opportunity).toBe(2);
});

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

test('it should re-roll a result', () => {
    const keptDice = [new RollResult(Dice.RING, Faces.SUCCESS)];
    const reRollDice = [new RollResult(Dice.SKILL, Faces.OPPORTUNITY)];
    const result = reRoll(keptDice, reRollDice, makeRng(0));

    expect(result.length).toBe(2);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.SUCCESS);
    expect(result[1].die).toBe(Dice.SKILL);
    expect(result[1].face).toBe(Faces.FAILURE);
});