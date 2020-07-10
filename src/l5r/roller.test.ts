import {makeRng} from '../rng';
import {Roll} from '../roller';
import {Dice, DicePool, Faces, interpretResult} from './dice';
import {L5RRoller} from './roller';

test('should react to l5r command', () => {
    const roller = new L5RRoller(makeRng(0), 'l5r');
    expect(roller.handlesCommand('/l5r ')).toBe(true);
});

test('should roll a ring 1', () => {
    const roller = new L5RRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(1, 0));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.FAILURE);
});

test('should roll a ring 2', () => {
    const roller = new L5RRoller(makeRng(1), '');
    const result = roller.roll(new DicePool(1, 0));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.SUCCESS);
});

test('should roll a ring 3', () => {
    const roller = new L5RRoller(makeRng(2), '');
    const result = roller.roll(new DicePool(1, 0));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.SUCCESS_STRIFE);
});

test('should roll a ring 4', () => {
    const roller = new L5RRoller(makeRng(3, 2), '');
    const result = roller.roll(new DicePool(1, 0));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.EXPLODING_STRIFE);
});

test('should roll a ring 5', () => {
    const roller = new L5RRoller(makeRng(4), '');
    const result = roller.roll(new DicePool(1, 0));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.OPPORTUNITY);
});

test('should roll a ring 6', () => {
    const roller = new L5RRoller(makeRng(5), '');
    const result = roller.roll(new DicePool(1, 0));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.OPPORTUNITY_STRIFE);
});

test('should roll a ring 1 and skill 1', () => {
    const roller = new L5RRoller(makeRng(0, 1), '');
    const result = roller.roll(new DicePool(1, 1));

    expect(result.length).toBe(2);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.FAILURE);
    expect(result[1].die).toBe(Dice.SKILL);
    expect(result[1].face).toBe(Faces.FAILURE);
});

test('should roll a skill 1', () => {
    const roller = new L5RRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.FAILURE);
});

test('should roll a skill 2', () => {
    const roller = new L5RRoller(makeRng(1), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.FAILURE);
});

test('should roll a skill 3', () => {
    const roller = new L5RRoller(makeRng(2), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.SUCCESS);
});

test('should roll a skill 4', () => {
    const roller = new L5RRoller(makeRng(3), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.SUCCESS);
});

test('should roll a skill 5', () => {
    const roller = new L5RRoller(makeRng(4), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.SUCCESS_OPPORTUNITY);
});

test('should roll a skill 6', () => {
    const roller = new L5RRoller(makeRng(5), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.SUCCESS_STRIFE);
});

test('should roll a skill 7', () => {
    const roller = new L5RRoller(makeRng(6), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.SUCCESS_STRIFE);
});

test('should roll a skill 8', () => {
    const roller = new L5RRoller(makeRng(7, 9), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.EXPLODING);
});

test('should roll a skill 9', () => {
    const roller = new L5RRoller(makeRng(8, 7, 9), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.EXPLODING_STRIFE);
});

test('should roll a skill 10', () => {
    const roller = new L5RRoller(makeRng(9), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].face).toBe(Faces.OPPORTUNITY);
});

test('should roll a skill 11', () => {
    const roller = new L5RRoller(makeRng(10), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.OPPORTUNITY);
});

test('should roll a skill 12', () => {
    const roller = new L5RRoller(makeRng(11), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SKILL);
    expect(result[0].face).toBe(Faces.OPPORTUNITY);
});

test('should count results', () => {
    const roller = new L5RRoller(makeRng(0, 2, 4, 5, 7, 0, 8, 0, 9), '');
    const result = roller.roll(new DicePool(0, 7));
    const count = interpretResult(roller.combineRolls(result));

    expect(count.exploding).toBe(2);
    expect(count.strife).toBe(2);
    expect(count.successes).toBe(5);
    expect(count.failures).toBe(2);
    expect(count.opportunity).toBe(1);
});

test('it should re-roll a result', () => {
    const keptDice = [new Roll(Dice.RING, Faces.SUCCESS)];
    const reRollDice = [new Roll(Dice.SKILL, Faces.OPPORTUNITY)];
    const roller = new L5RRoller(makeRng(0), '');
    const result = roller.reRoll(keptDice, reRollDice);

    expect(result.length).toBe(2);
    expect(result[0].die).toBe(Dice.RING);
    expect(result[0].face).toBe(Faces.SUCCESS);
    expect(result[1].die).toBe(Dice.SKILL);
    expect(result[1].face).toBe(Faces.FAILURE);
});
