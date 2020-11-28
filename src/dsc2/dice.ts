import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    GREEN,
    BLACK,
    BLUE,
    BROWN,
    RED,
    GREY,
    YELLOW,
}

export enum Faces {
    RANGE1_DAMAGE1_SURGE1,
    RANGE1_DAMAGE1,
    RANGE1_SURGE1,
    DAMAGE1_SURGE1,
    SURGE1,
    DAMAGE1,
    SHIELD0,
    SHIELD1,
    SHIELD2,
    SHIELD3,
    SHIELD4,
    MISS,
    RANGE6_DAMAGE1_SURGE1,
    RANGE4_DAMAGE2,
    RANGE2_DAMAGE2_SURGE1,
    RANGE3_DAMAGE2,
    RANGE5_DAMAGE1,
    DAMAGE2,
    DAMAGE3_SURGE1,
    DAMAGE3,
    RANGE2_DAMAGE1,
    SURGE1_DAMAGE2,
}

export const GREEN_ROLL_TABLE: Faces[] = [
    Faces.RANGE1_DAMAGE1_SURGE1,
    Faces.RANGE1_DAMAGE1,
    Faces.RANGE1_SURGE1,
    Faces.DAMAGE1_SURGE1,
    Faces.SURGE1,
    Faces.DAMAGE1,
];

export const BLUE_ROLL_TABLE: Faces[] = [
    Faces.MISS,
    Faces.RANGE6_DAMAGE1_SURGE1,
    Faces.RANGE4_DAMAGE2,
    Faces.RANGE2_DAMAGE2_SURGE1,
    Faces.RANGE3_DAMAGE2,
    Faces.RANGE5_DAMAGE1,
];

export const RED_ROLL_TABLE: Faces[] = [
    Faces.DAMAGE1,
    Faces.DAMAGE2,
    Faces.DAMAGE2,
    Faces.DAMAGE2,
    Faces.DAMAGE3,
    Faces.DAMAGE3_SURGE1,
];

export const YELLOW_ROLL_TABLE: Faces[] = [
    Faces.RANGE1_DAMAGE1,
    Faces.RANGE2_DAMAGE1,
    Faces.DAMAGE1_SURGE1,
    Faces.RANGE1_SURGE1,
    Faces.SURGE1_DAMAGE2,
    Faces.DAMAGE2,
];

export const BROWN_ROLL_TABLE: Faces[] = [
    Faces.SHIELD0,
    Faces.SHIELD0,
    Faces.SHIELD0,
    Faces.SHIELD1,
    Faces.SHIELD1,
    Faces.SHIELD2,
];

export const GREY_ROLL_TABLE: Faces[] = [
    Faces.SHIELD0,
    Faces.SHIELD1,
    Faces.SHIELD1,
    Faces.SHIELD1,
    Faces.SHIELD2,
    Faces.SHIELD3,
];

export const BLACK_ROLL_TABLE: Faces[] = [
    Faces.SHIELD0,
    Faces.SHIELD2,
    Faces.SHIELD2,
    Faces.SHIELD2,
    Faces.SHIELD3,
    Faces.SHIELD4,
];


export class DicePool {
    constructor(
        public green: number = 0,
        public blue: number = 0,
        public red: number = 0,
        public yellow: number = 0,
        public brown: number = 0,
        public grey: number = 0,
        public black: number = 0,
    ) {
    }

    public toString(): string {
        return `green: ${this.green}, blue: ${this.blue}, red: ${this.red}, yellow: ${this.yellow}, brown: ${this.brown}, grey: ${this.grey}, black: ${this.black}`;
    }
}

export class RollValues {
    constructor(
        public range: number = 0,
        public shield: number = 0,
        public surge: number = 0,
        public damage: number = 0,
        public miss: boolean = false,
    ) {
    }
}

const greenImages = new Map<Faces, string>();
greenImages.set(Faces.RANGE1_DAMAGE1_SURGE1, 'g1.jpg');
greenImages.set(Faces.RANGE1_DAMAGE1, 'g2.jpg');
greenImages.set(Faces.RANGE1_SURGE1, 'g3.jpg');
greenImages.set(Faces.DAMAGE1_SURGE1, 'g4.jpg');
greenImages.set(Faces.SURGE1, 'g5.jpg');
greenImages.set(Faces.DAMAGE1, 'g6.jpg');

const blueImages = new Map<Faces, string>();
blueImages.set(Faces.MISS, 'b1.png');
blueImages.set(Faces.RANGE6_DAMAGE1_SURGE1, 'b2.png');
blueImages.set(Faces.RANGE4_DAMAGE2, 'b3.png');
blueImages.set(Faces.RANGE2_DAMAGE2_SURGE1, 'b4.png');
blueImages.set(Faces.RANGE3_DAMAGE2, 'b5.png');
blueImages.set(Faces.RANGE5_DAMAGE1, 'b6.png');

const redImages = new Map<Faces, string>();
redImages.set(Faces.DAMAGE1, 'r1.png');
redImages.set(Faces.DAMAGE2, 'r2.png');
redImages.set(Faces.DAMAGE3, 'r3.png');
redImages.set(Faces.DAMAGE3_SURGE1, 'r3s.png');

