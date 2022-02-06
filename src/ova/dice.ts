import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    D6
}

export enum Faces {
    FACE1,
    FACE2,
    FACE3,
    FACE4,
    FACE5,
    FACE6
}

export const D6_ROLL_TABLE: Faces[] = [
    Faces.FACE1,
    Faces.FACE2,
    Faces.FACE3,
    Faces.FACE4,
    Faces.FACE5,
    Faces.FACE6
];

const d6Images = new Map<Faces, string>();
d6Images.set(Faces.FACE1, 'ova-1');
d6Images.set(Faces.FACE2, 'ova-2');
d6Images.set(Faces.FACE3, 'ova-3');
d6Images.set(Faces.FACE4, 'ova-4');
d6Images.set(Faces.FACE5, 'ova-5');
d6Images.set(Faces.FACE6, 'ova-6');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.D6, d6Images)

export class DicePool {
    constructor(public d6: number = 0) {
    }
}

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.d6 + roll2.d6
    ),
};

export class RollValues {
    constructor(public face1: number = 0, public face2: number = 0, public face3: number = 0,
                public face4: number = 0, public face5: number = 0, public face6: number = 0) {
    }
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.face1 + roll2.face1,
        roll1.face2 + roll2.face2,
        roll1.face3 + roll2.face3,
        roll1.face4 + roll2.face4,
        roll1.face5 + roll2.face5,
        roll1.face6 + roll2.face6,
    ),
};

const rollToRollResultMapping = new Map<Faces, Partial<RollValues>>();
rollToRollResultMapping.set(Faces.FACE1, {face1: 1});
rollToRollResultMapping.set(Faces.FACE2, {face2: 1});
rollToRollResultMapping.set(Faces.FACE3, {face3: 1});
rollToRollResultMapping.set(Faces.FACE4, {face4: 1});
rollToRollResultMapping.set(Faces.FACE5, {face5: 1});
rollToRollResultMapping.set(Faces.FACE6, {face6: 1});

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
        public value: number = 0,
        public key1: boolean = false,
        public key2: boolean = false,
        public key3: boolean = false,
        public key4: boolean = false,
        public key5: boolean = false,
        public key6: boolean = false,
        public negative: boolean = false
    ) {
    }
}


export function interpretResult(result: RollValues, negative: boolean): InterpretedResult {
    let value: number = 0;
    let key1: boolean = false
    let key2: boolean = false
    let key3: boolean = false
    let key4: boolean = false
    let key5: boolean = false
    let key6: boolean = false

    if (!negative) {
        if (result.face1 >= value) {
            value = result.face1
            key1 = true
        }
        if (result.face2 * 2 >= value) {
            value = result.face2 * 2
            key1 = false
            key2 = true
        }
        if (result.face3 * 3 >= value) {
            value = result.face3 * 3
            key1 = false
            key2 = false
            key3 = true
        }
        if (result.face4 * 4 >= value) {
            value = result.face4 * 4
            key1 = false
            key2 = false
            key3 = false
            key4 = true
        }
        if (result.face5 * 5 >= value) {
            value = result.face5 * 5
            key1 = false
            key2 = false
            key3 = false
            key4 = false
            key5 = true
        }
        if (result.face6 * 6 >= value) {
            value = result.face6 * 6
            key1 = false
            key2 = false
            key3 = false
            key4 = false
            key5 = false
            key6 = true
        }
    } else {
        if (result.face1 > 0) {
            value = 1
            key1 = true
        } else if (result.face2 > 0) {
            value = 2
            key2 = true
        } else if (result.face3 > 0) {
            value = 3
            key3 = true
        } else if (result.face4 > 0) {
            value = 4
            key4 = true
        } else if (result.face5 > 0) {
            value = 5
            key5 = true
        } else if (result.face6 > 0) {
            value = 6
            key6 = true
        }
    }
    return new InterpretedResult(
        value,
        key1,
        key2,
        key3,
        key4,
        key5,
        key6,
        negative
    );
}
