import {interpretResult, toRollResult} from './dice';

test('six should be the largest face', () => {
    const rollResult = toRollResult({
        face1: 1,
        face2: 1,
        face3: 1,
        face4: 1,
        face5: 1,
        face6: 1
    });
    const result = interpretResult(rollResult, false);
    expect(result.value).toBe(6);
    expect(result.key1).toBe(false);
    expect(result.key2).toBe(false);
    expect(result.key3).toBe(false);
    expect(result.key4).toBe(false);
    expect(result.key5).toBe(false);
    expect(result.key6).toBe(true);
});

test('one should be the smallest face', () => {
    const rollResult = toRollResult({
        face1: 1,
        face2: 1,
        face3: 1,
        face4: 1,
        face5: 1,
        face6: 1
    });
    const result = interpretResult(rollResult, true);
    expect(result.value).toBe(1);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(false);
    expect(result.key3).toBe(false);
    expect(result.key4).toBe(false);
    expect(result.key5).toBe(false);
    expect(result.key6).toBe(false);
});

test('largest sum should be the result', () => {
    const rollResult = toRollResult({
        face1: 4,
        face2: 3,
        face3: 2,
        face4: 2,
        face5: 0,
        face6: 1
    });
    const result = interpretResult(rollResult, false);
    expect(result.value).toBe(8);
    expect(result.key1).toBe(false);
    expect(result.key2).toBe(false);
    expect(result.key3).toBe(false);
    expect(result.key4).toBe(true);
    expect(result.key5).toBe(false);
    expect(result.key6).toBe(false);
});

test('ties in sum should go to largest face', () => {
    const rollResult = toRollResult({
        face1: 12,
        face2: 6,
        face3: 4,
        face4: 3
    });
    const result = interpretResult(rollResult, false);
    expect(result.value).toBe(12);
    expect(result.key1).toBe(false);
    expect(result.key2).toBe(false);
    expect(result.key3).toBe(false);
    expect(result.key4).toBe(true);
});

test('negative dice should not sum like faces', () => {
    const rollResult = toRollResult({
        face1: 10,
        face2: 1,
        face3: 1,
        face6: 10
    });
    const result = interpretResult(rollResult, true);
    expect(result.value).toBe(1);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(false);
    expect(result.key3).toBe(false);
    expect(result.key4).toBe(false);
    expect(result.key5).toBe(false);
    expect(result.key6).toBe(false);
});
