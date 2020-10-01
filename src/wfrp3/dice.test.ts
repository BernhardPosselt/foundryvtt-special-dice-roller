import {getDieImage} from '../images';
import {Roll} from '../roller';
import {Dice, dieRollImages, Faces, interpretResult, toRollResult} from './dice';

test('no successes count as a failed check', () => {
    const rollResult = toRollResult({});
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(0);
    expect(result.failures).toBe(0);
    expect(result.boons).toBe(0);
    expect(result.banes).toBe(0);
    expect(result.delays).toBe(0);
    expect(result.fatigues).toBe(0);
    expect(result.stars).toBe(0);
    expect(result.comets).toBe(0);
    expect(result.succeeded).toBe(false);
});

test('one success is a successful check', () => {
    const rollResult = toRollResult({
        successes: 1,
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(1);
    expect(result.failures).toBe(0);
    expect(result.boons).toBe(0);
    expect(result.banes).toBe(0);
    expect(result.comets).toBe(0);
    expect(result.stars).toBe(0);
    expect(result.delays).toBe(0);
    expect(result.fatigues).toBe(0);
    expect(result.succeeded).toBe(true);
});

test('successes should be lowered by failures', () => {
    const rollResult = toRollResult({
        successes: 2,
        boons: 2,
        failures: 1,
        banes: 1,
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(1);
    expect(result.failures).toBe(0);
    expect(result.boons).toBe(1);
    expect(result.banes).toBe(0);
    expect(result.comets).toBe(0);
    expect(result.stars).toBe(0);
    expect(result.fatigues).toBe(0);
    expect(result.delays).toBe(0);
    expect(result.succeeded).toBe(true);
});

test('failures should cancel successes', () => {
    const rollResult = toRollResult({
        successes: 1,
        boons: 1,
        failures: 2,
        banes: 2,
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(0);
    expect(result.failures).toBe(1);
    expect(result.boons).toBe(0);
    expect(result.banes).toBe(1);
    expect(result.comets).toBe(0);
    expect(result.stars).toBe(0);
    expect(result.fatigues).toBe(0);
    expect(result.delays).toBe(0);
    expect(result.succeeded).toBe(false);
});

test('should get a dice image', () => {
    const roll = new Roll(Dice.CHALLENGE, Faces.FAILURE);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('challenge-failure');
});

test('should get a dice image', () => {
    const roll = new Roll(Dice.FORTUNE, Faces.BLANK);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('fortune-blank');
});

test('should get a correct expertise image', () => {
    const roll = new Roll(Dice.EXPERTISE, Faces.SUCCESS_PLUS);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('expertise-success-plus');
});