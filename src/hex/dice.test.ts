import {getDieImage} from '../images';
import {Roll} from '../roller';
import {Dice, dieRollImages, Faces, interpretResult, toRollResult} from './dice';

test('no roll', () => {
    const rollResult = toRollResult({});
    const result = interpretResult(rollResult);

    expect(result.ERFOLGE).toBe(0);
    expect(result.ESPRIT).toBe(0);
    expect(result.BLUT).toBe(0);
    expect(result.ELIXIR).toBe(0);
    expect(result.FLUCH).toBe(0);
});

test('should interpret results', () => {
    const rollResult = toRollResult({
        ERFOLGE: 7,
        ESPRIT: 3,
        BLUT: 3,
        ELIXIR: 5,
        FLUCH: 2,
    });
    const result = interpretResult(rollResult);

    expect(result.ERFOLGE).toBe(7);
    expect(result.ESPRIT).toBe(3);
    expect(result.BLUT).toBe(3);
    expect(result.ELIXIR).toBe(5);
    expect(result.FLUCH).toBe(2);
});

test('should get a Espritstern dice image', () => {
    const roll = new Roll(Dice.HEXXEN, Faces.ESPRITSTERN);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('hesprit');
});

test('should get a blank dice image', () => {
    const roll = new Roll(Dice.HEXXEN, Faces.LEER);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('hblank');
});

test('should get a Raven dice image', () => {
    const roll = new Roll(Dice.HEXXEN, Faces.ERFOLG);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('herfolg');
});

test('should get a blank dice image', () => {
    const roll = new Roll(Dice.BONUS, Faces.LEER);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('jblank');
});

test('should get a Januskopf dice image', () => {
    const roll = new Roll(Dice.BONUS, Faces.BONUS);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('jdoppelkopf');
});

test('should get a blank dice image', () => {
    const roll = new Roll(Dice.MALUS, Faces.LEER);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('jblank');
});

test('should get a Januskopf dice image', () => {
    const roll = new Roll(Dice.MALUS, Faces.MALUS);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('jdoppelkopf');
});

test('should get a Espritstern dice image', () => {
    const roll = new Roll(Dice.SEGNUNG, Faces.ESPRITSTERN);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('sesprit');
});

test('should get a blank dice image', () => {
    const roll = new Roll(Dice.SEGNUNG, Faces.LEER);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('sblank');
});

test('should get a Rabenkopf dice image', () => {
    const roll = new Roll(Dice.SEGNUNG, Faces.ERFOLG);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('serfolg');
});

test('should get a Doppelrabenkopf dice image', () => {
    const roll = new Roll(Dice.SEGNUNG, Faces.DOPPELERFOLG);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('sdoppelerfolg');
});

test('should get a blank dice image', () => {
    const roll = new Roll(Dice.BLUT, Faces.LEER);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('bblank');
});

test('should get a Ein Blutstropfen dice image', () => {
    const roll = new Roll(Dice.BLUT, Faces.BLUT_EINS);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('beins');
});

test('should get a Zwei Blutstropfen dice image', () => {
    const roll = new Roll(Dice.BLUT, Faces.BLUT_ZWEI);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('bzwei');
});

test('should get a Drei Blutstropfen dice image', () => {
    const roll = new Roll(Dice.BLUT, Faces.BLUT_DREI);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('bdrei');
});

test('should get a Ein Elixir dice image', () => {
    const roll = new Roll(Dice.ELIXIR, Faces.ELIXIR_EINS);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('eeins');
});

test('should get a Zwei Elixire dice image', () => {
    const roll = new Roll(Dice.ELIXIR, Faces.ELIXIR_ZWEI);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('ezwei');
});

test('should get a Drei Elixire dice image', () => {
    const roll = new Roll(Dice.ELIXIR, Faces.ELIXIR_DREI);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('edrei');
});

test('should get a Vier Elixire dice image', () => {
    const roll = new Roll(Dice.ELIXIR, Faces.ELIXIR_VIER);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('evier');
});

test('should get a Fünf Elixire dice image', () => {
    const roll = new Roll(Dice.ELIXIR, Faces.ELIXIR_FUENF);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('efuenf');
});

test('should get a Ein Fluch dice image', () => {
    const roll = new Roll(Dice.FLUCH, Faces.FLUCH_EINS);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('feins');
});

test('should get a Zwei Flüche dice image', () => {
    const roll = new Roll(Dice.FLUCH, Faces.FLUCH_ZWEI);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('fzwei');
});

test('should get a Drei Flüche dice image', () => {
    const roll = new Roll(Dice.FLUCH, Faces.FLUCH_DREI);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('fdrei');
});

test('should get a Vier Flüche dice image', () => {
    const roll = new Roll(Dice.FLUCH, Faces.FLUCH_VIER);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('fvier');
});

test('should get a Fünf Flüche dice image', () => {
    const roll = new Roll(Dice.FLUCH, Faces.FLUCH_FUENF);

    expect(getDieImage(dieRollImages, roll.die, roll.face)).toBe('ffuenf');
});
