import {getDieImage} from '../images';
import {Roll} from '../roller';
import {Dice, dieRollImages, Faces, interpretResult, toRollResult} from './dice';

test('no roll', () => {
    const rollResult = toRollResult({});
    const result = interpretResult(rollResult);

    expect(result.monsterDamage).toBe(0);
    expect(result.heroDamage).toBe(0);
    expect(result.hits).toBe(0);
    expect(result.heroShields).toBe(0);
    expect(result.monsterShields).toBe(0);
});

test('should interpret results', () => {
    const rollResult = toRollResult({
        skullShields: 4,
        skulls: 3,
        lionShields: 1,
    });
    const result = interpretResult(rollResult);

    expect(result.monsterDamage).toBe(2);
    expect(result.heroDamage).toBe(0);
    expect(result.hits).toBe(3);
    expect(result.heroShields).toBe(1);
    expect(result.monsterShields).toBe(4);
});

test('should interpret results reversed', () => {
    const rollResult = toRollResult({
        skullShields: 1,
        skulls: 3,
        lionShields: 4,
    });
    const result = interpretResult(rollResult);

    expect(result.monsterDamage).toBe(0);
    expect(result.heroDamage).toBe(2);
    expect(result.hits).toBe(3);
    expect(result.heroShields).toBe(4);
    expect(result.monsterShields).toBe(1);
});

test('should get a lion shield dice image', () => {
    const roll = new Roll(Dice.DIE, Faces.LION_SHIELD);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('lionshield');
});

test('should get a skull dice image', () => {
    const roll = new Roll(Dice.DIE, Faces.SKULL);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('skull');
});

test('should get a skull shield dice image', () => {
    const roll = new Roll(Dice.DIE, Faces.SKULL_SHIELD);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('skullshield');
});
