import {makeRng} from '../rng';
import {ovaRoller} from './roller';
import {Dice, DicePool, Faces, interpretResult, parseRollValues, rollValuesMonoid} from './dice';
import {combineRolls} from '../roller';

test('should react to ova command', () => {
    const roller = ovaRoller(makeRng(0), 'ova');
    expect(roller.handlesCommand('/ova ')).toBe(true);
});

test('should roll d6 dice', () => {
    const roller = ovaRoller(makeRng(Faces.FACE1, Faces.FACE6, Faces.FACE2, Faces.FACE4, Faces.FACE3, Faces.FACE5), 'ova');
    const result = roller.roll(new DicePool(6));

    expect(result.length).toBe(6);
    expect(result[0].die).toBe(Dice.D6);
    expect(result[0].face).toBe(Faces.FACE1);
    expect(result[1].die).toBe(Dice.D6);
    expect(result[1].face).toBe(Faces.FACE6);
    expect(result[2].die).toBe(Dice.D6);
    expect(result[2].face).toBe(Faces.FACE2);
    expect(result[3].die).toBe(Dice.D6);
    expect(result[3].face).toBe(Faces.FACE4);
    expect(result[4].die).toBe(Dice.D6);
    expect(result[4].face).toBe(Faces.FACE3);
    expect(result[5].die).toBe(Dice.D6);
    expect(result[5].face).toBe(Faces.FACE5);
});

test('should handle positive rolls', () => {
    const roller = ovaRoller(makeRng(Faces.FACE4, Faces.FACE6, Faces.FACE4), 'ova');
    const result = roller.roll(new DicePool(3));

    expect(result.length).toBe(3);
    expect(roller.negative).toBe(false);
});

test('should handle zero roll', () => {
    const roller = ovaRoller(makeRng(Faces.FACE4, Faces.FACE6, Faces.FACE4), 'ova');
    const result = roller.roll(new DicePool(0));

    expect(result.length).toBe(2);
    expect(roller.negative).toBe(true);
});

test('should handle negative rolls', () => {
    const roller = ovaRoller(makeRng(Faces.FACE4, Faces.FACE6, Faces.FACE4), 'ova');
    const result = roller.roll(new DicePool(-1));

    expect(result.length).toBe(3);
    expect(roller.negative).toBe(true);
});

test('should count results', () => {
    const roller = ovaRoller(makeRng(Faces.FACE1, Faces.FACE6, Faces.FACE2, Faces.FACE2, Faces.FACE1, Faces.FACE6, Faces.FACE5), 'ova');
    const result = roller.roll(new DicePool(7));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);

    expect(combined.face1).toBe(2);
    expect(combined.face2).toBe(2);
    expect(combined.face3).toBe(0);
    expect(combined.face4).toBe(0);
    expect(combined.face5).toBe(1);
    expect(combined.face6).toBe(2);
});

test('should interpret positive results', () => {
    const roller = ovaRoller(makeRng(Faces.FACE4, Faces.FACE6, Faces.FACE4), 'ova');
    const result = roller.roll(new DicePool(3));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined, roller.negative);

    expect(interpreted.value).toBe(8);
    expect(interpreted.key1).toBe(false);
    expect(interpreted.key2).toBe(false);
    expect(interpreted.key3).toBe(false);
    expect(interpreted.key4).toBe(true);
    expect(interpreted.key5).toBe(false);
    expect(interpreted.key6).toBe(false);
});

test('should interpret negative results', () => {
    const roller = ovaRoller(makeRng(Faces.FACE4, Faces.FACE6, Faces.FACE4), 'ova');
    const result = roller.roll(new DicePool(-1));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined, roller.negative);

    expect(interpreted.value).toBe(4);
    expect(interpreted.key1).toBe(false);
    expect(interpreted.key2).toBe(false);
    expect(interpreted.key3).toBe(false);
    expect(interpreted.key4).toBe(true);
    expect(interpreted.key5).toBe(false);
    expect(interpreted.key6).toBe(false);
});

test('should interpret results for a zero roll', () => {
    const roller = ovaRoller(makeRng(Faces.FACE4, Faces.FACE6), 'ova');
    const result = roller.roll(new DicePool(0));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined, roller.negative);

    expect(interpreted.value).toBe(4);
    expect(interpreted.key1).toBe(false);
    expect(interpreted.key2).toBe(false);
    expect(interpreted.key3).toBe(false);
    expect(interpreted.key4).toBe(true);
    expect(interpreted.key5).toBe(false);
    expect(interpreted.key6).toBe(false);
});


