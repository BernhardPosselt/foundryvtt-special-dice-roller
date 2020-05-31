import {makeRng} from '../rng';
import {Dice, DicePool, Faces} from './dice';
import {HEXRoller} from './roller';

test('should react to hex command', () => {
    const roller = new HEXRoller(makeRng(0), 'hex');
    expect(roller.handlesCommand('/hex ')).toBe(true);
});

test('should roll hex command', () => {
    let roller;
    roller = new HEXRoller(makeRng(0, 0, 0, 0), 'hex');
    expect(roller.rollCommand('/hex 4h')).toBeTruthy();
    roller = new HEXRoller(makeRng(0, 0, 0, 0), 'hex');
    expect(roller.rollCommand('/hex 4h # myFlavourText')).toContain('myFlavourText');
});

test('should roll a Espritstern on a HeXXen die', () => {
    const roller = new HEXRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.HEXXEN);
    expect(result[0].face).toBe(Faces.ESPRITSTERN);
});

test('should roll a blank side on a HeXXen die', () => {
    const roller = new HEXRoller(makeRng(1), '');
    const result = roller.roll(new DicePool(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.HEXXEN);
    expect(result[0].face).toBe(Faces.LEER);
});

test('should roll a Erfolg on a HeXXen die', () => {
    const roller = new HEXRoller(makeRng(4), '');
    const result = roller.roll(new DicePool(1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.HEXXEN);
    expect(result[0].face).toBe(Faces.ERFOLG);
});

test('should roll a blank side on a good Janus die', () => {
    const roller = new HEXRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.BONUS);
    expect(result[0].face).toBe(Faces.LEER);
});

test('should roll a Erfolg on a good Janus die', () => {
    const roller = new HEXRoller(makeRng(3), '');
    const result = roller.roll(new DicePool(0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.BONUS);
    expect(result[0].face).toBe(Faces.BONUS);
});

test('should roll a blank side on a bad Janus die', () => {
    const roller = new HEXRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.MALUS);
    expect(result[0].face).toBe(Faces.LEER);
});

test('should roll a negative Erfolg on a bad Janus die', () => {
    const roller = new HEXRoller(makeRng(3), '');
    const result = roller.roll(new DicePool(0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.MALUS);
    expect(result[0].face).toBe(Faces.MALUS);
});

test('should roll a Espritstern on a Segnung die', () => {
    const roller = new HEXRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SEGNUNG);
    expect(result[0].face).toBe(Faces.ESPRITSTERN);
});

test('should roll a blank side on a Segnung die', () => {
    const roller = new HEXRoller(makeRng(2), '');
    const result = roller.roll(new DicePool(0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SEGNUNG);
    expect(result[0].face).toBe(Faces.LEER);
});

test('should roll a Erfolg on a Segnung die', () => {
    const roller = new HEXRoller(makeRng(3), '');
    const result = roller.roll(new DicePool(0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SEGNUNG);
    expect(result[0].face).toBe(Faces.ERFOLG);
});

test('should roll a Doppelerfolg on a Segnung die', () => {
    const roller = new HEXRoller(makeRng(5), '');
    const result = roller.roll(new DicePool(0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.SEGNUNG);
    expect(result[0].face).toBe(Faces.DOPPELERFOLG);
});

test('should roll a blank side on a Blut die', () => {
    const roller = new HEXRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.BLUT);
    expect(result[0].face).toBe(Faces.LEER);
});

test('should roll a singe Blutstropfen on a Blut die', () => {
    const roller = new HEXRoller(makeRng(1), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.BLUT);
    expect(result[0].face).toBe(Faces.BLUT_EINS);
});

test('should roll a double Blutstropfen on a Blut die', () => {
    const roller = new HEXRoller(makeRng(3), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.BLUT);
    expect(result[0].face).toBe(Faces.BLUT_ZWEI);
});

test('should roll a triple Blutstropfen on a Blut die', () => {
    const roller = new HEXRoller(makeRng(5), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.BLUT);
    expect(result[0].face).toBe(Faces.BLUT_DREI);
});

test('should roll a single Elixir on a Elixir die', () => {
    const roller = new HEXRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.ELIXIR);
    expect(result[0].face).toBe(Faces.ELIXIR_EINS);
});

test('should roll a double Elixir on a Elixir die', () => {
    const roller = new HEXRoller(makeRng(1), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.ELIXIR);
    expect(result[0].face).toBe(Faces.ELIXIR_ZWEI);
});

test('should roll a triple Elixir on a Elixir die', () => {
    const roller = new HEXRoller(makeRng(2), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.ELIXIR);
    expect(result[0].face).toBe(Faces.ELIXIR_DREI);
});

test('should roll a quadruple Elixir on a Elixir die', () => {
    const roller = new HEXRoller(makeRng(3), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.ELIXIR);
    expect(result[0].face).toBe(Faces.ELIXIR_VIER);
});

test('should roll a five time Elixir on a Elixir die', () => {
    const roller = new HEXRoller(makeRng(4), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.ELIXIR);
    expect(result[0].face).toBe(Faces.ELIXIR_FUENF);
});

test('should roll a single Fluch on a Fluch die', () => {
    const roller = new HEXRoller(makeRng(0), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.FLUCH);
    expect(result[0].face).toBe(Faces.FLUCH_EINS);
});

test('should roll a double Fluch on a Fluch die', () => {
    const roller = new HEXRoller(makeRng(1), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.FLUCH);
    expect(result[0].face).toBe(Faces.FLUCH_ZWEI);
});

test('should roll a triple Fluch on a Fluch die', () => {
    const roller = new HEXRoller(makeRng(2), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.FLUCH);
    expect(result[0].face).toBe(Faces.FLUCH_DREI);
});

test('should roll a quadruple Fluch on a Fluch die', () => {
    const roller = new HEXRoller(makeRng(3), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.FLUCH);
    expect(result[0].face).toBe(Faces.FLUCH_VIER);
});

test('should roll a five time Fluch on a Fluch die', () => {
    const roller = new HEXRoller(makeRng(4), '');
    const result = roller.roll(new DicePool(0, 0, 0, 0, 0, 0, 1));

    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.FLUCH);
    expect(result[0].face).toBe(Faces.FLUCH_FUENF);
});

test('should roll a Erfolg and a Januskopf', () => {
    const roller = new HEXRoller(makeRng(5, 5), '');
    const result = roller.roll(new DicePool(1, 1));

    expect(result.length).toBe(2);
    expect(result[0].die).toBe(Dice.HEXXEN);
    expect(result[0].face).toBe(Faces.ERFOLG);
    expect(result[1].die).toBe(Dice.BONUS);
    expect(result[1].face).toBe(Faces.BONUS);
});

test('should roll a Espritstern and two Blutstropfen', () => {
    const roller = new HEXRoller(makeRng(0, 3), '');
    const result = roller.roll(new DicePool(1, 0, 0, 0, 1));

    expect(result.length).toBe(2);
    expect(result[0].die).toBe(Dice.HEXXEN);
    expect(result[0].face).toBe(Faces.ESPRITSTERN);
    expect(result[1].die).toBe(Dice.BLUT);
    expect(result[1].face).toBe(Faces.BLUT_ZWEI);
});

test('should clear Bonus vs. Malus', () => {
    let roller = new HEXRoller(makeRng(0, 3), '');
    let result = roller.roll(new DicePool(0, 3, 2));
    expect(result.length).toBe(1);
    expect(result[0].die).toBe(Dice.BONUS);

    roller = new HEXRoller(makeRng(0, 3), '');
    result = roller.roll(new DicePool(0, 2, 4));
    expect(result.length).toBe(2);
    expect(result[0].die).toBe(Dice.MALUS);
    expect(result[1].die).toBe(Dice.MALUS);
});
