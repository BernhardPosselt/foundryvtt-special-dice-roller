import {makeRng} from '../rng';
import {combineRolls} from '../roller';
import {Dice, DicePool, Faces, interpretResult, parseRollValues, rollValuesMonoid} from './dice';
import {warhammerRoller} from './roller';

test('should react to wfrp3 command', () => {
    const roller = warhammerRoller(makeRng(0), 'wfrp3');
    expect(roller.handlesCommand('/wfrp3 ')).toBe(true);
});


test('should roll various dice', () => {
    const roller = warhammerRoller(makeRng(0, 0, 0, 0, 0, 0, 0), 'wfrp3');
    const result = roller.roll(new DicePool(1, 1, 1, 1, 1, 1, 1));

    expect(result.length).toBe(7);

    expect(result[0].die).toBe(Dice.CHAR);
    expect(result[0].face).toBe(Faces.BLANK);
    expect(result[1].die).toBe(Dice.CONSERVATIVE);
    expect(result[1].face).toBe(Faces.BLANK);
    expect(result[2].die).toBe(Dice.RECKLESS);
    expect(result[2].face).toBe(Faces.BLANK);
    expect(result[3].die).toBe(Dice.EXPERTISE);
    expect(result[3].face).toBe(Faces.BLANK);
    expect(result[4].die).toBe(Dice.FORTUNE);
    expect(result[4].face).toBe(Faces.BLANK);
    expect(result[5].die).toBe(Dice.MISFORTUNE);
    expect(result[5].face).toBe(Faces.BLANK);
    expect(result[6].die).toBe(Dice.CHALLENGE);
    expect(result[6].face).toBe(Faces.BLANK);
});

test('should roll 3 bane', () => {
    const roller = warhammerRoller(makeRng(0, 1, 2), 'wfrp3');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 0, 3));

    expect(result.length).toBe(3);

    expect(result[0].die).toBe(Dice.CHALLENGE);
    expect(result[0].face).toBe(Faces.BLANK);
    expect(result[1].die).toBe(Dice.CHALLENGE);
    expect(result[1].face).toBe(Faces.BANE);
    expect(result[2].die).toBe(Dice.CHALLENGE);
    expect(result[2].face).toBe(Faces.DOUBLE_BANE);

    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined);

    expect(interpreted.banes).toBe(3);
});

test('should count results', () => {
    const roller = warhammerRoller(makeRng(1, 4, 4, 6, 6, 5, 3, 3, 3, 6), 'wfrp3');
    const result = roller.roll(new DicePool(1, 2, 2, 1, 1, 1, 2));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);

    expect(combined.blanks).toBe(0);
    expect(combined.successes).toBe(4);
    expect(combined.failures).toBe(2);
    expect(combined.boons).toBe(2);
    expect(combined.banes).toBe(1);
    expect(combined.comets).toBe(1);
    expect(combined.fatigues).toBe(2);
    expect(combined.delays).toBe(2);
    expect(combined.stars).toBe(1);
});

test('should interpret results', () => {
    const roller = warhammerRoller(makeRng(1, 4, 4, 6, 6, 5, 3, 3, 3, 6), 'wfrp3');
    const result = roller.roll(new DicePool(1, 2, 2, 1, 1, 1, 2));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined);

    expect(interpreted.successes).toBe(2);
    expect(interpreted.failures).toBe(0);
    expect(interpreted.boons).toBe(1);
    expect(interpreted.banes).toBe(0);
    expect(interpreted.comets).toBe(1);
    expect(interpreted.fatigues).toBe(1);
    expect(interpreted.delays).toBe(1);
    expect(interpreted.stars).toBe(1);
});

test('should correctly calculate failures', () => {
    const roller = warhammerRoller(makeRng(2, 2, 6, 6), 'wfrp3');
    const result = roller.roll(new DicePool(2, 0, 0, 0, 0, 0, 2));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined);

    expect(interpreted.successes).toBe(0);
    expect(interpreted.failures).toBe(2);
});

test('should correctly calculate successes from boom', () => {
    const roller = warhammerRoller(makeRng(4, 4, 5), 'wfrp3');
    const result = roller.roll(new DicePool(0, 0, 0, 1, 0, 0, 0));
    const combined = combineRolls(result, parseRollValues, rollValuesMonoid);
    const interpreted = interpretResult(combined);

    expect(interpreted.successes).toBe(2);
    expect(interpreted.comets).toBe(1);
});
