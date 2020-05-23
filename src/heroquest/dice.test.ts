import {getDieImage} from '../images';
import {Roll} from '../roller';
import {Dice, dieRollImages, Faces, interpretResult, toRollResult} from './dice';

test('no roll', () => {
    const rollResult = toRollResult({});
    const result = interpretResult(rollResult);

    expect(result.monsterDamage).toBe(0);
    expect(result.heroDamage).toBe(0);
});

test('should interpret results', () => {
    const rollResult = toRollResult({
        heroSkullShields: 4,
        heroSkulls: 3,
        heroLionShields: 1,
        monsterSkullShields: 5,
        monsterSkulls: 7,
        monsterLionShields: 8,
    });
    const result = interpretResult(rollResult);

    expect(result.monsterDamage).toBe(6);
    expect(result.heroDamage).toBe(0);
});

test('should interpret results reversed', () => {
    const rollResult = toRollResult({
        heroSkullShields: 5,
        heroSkulls: 7,
        heroLionShields: 8,
        monsterSkullShields: 4,
        monsterSkulls: 3,
        monsterLionShields: 1,
    });
    const result = interpretResult(rollResult);

    expect(result.monsterDamage).toBe(0);
    expect(result.heroDamage).toBe(3);
});

test('should get a hero lion shield dice image', () => {
    const roll = new Roll(Dice.HERO, Faces.HERO_LION_SHIELD);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('herolionshield');
});

test('should get a hero skull dice image', () => {
    const roll = new Roll(Dice.HERO, Faces.HERO_SKULL);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('heroskull');
});

test('should get a hero skull shield dice image', () => {
    const roll = new Roll(Dice.HERO, Faces.HERO_SKULL_SHIELD);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('heroskullshield');
});

test('should get a monster lion shield dice image', () => {
    const roll = new Roll(Dice.MONSTER, Faces.MONSTER_LION_SHIELD);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('monsterlionshield');
});

test('should get a monster skull dice image', () => {
    const roll = new Roll(Dice.MONSTER, Faces.MONSTER_SKULL);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('monsterskull');
});

test('should get a monster skull shield dice image', () => {
    const roll = new Roll(Dice.MONSTER, Faces.MONSTER_SKULL_SHIELD);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('monsterskullshield');
});