const yellowImages = new Map<Faces, string>();
yellowImages.set(Faces.RANGE1_DAMAGE1, 'y1.png');
yellowImages.set(Faces.RANGE2_DAMAGE1, 'y2.png');
yellowImages.set(Faces.DAMAGE1_SURGE1, 'y3.png');
yellowImages.set(Faces.RANGE1_SURGE1, 'y4.png');
yellowImages.set(Faces.SURGE1_DAMAGE2, 'y5.png');
yellowImages.set(Faces.DAMAGE2, 'y6.png');

const brownImages = new Map<Faces, string>();
brownImages.set(Faces.SHIELD0, 'br0.png');
brownImages.set(Faces.SHIELD1, 'br1.png');
brownImages.set(Faces.SHIELD2, 'br2.png');

const greyImages = new Map<Faces, string>();
greyImages.set(Faces.SHIELD0, 'g0.png');
greyImages.set(Faces.SHIELD1, 'g1.png');
greyImages.set(Faces.SHIELD2, 'g2.png');
greyImages.set(Faces.SHIELD3, 'g3.png');

const blackImages = new Map<Faces, string>();
blackImages.set(Faces.SHIELD0, 'black0.png');
blackImages.set(Faces.SHIELD2, 'black2.png');
blackImages.set(Faces.SHIELD3, 'black3.png');
blackImages.set(Faces.SHIELD4, 'black4.png');


export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.GREEN, greenImages);
dieRollImages.set(Dice.BLUE, blueImages);
dieRollImages.set(Dice.RED, redImages);
dieRollImages.set(Dice.YELLOW, yellowImages);
dieRollImages.set(Dice.BROWN, brownImages);
dieRollImages.set(Dice.GREY, greyImages);
dieRollImages.set(Dice.BLACK, blackImages);

const rollToRollResultMapping = new Map<Faces, Partial<RollValues>>();
rollToRollResultMapping.set(Faces.RANGE1_DAMAGE1_SURGE1, {range: 1, damage: 1, surge: 1});
rollToRollResultMapping.set(Faces.RANGE1_DAMAGE1, {range: 1, damage: 1});
rollToRollResultMapping.set(Faces.RANGE1_SURGE1, {range: 1, surge: 1});
rollToRollResultMapping.set(Faces.DAMAGE1_SURGE1, {damage: 1, surge: 1});
rollToRollResultMapping.set(Faces.SURGE1, {surge: 1});
rollToRollResultMapping.set(Faces.DAMAGE1, {damage: 1});
rollToRollResultMapping.set(Faces.SHIELD0, {shield: 0});
rollToRollResultMapping.set(Faces.SHIELD1, {shield: 1});
rollToRollResultMapping.set(Faces.SHIELD2, {shield: 2});
rollToRollResultMapping.set(Faces.SHIELD3, {shield: 3});
rollToRollResultMapping.set(Faces.SHIELD4, {shield: 4});
rollToRollResultMapping.set(Faces.MISS, {miss: true});
rollToRollResultMapping.set(Faces.RANGE6_DAMAGE1_SURGE1, {range: 6, damage: 1, surge: 1});
rollToRollResultMapping.set(Faces.RANGE4_DAMAGE2, {range: 4, damage: 2});
rollToRollResultMapping.set(Faces.RANGE2_DAMAGE2_SURGE1, {range: 2, damage: 2, surge: 1});
rollToRollResultMapping.set(Faces.RANGE3_DAMAGE2, {range: 3, damage: 2});
rollToRollResultMapping.set(Faces.RANGE5_DAMAGE1, {range: 5, damage: 1});
rollToRollResultMapping.set(Faces.DAMAGE2, {damage: 2});
rollToRollResultMapping.set(Faces.DAMAGE3_SURGE1, {damage: 3, surge: 1});
rollToRollResultMapping.set(Faces.DAMAGE3, {damage: 3});
rollToRollResultMapping.set(Faces.RANGE2_DAMAGE1, {range: 2, damage: 1});
rollToRollResultMapping.set(Faces.SURGE1_DAMAGE2, {damage: 2, surge: 1});

export class InterpretedRollValues {
    constructor(
        public range: number = 0,
        public shield: number = 0,
        public surge: number = 0,
        public damage: number = 0,
        public miss: boolean = false,
        public totalDamage: number = 0,
    ) {
    }
}

export function interpretResult(result: RollValues): RollValues {
    return new InterpretedRollValues(
        result.range,
        result.shield,
        result.surge,
        result.damage,
        result.miss,
        Math.max(0, result.damage - result.shield)
    );
}

export function parseRollValues(roll: Roll<Dice, Faces>): RollValues {
    const result = rollToRollResultMapping.get(roll.face);
    if (result !== undefined) {
        return toRollResult(result);
    } else {
        throw new Error(`Unhandled Face ${roll.face}`);
    }
}

function toRollResult(partial: Partial<RollValues>): RollValues {
    return Object.assign(new RollValues(), partial);
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.damage + roll2.damage,
        roll1.surge + roll2.surge,
        roll1.shield + roll2.shield,
        roll1.range + roll2.range,
        roll1.miss || roll2.miss,
    ),
};

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.green + roll2.green,
        roll1.red + roll2.red,
        roll1.blue + roll2.blue,
        roll1.yellow + roll2.yellow,
        roll1.brown + roll2.brown,
        roll1.grey + roll2.grey,
        roll1.black + roll2.black,
    ),
};
