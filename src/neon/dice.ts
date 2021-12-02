import { IMonoid } from '../lang';
import { Roll } from '../roller';

export enum Dice {
    ACTION,
    DANGER,
    ACTION_CANCELLED,
    DANGER_CANCELLED,
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

const actionCancelledImages = new Map<Faces, string>();
actionCancelledImages.set(Faces.ONE, 'actioncancelled1');
actionCancelledImages.set(Faces.TWO, 'actioncancelled2');
actionCancelledImages.set(Faces.THREE, 'actioncancelled3');
actionCancelledImages.set(Faces.FOUR, 'actioncancelled4');
actionCancelledImages.set(Faces.FIVE, 'actioncancelled5');
actionCancelledImages.set(Faces.SIX, 'actioncancelled6');

const dangerCancelledImages = new Map<Faces, string>();
dangerCancelledImages.set(Faces.ONE, 'dangercancelled1');
dangerCancelledImages.set(Faces.TWO, 'dangercancelled2');
dangerCancelledImages.set(Faces.THREE, 'dangercancelled3');
dangerCancelledImages.set(Faces.FOUR, 'dangercancelled4');
dangerCancelledImages.set(Faces.FIVE, 'dangercancelled5');
dangerCancelledImages.set(Faces.SIX, 'dangercancelled6');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.ACTION, actionImages);
dieRollImages.set(Dice.DANGER, dangerImages);
dieRollImages.set(Dice.ACTION_CANCELLED, actionCancelledImages);
dieRollImages.set(Dice.DANGER_CANCELLED, dangerCancelledImages);

export class DicePool {
    constructor(
        public action: number = 0,
        public danger: number = 0,
    ) {
    }

    public toString(): string {
        return `action: ${this.action}, danger: ${this.danger}`;
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
    constructor(public action: number[] = [], public danger: number[] = [], public stricken: number[] = []) {
    }
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.action.concat(roll2.action),
        roll1.danger.concat(roll2.danger),
        roll1.stricken.concat(roll2.stricken),
    ),
};

export function rollToRollResult(roll: Roll<Dice, Faces>): RollValues {
    const value = FACES_TO_VALUES.get(roll.face) ?? 0;

    switch (roll.die) {
        case Dice.ACTION:
            return new RollValues([value], [0]);
        case Dice.DANGER:
            return new RollValues([0], [value]);
        case Dice.ACTION_CANCELLED:
        case Dice.DANGER_CANCELLED:
            return new RollValues([0], [0], [value]);
        default:
            throw new Error(`Unhandled roll ${roll.die}.${roll.face}`);
    }
}

export function strikeRolls(rolls: Roll<Dice, Faces>[]): Roll<Dice, Faces>[]
{
    const indexedRolls: {action: Roll<Dice, Faces>[], danger: Roll<Dice, Faces>[]} = {
        action: [],
        danger: [],
    };

    rolls.forEach((roll) => {
        switch (roll.die) {
            case Dice.ACTION:
                indexedRolls.action.push(roll);
                break;

            case Dice.DANGER:
                indexedRolls.danger.push(roll);
                break;
        }
    });

    const strickenDangerRolls = indexedRolls.danger.filter(dangerRoll => indexedRolls.action.find(actionRoll => dangerRoll.face === actionRoll.face));

    strickenDangerRolls.forEach(strickenRoll => {
        indexedRolls.action.splice(indexedRolls.action.findIndex(actionRoll => strickenRoll.face === actionRoll.face), 1);
        indexedRolls.danger.splice(indexedRolls.danger.findIndex(dangerRoll => strickenRoll.face === dangerRoll.face), 1);
    });

    const strickenActionRolls: Roll<Dice, Faces>[] = [];
    strickenDangerRolls.forEach(roll => {
        roll.die = Dice.DANGER_CANCELLED;
        strickenActionRolls.push({
            die: Dice.ACTION_CANCELLED,
            face: roll.face,
            wasReRoll: false
        });
    });

    const actionRolls = [...indexedRolls.action, ...strickenActionRolls].sort((a, b) => a.face > b.face ? -1 : 1);
    const dangerRolls = [...indexedRolls.danger, ...strickenDangerRolls].sort((a, b) => a.face > b.face ? -1 : 1);

    return [...actionRolls, ...dangerRolls];
}

export class InterpretedResult {
    constructor(
        public state: string,
        public stateClass: string,
        public highestAction: number,
        public boons: number = 0,
    ) {
    }
}

export function interpretResult(result: RollValues): InterpretedResult {
    const actionRolls = result.action.filter(roll => roll > 0).sort((a, b) => a > b ? -1 : 0);

    console.log(actionRolls);

    if (actionRolls.filter(roll => roll === 6).length > 1) {
        return new InterpretedResult(
            `Critical Success`,
            'rainbow',
            6,
            actionRolls.filter(roll => roll === 6).length - 1,
        );
    }

    if (actionRolls.length === 0) {
        return new InterpretedResult(
            'Botch',
            'botch',
            0,
        );
    }

    if (actionRolls[0] === 6) {
        return new InterpretedResult(
            'Success',
            'success',
            6,
        );
    }

    if (actionRolls[0] > 3) {
        return new InterpretedResult(
            'Partial Success',
            'success',
            actionRolls[0],
        );
    }

    if (actionRolls[0] > 1) {
        return new InterpretedResult(
            'Failure',
            'botch',
            actionRolls[0],
        );
    }

    if (actionRolls[0] === 1) {
        return new InterpretedResult(
            'Botch',
            'botch',
            1,
        );
    }

    return new InterpretedResult(
        'Nobody expects the spanish inquisition!',
        'rainbow',
        Number.POSITIVE_INFINITY,
    );
}