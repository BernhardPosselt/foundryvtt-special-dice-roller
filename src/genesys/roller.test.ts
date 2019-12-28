import {GenesysRoller} from './roller';
import {makeRng} from '../rng';
import {Dice, Faces, Rolls} from './dice';

test('should react to gen command', () => {
    const roller = new GenesysRoller(makeRng(0), 'gen');
    expect(roller.handlesCommand('/gen ')).toBe(true);
});

test('should react to sw command', () => {
    const roller = new GenesysRoller(makeRng(0), 'sw');
    expect(roller.handlesCommand('/sw ')).toBe(true);
});

test('should roll various dice', () => {
    const roller = new GenesysRoller(makeRng(1, 2, 3, 4, 5, 6, 7), 'gen');
    const result = roller.roll(new Rolls(1, 1, 1, 1, 1, 1, 1));

    expect(result.length).toBe(7);
    expect(result[0].die).toBe(Dice.BOOST);
    expect(result[0].face).toBe(Faces.BLANK);
    expect(result[1].die).toBe(Dice.SETBACK);
    expect(result[1].face).toBe(Faces.FAILURE);
    expect(result[2].die).toBe(Dice.ABILITY);
    expect(result[2].face).toBe(Faces.DOUBLE_SUCCESS);
    expect(result[3].die).toBe(Dice.DIFFICULTY);
    expect(result[3].face).toBe(Faces.THREAT);
    expect(result[4].die).toBe(Dice.PROFICIENCY);
    expect(result[4].face).toBe(Faces.ADVANTAGE);
    expect(result[5].die).toBe(Dice.CHALLENGE);
    expect(result[5].face).toBe(Faces.THREAT);
    expect(result[6].die).toBe(Dice.FORCE);
    expect(result[6].face).toBe(Faces.FORCE);
});

test('should count results', () => {
    const roller = new GenesysRoller(makeRng(1, 2, 3, 4, 5, 6, 7), 'gen');
    const result = roller.roll(new Rolls(1, 1, 1, 1, 1, 1, 1));
    const combined = roller.combineRolls(result);

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