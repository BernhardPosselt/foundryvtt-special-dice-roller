import { IMonoid } from '../lang';
import { Roll } from '../roller';

export enum Dice {
    ACTION,
    DANGER,
}

export enum Faces {
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
}

const FACES_TO_VALUES = new Map<Faces, number>();
FACES_TO_VALUES.set(Faces.ONE, 1);
FACES_TO_VALUES.set(Faces.TWO, 2);
FACES_TO_VALUES.set(Faces.THREE, 3);
FACES_TO_VALUES.set(Faces.FOUR, 4);
FACES_TO_VALUES.set(Faces.FIVE, 5);
FACES_TO_VALUES.set(Faces.SIX, 6);

export const ACTION_ROLL_TABLE: Faces[] = [
    Faces.ONE,
    Faces.TWO,
    Faces.THREE,
    Faces.FOUR,
    Faces.FIVE,
    Faces.SIX,
];

export const DANGER_ROLL_TABLE: Faces[] = [
    Faces.ONE,
    Faces.TWO,
    Faces.THREE,
    Faces.FOUR,
    Faces.FIVE,
    Faces.SIX,
];

const actionImages = new Map<Faces, string>();
actionImages.set(Faces.ONE, 'action1');
actionImages.set(Faces.TWO, 'action2');
actionImages.set(Faces.THREE, 'action3');
actionImages.set(Faces.FOUR, 'action4');
actionImages.set(Faces.FIVE, 'action5');
actionImages.set(Faces.SIX, 'action6');

const dangerImages = new Map<Faces, string>();
dangerImages.set(Faces.ONE, 'danger1');
dangerImages.set(Faces.TWO, 'danger2');
dangerImages.set(Faces.THREE, 'danger3');
dangerImages.set(Faces.FOUR, 'danger4');
dangerImages.set(Faces.FIVE, 'danger5');
dangerImages.set(Faces.SIX, 'danger6');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.ACTION, actionImages);
dieRollImages.set(Dice.DANGER, dangerImages);

export class DicePool {
    constructor(
        public action: number = 0,
        public danger: number = 0,
    ) {
    }

    public toString(): string {
        return `actions: ${this.action}, hunger: ${this.danger}`;
    }
}

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.action + roll2.action,
        roll1.danger + roll2.danger,
    ),
};

export class RollValues {
    constructor(public action: number = 0, public danger: number = 0) {
    }
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.action + roll2.action,
        roll1.danger + roll2.danger,
    ),
};

export function rollToRollResult(roll: Roll<Dice, Faces>): RollValues {
    const value = FACES_TO_VALUES.get(roll.face);

    switch (roll.die) {
        case Dice.ACTION:
            return new RollValues(value, 0);
        case Dice.DANGER:
            return new RollValues(0, value);
        default:
            throw new Error(`Unhandled roll ${roll.die}.${roll.face}`);
    }
}

export class InterpretedResult {
    constructor(public action: number = 0, public danger: number = 0) {
    }
}

export function interpretResult(result: RollValues): InterpretedResult {
    return new InterpretedResult(
        result.action,
        result.danger,
    );
}