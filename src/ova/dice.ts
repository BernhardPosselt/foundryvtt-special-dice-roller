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

export function rollToRollResult(roll: Roll<Dice, Faces>): RollValues {
    if (roll.face === Faces.FACE1) {
        return new RollValues(1)
    } else if (roll.face === Faces.FACE2) {
        return new RollValues(0, 1)
    } else if (roll.face === Faces.FACE3) {
        return new RollValues(0, 0, 1)
    } else if (roll.face === Faces.FACE4) {
        return new RollValues(0, 0, 0, 1)
    } else if (roll.face === Faces.FACE5) {
        return new RollValues(0, 0, 0, 0, 1)
    } else if (roll.face === Faces.FACE6) {
        return new RollValues(0, 0, 0, 0, 0, 1)
    } else {
        throw new Error(`Unhandled Face ${roll.face}`);
    }
}

export class InterpretedResult {
    key1: boolean = false
    key2: boolean = false
    key3: boolean = false
    key4: boolean = false
    key5: boolean = false
    key6: boolean = false
    value: number = 0

    constructor(public ones: number = 0, public twos: number = 0, public threes: number = 0,
                public fours: number = 0, public fives: number = 0, public sixes: number = 0,
                public negative: boolean = false) {
        if (!negative) {
            if (ones > this.value) {
                this.value = ones
                this.key1 = true
            }
            if (twos * 2 > this.value) {
                this.value = twos * 2
                this.key1 = false
                this.key2 = true
            }
            if (threes * 3 > this.value) {
                this.value = threes * 3
                this.key1 = false
                this.key2 = false
                this.key3 = true
            }
            if (fours * 4 > this.value) {
                this.value = fours * 4
                this.key1 = false
                this.key2 = false
                this.key3 = false
                this.key4 = true
            }
            if (fives * 5 > this.value) {
                this.value = fives * 5
                this.key1 = false
                this.key2 = false
                this.key3 = false
                this.key4 = false
                this.key5 = true
            }
            if (sixes * 6 > this.value) {
                this.value = sixes * 6
                this.key1 = false
                this.key2 = false
                this.key3 = false
                this.key4 = false
                this.key5 = false
                this.key6 = true
            }
        } else {
            if (ones > 0) {
                this.value = 1
                this.key1 = true
            } else if (twos > 0) {
                this.value = 2
                this.key2 = true
            } else if (threes > 0) {
                this.value = 3
                this.key3 = true
            } else if (fours > 0) {
                this.value = 4
                this.key4 = true
            } else if (fives > 0) {
                this.value = 5
                this.key5 = true
            } else if (sixes > 0) {
                this.value = 6
                this.key6 = true
            }
        }
    }
}


export function interpretResult(result: RollValues, negative: boolean): InterpretedResult {
    return new InterpretedResult(
        result.face1,
        result.face2,
        result.face3,
        result.face4,
        result.face5,
        result.face6,
        negative
    )
}
