import {makeRng} from '../rng';
import {Dice, DicePool, Faces} from './dice';
import {HeroQuestRoller} from './roller';

test('should react to hq command', () => {
    const roller = new HeroQuestRoller(makeRng(0), 'hq');
    expect(roller.handlesCommand('/hq ')).toBe(true);
});

test('should roll a skull', () => {
    const roller = new HeroQuestRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.DIE);
    expect(result[0].face).toBe(Faces.SKULL);
});

test('should roll a lion shield', () => {
    const roller = new HeroQuestRoller(makeRng(4), '');
    const result = roller.roll(new DicePool(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.DIE);
    expect(result[0].face).toBe(Faces.LION_SHIELD);
});

test('should roll a skull shield', () => {
    const roller = new HeroQuestRoller(makeRng(5), '');
    const result = roller.roll(new DicePool(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.DIE);
    expect(result[0].face).toBe(Faces.SKULL_SHIELD);
});
