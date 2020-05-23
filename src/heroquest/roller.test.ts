import {makeRng} from '../rng';
import {Dice, DicePool, Faces} from './dice';
import {HeroQuestRoller} from './roller';

test('should react to hq command', () => {
    const roller = new HeroQuestRoller(makeRng(0), 'hq');
    expect(roller.handlesCommand('/hq ')).toBe(true);
});

test('should roll a hero skull', () => {
    const roller = new HeroQuestRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.HERO);
    expect(result[0].face).toBe(Faces.HERO_SKULL);
});

test('should roll a hero lion shield', () => {
    const roller = new HeroQuestRoller(makeRng(4), '');
    const result = roller.roll(new DicePool(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.HERO);
    expect(result[0].face).toBe(Faces.HERO_LION_SHIELD);
});

test('should roll a hero skull shield', () => {
    const roller = new HeroQuestRoller(makeRng(5), '');
    const result = roller.roll(new DicePool(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.HERO);
    expect(result[0].face).toBe(Faces.HERO_SKULL_SHIELD);
});

test('should roll a monster skull', () => {
    const roller = new HeroQuestRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.MONSTER);
    expect(result[0].face).toBe(Faces.MONSTER_SKULL);
});

test('should roll a monster lion shield', () => {
    const roller = new HeroQuestRoller(makeRng(4), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.MONSTER);
    expect(result[0].face).toBe(Faces.MONSTER_LION_SHIELD);
});

test('should roll a monster skull shield', () => {
    const roller = new HeroQuestRoller(makeRng(5), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.MONSTER);
    expect(result[0].face).toBe(Faces.MONSTER_SKULL_SHIELD);
});

test('should roll a monster and hero skull shield', () => {
    const roller = new HeroQuestRoller(makeRng(5, 5), '');
    const result = roller.roll(new DicePool(1, 1));

    expect(result.length).toBe(2);
    expect(result[0].die).toBe(Dice.HERO);
    expect(result[0].face).toBe(Faces.HERO_SKULL_SHIELD);
    expect(result[1].die).toBe(Dice.MONSTER);
    expect(result[1].face).toBe(Faces.MONSTER_SKULL_SHIELD);
});
