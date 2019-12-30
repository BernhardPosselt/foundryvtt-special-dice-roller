import {getDieImage} from '../images';
import {Roll} from '../roller';
import {Dice, dieRollImages, Faces, interpretResult, toRollResult} from './dice';

test('no successes count as a failed check', () => {
    const rollResult = toRollResult({});
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(0);
    expect(result.failures).toBe(0);
    expect(result.threats).toBe(0);
    expect(result.advantages).toBe(0);
    expect(result.despairs).toBe(0);
    expect(result.triumphs).toBe(0);
    expect(result.force).toBe(0);
    expect(result.darkForce).toBe(0);
    expect(result.succeeded).toBe(false);
});

test('one success is a successful check', () => {
    const rollResult = toRollResult({
        successes: 1,
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(1);
    expect(result.failures).toBe(0);
    expect(result.threats).toBe(0);
    expect(result.advantages).toBe(0);
    expect(result.despairs).toBe(0);
    expect(result.triumphs).toBe(0);
    expect(result.force).toBe(0);
    expect(result.darkForce).toBe(0);
    expect(result.succeeded).toBe(true);
});

test('successes should cancel failures', () => {
    const rollResult = toRollResult({
        successes: 2,
        triumphs: 2,
        failures: 1,
        despairs: 1,
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(2);
    expect(result.failures).toBe(0);
    expect(result.threats).toBe(0);
    expect(result.advantages).toBe(0);
    expect(result.despairs).toBe(1);
    expect(result.triumphs).toBe(2);
    expect(result.force).toBe(0);
    expect(result.darkForce).toBe(0);
    expect(result.succeeded).toBe(true);
});

test('failures should cancel successes', () => {
    const rollResult = toRollResult({
        successes: 1,
        triumphs: 1,
        failures: 2,
        despairs: 2,
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(0);
    expect(result.failures).toBe(2);
    expect(result.threats).toBe(0);
    expect(result.advantages).toBe(0);
    expect(result.despairs).toBe(2);
    expect(result.triumphs).toBe(1);
    expect(result.force).toBe(0);
    expect(result.darkForce).toBe(0);
    expect(result.succeeded).toBe(false);
});

test('threats should cancel abilities', () => {
    const rollResult = toRollResult({
        advantages: 2,
        threats: 1,
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(0);
    expect(result.failures).toBe(0);
    expect(result.threats).toBe(0);
    expect(result.advantages).toBe(1);
    expect(result.despairs).toBe(0);
    expect(result.triumphs).toBe(0);
    expect(result.force).toBe(0);
    expect(result.darkForce).toBe(0);
    expect(result.succeeded).toBe(false);
});

test('abilities should cancel threats', () => {
    const rollResult = toRollResult({
        advantages: 1,
        threats: 2,
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(0);
    expect(result.failures).toBe(0);
    expect(result.threats).toBe(1);
    expect(result.advantages).toBe(0);
    expect(result.despairs).toBe(0);
    expect(result.triumphs).toBe(0);
    expect(result.force).toBe(0);
    expect(result.darkForce).toBe(0);
    expect(result.succeeded).toBe(false);
});

test('should map force dice', () => {
    const rollResult = toRollResult({
        force: 1,
        darkForce: 2,
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(0);
    expect(result.failures).toBe(0);
    expect(result.threats).toBe(0);
    expect(result.advantages).toBe(0);
    expect(result.despairs).toBe(0);
    expect(result.triumphs).toBe(0);
    expect(result.force).toBe(1);
    expect(result.darkForce).toBe(2);
    expect(result.succeeded).toBe(false);
});

test('should get a dice image', () => {
    const roll = new Roll(Dice.ABILITY, Faces.ADVANTAGE);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('greena');
});

test('should get a dice image', () => {
    const roll = new Roll(Dice.ABILITY, Faces.BLANK);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('green');
});

test('should get a correct boost image', () => {
    const roll = new Roll(Dice.BOOST, Faces.DOUBLE_ADVANTAGE);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('blueaa');
});

test('should roll correct boost', () => {
    const rollResult = toRollResult({
        failures: 1,
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(0);
    expect(result.failures).toBe(1);
    expect(result.threats).toBe(0);
    expect(result.advantages).toBe(0);
    expect(result.despairs).toBe(0);
    expect(result.triumphs).toBe(0);
    expect(result.force).toBe(0);
    expect(result.darkForce).toBe(0);
    expect(result.succeeded).toBe(false);
});
