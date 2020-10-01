import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    FEAT,
    SUCCESS,
    SHADOW,
    TIRED,
}

export enum Faces {
    EYE,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    GANDALF,
    ONESUC,
    TWOSUC,
    THREESUC,
    FOURSUC,
    FIVESUC,
    SIXSUC,
    TIRED,
    SHADOW,
}

export const FEAT_ROLL_TABLE: Faces[] = [
    Faces.EYE,
    Faces.ONE,
    Faces.TWO,
    Faces.THREE,
    Faces.FOUR,
    Faces.FIVE,
    Faces.SIX,
    Faces.SEVEN,
    Faces.EIGHT,
    Faces.NINE,
    Faces.TEN,
    Faces.GANDALF,
];

export const SUCCESS_ROLL_TABLE: Faces[] = [
    Faces.ONESUC,
    Faces.TWOSUC,
    Faces.THREESUC,
    Faces.FOURSUC,
    Faces.FIVESUC,
    Faces.SIXSUC,
];

export const TIRED_ROLL_TABLE: Faces[] = [
    Faces.TIRED,
];

export const SHADOW_ROLL_TABLE: Faces[] = [
    Faces.SHADOW,
];

export class DicePool {
    constructor(
        public feat: number = 1,
        public success: number = 0,
        public shadow: number = 0,
        public tired: number = 0,
    ) {
    }

    public toString(): string {
        return `Success Dice: ${this.success} ${this.tired ? 'Tired' : ''} ${this.shadow ? 'For the Shadow' : ''}`;
    }
}

export class RollValues {
    constructor(
        public total: number = 0,
        public tiredtotal: number = 0,
        public gandalf: number = 0,
        public eye: number = 0,
        public great: number = 0,
        public tired: number = 0,
        public shadow: number = 0,
    ) {
    }
}

const featImages = new Map<Faces, string>();
featImages.set(Faces.EYE, 'eye');
featImages.set(Faces.GANDALF, 'gandalf');
featImages.set(Faces.ONE, 'one');
featImages.set(Faces.TWO, 'two');
featImages.set(Faces.THREE, 'three');
featImages.set(Faces.FOUR, 'four');
featImages.set(Faces.FIVE, 'five');
featImages.set(Faces.SIX, 'six');
featImages.set(Faces.SEVEN, 'seven');
featImages.set(Faces.EIGHT, 'eight');
featImages.set(Faces.NINE, 'nine');
featImages.set(Faces.TEN, 'ten');

const successImages = new Map<Faces, string>();
successImages.set(Faces.ONESUC, 'onesuc');
successImages.set(Faces.TWOSUC, 'twosuc');
successImages.set(Faces.THREESUC, 'threesuc');
successImages.set(Faces.FOURSUC, 'foursuc');
successImages.set(Faces.FIVESUC, 'fivesuc');
successImages.set(Faces.SIXSUC, 'sixsuc');

const shadowImages = new Map<Faces, string>();
shadowImages.set(Faces.SHADOW, 'shadow');

const tiredImages = new Map<Faces, string>();
tiredImages.set(Faces.TIRED, 'tired');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.FEAT, featImages);
dieRollImages.set(Dice.SUCCESS, successImages);
dieRollImages.set(Dice.SHADOW, shadowImages);
dieRollImages.set(Dice.TIRED, tiredImages);

const rollToRollResultMapping = new Map<Faces, Partial<RollValues>>();
rollToRollResultMapping.set(Faces.EYE, {eye: 1});
rollToRollResultMapping.set(Faces.GANDALF, {gandalf: 1});
rollToRollResultMapping.set(Faces.ONE, {total: 1, tiredtotal: 1});
rollToRollResultMapping.set(Faces.TWO, {total: 2, tiredtotal: 2});
rollToRollResultMapping.set(Faces.THREE, {total: 3, tiredtotal: 3});
rollToRollResultMapping.set(Faces.FOUR, {total: 4, tiredtotal: 4});
rollToRollResultMapping.set(Faces.FIVE, {total: 5, tiredtotal: 5});
rollToRollResultMapping.set(Faces.SIX, {total: 6, tiredtotal: 6});
rollToRollResultMapping.set(Faces.SEVEN, {total: 7, tiredtotal: 7});
rollToRollResultMapping.set(Faces.EIGHT, {total: 8, tiredtotal: 8});
rollToRollResultMapping.set(Faces.NINE, {total: 9, tiredtotal: 9});
rollToRollResultMapping.set(Faces.TEN, {total: 10, tiredtotal: 10});
rollToRollResultMapping.set(Faces.ONESUC, {total: 1});
rollToRollResultMapping.set(Faces.TWOSUC, {total: 2});
rollToRollResultMapping.set(Faces.THREESUC, {total: 3});
rollToRollResultMapping.set(Faces.FOURSUC, {total: 4, tiredtotal: 4});
rollToRollResultMapping.set(Faces.FIVESUC, {total: 5, tiredtotal: 5});
rollToRollResultMapping.set(Faces.SIXSUC, {total: 6, tiredtotal: 6, great: 1});
rollToRollResultMapping.set(Faces.SHADOW, {shadow: 1});
rollToRollResultMapping.set(Faces.TIRED, {tired: 1});

export function parseRollValues(roll: Roll<Dice, Faces>): RollValues {
    const result = rollToRollResultMapping.get(roll.face);
    if (result !== undefined) {
        return toRollResult(result);
    } else {
        throw new Error(`Unhandled Face ${roll.face}`);
    }
}

export function toRollResult(partial: Partial<RollValues>): RollValues {
    return Object.assign(new RollValues(), partial);
}

export class InterpretedResult {
    constructor(
        public autosuccess: boolean = false,
        public total: number = 0,
        public great: number = 0,
        public adversary: boolean = false,
        public tired: boolean = false,
    ) {
    }
}

export function interpretResult(result: RollValues): InterpretedResult {
    const autosuccess = !!((result.gandalf && !result.shadow) || (result.eye && result.shadow));
    const total = result.tired ? result.tiredtotal : result.total;
    return new InterpretedResult(
        autosuccess,
        total,
        result.great,
        !!result.shadow,
        !!result.tired,
    );
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.total + roll2.total,
        roll1.tiredtotal + roll2.tiredtotal,
        roll1.gandalf + roll2.gandalf,
        roll1.eye + roll2.eye,
        roll1.great + roll2.great,
        roll1.tired + roll2.tired,
        roll1.shadow + roll2.shadow,
    ),
};

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        1,
        roll1.success + roll2.success,
        roll1.shadow + roll2.shadow,
        roll1.tired + roll2.tired,
    ),
};
