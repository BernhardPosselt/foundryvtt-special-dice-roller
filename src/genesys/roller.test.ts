import {makeRng} from '../rng';
import {combineRolls} from '../roller';
import {Dice, DicePool, Faces, interpretResult, parseRollValues, rollValuesMonoid} from './dice';
import {genesysRoller} from './roller';

test('should react to gen command', () => {
    const roller = genesysRoller(makeRng(0), 'gen');
    expect(roller.handlesCommand('/gen ')).toBe(true);
});

test('should react to sw command', () => {
    const roller = genesysRoller(makeRng(0), 'sw');
    expect(roller.handlesCommand('/sw ')).toBe(true);
});

test('should roll various dice', () => {
    const roller = genesysRoller(makeRng(5, 3, 5, 3, 1, 3, 7), 'gen');
    const result = roller.roll(new DicePool(1, 1, 1, 1, 1, 1, 1));

    expect(result.length).toBe(7);
    expect(result[0].die).toBe(Dice.PROFICIENCY);
    expect(result[0].face).toBe(Faces.ADVANTAGE);
    expect(result[1].die).toBe(Dice.ABILITY);
    expect(result[1].face).toBe(Faces.DOUBLE_SUCCESS);
    expect(result[2].die).toBe(Dice.CHALLENGE);
    expect(result[2].face).toBe(Faces.THREAT);
    expect(result[3].die).toBe(Dice.DIFFICULTY);
    expect(result[3].face).toBe(Faces.THREAT);
    expect(result[4].die).toBe(Dice.BOOST);
    expect(result[4].face).toBe(Faces.BLANK);
    expect(result[5].die).toBe(Dice.SETBACK);
    expect(result[5].face).toBe(Faces.FAILURE);
    expect(result[6].die).toBe(Dice.FORCE);
    expect(result[6].face).toBe(Faces.FORCE);
});

test('should count results', () => {
    const roller = genesysRoller(makeRng(5, 3, 5, 3, 1, 3, 7), 'gen');
    const result = roller.roll(new DicePool(1, 1, 1, 1, 1, 1, 1));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);

    expect(combined.blanks).toBe(1);
    expect(combined.successes).toBe(2);
    expect(combined.failures).toBe(1);
    expect(combined.advantages).toBe(1);
    expect(combined.threats).toBe(2);
    expect(combined.triumphs).toBe(0);
    expect(combined.despairs).toBe(0);
    expect(combined.force).toBe(1);
    expect(combined.darkForce).toBe(0);
});

test('should interpret results', () => {
    const roller = genesysRoller(makeRng(5, 3, 5, 3, 1, 3, 7), 'gen');
    const result = roller.roll(new DicePool(1, 1, 1, 1, 1, 1, 1));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined);

    expect(interpreted.successes).toBe(1);
    expect(interpreted.advantages).toBe(0);
    expect(interpreted.threats).toBe(1);
    expect(interpreted.triumphs).toBe(0);
    expect(interpreted.despairs).toBe(0);
    expect(interpreted.force).toBe(1);
    expect(interpreted.darkForce).toBe(0);
});

test('should interpret results for setback', () => {
    const roller = genesysRoller(makeRng( 3), 'gen');
    const result = roller.roll(new DicePool(0, 1, 0, 0, 0, 0, 0));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined);

    expect(interpreted.successes).toBe(0);
    expect(interpreted.failures).toBe(1);
    expect(interpreted.advantages).toBe(0);
    expect(interpreted.threats).toBe(0);
    expect(interpreted.triumphs).toBe(0);
    expect(interpreted.despairs).toBe(0);
    expect(interpreted.force).toBe(0);
    expect(interpreted.darkForce).toBe(0);
    expect(interpreted.succeeded).toBe(false);
});

test('should correctly calculate successes', () => {
    const roller = genesysRoller(makeRng( 3, 11), 'gen');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 2, 0, 0));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined);

    expect(interpreted.successes).toBe(3);
    expect(interpreted.failures).toBe(0);
    expect(interpreted.advantages).toBe(0);
    expect(interpreted.threats).toBe(0);
    expect(interpreted.triumphs).toBe(1);
    expect(interpreted.despairs).toBe(0);
    expect(interpreted.force).toBe(0);
    expect(interpreted.darkForce).toBe(0);
    expect(interpreted.succeeded).toBe(true);
});

test('should correctly calculate failures', () => {
    const roller = genesysRoller(makeRng( 3, 11), 'gen');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 2, 0));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined);

    expect(interpreted.successes).toBe(0);
    expect(interpreted.failures).toBe(3);
    expect(interpreted.advantages).toBe(0);
    expect(interpreted.threats).toBe(0);
    expect(interpreted.triumphs).toBe(0);
    expect(interpreted.despairs).toBe(1);
    expect(interpreted.force).toBe(0);
    expect(interpreted.darkForce).toBe(0);
    expect(interpreted.succeeded).toBe(false);
});
