import {interpretResult, toRollResult} from './dice';

test('at least one critical hunger should make it messy', () => {
    const rollResult = toRollResult({
        successes: 1,
        failures: 2,
        hungerPotentialCriticals: 1,
        potentialCriticals: 1
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(5);
    expect(result.messyCritical).toBe(true);
    expect(result.bestialFailure).toBe(false);
});

test('hunger criticals count no matter what', () => {
    const rollResult = toRollResult({
        successes: 1,
        failures: 2,
        hungerPotentialCriticals: 1,
        potentialCriticals: 2,
        hungerFailures1: 1
    });
    const result = interpretResult(rollResult);

    expect(result.successes).toBe(5);
    expect(result.messyCritical).toBe(true);
    expect(result.bestialFailure).toBe(true);
});