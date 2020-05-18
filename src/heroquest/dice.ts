import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    DIE,
}

export enum Faces {
    SKULL,
    LION_SHIELD,
    SKULL_SHIELD,
}

export const ROLL_TABLE: Faces[] = [
    Faces.SKULL,
    Faces.SKULL,
    Faces.SKULL,
    Faces.LION_SHIELD,
    Faces.LION_SHIELD,
    Faces.SKULL_SHIELD,
];

export class DicePool {
    constructor(
        public dice: number = 0,
    ) {
    }

    public toString(): string {
        return `dice: ${this.dice}`;
    }
}

export class RollValues {
    constructor(
        public skulls: number = 0,
        public lionShields: number = 0,
        public skullShields: number = 0,
    ) {
    }
}

const diceImages = new Map<Faces, string>();
diceImages.set(Faces.SKULL, 'skull');
diceImages.set(Faces.SKULL_SHIELD, 'skullshield');
diceImages.set(Faces.LION_SHIELD, 'lionshield');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.DIE, diceImages);

const rollToRollResultMapping = new Map<Faces, Partial<RollValues>>();
rollToRollResultMapping.set(Faces.SKULL, {skulls: 1});
rollToRollResultMapping.set(Faces.SKULL_SHIELD, {skullShields: 1});
rollToRollResultMapping.set(Faces.LION_SHIELD, {lionShields: 1});

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
        public heroDamage: number = 0,
        public monsterDamage: number = 0,
        public heroShields: number = 0,
        public monsterShields: number = 0,
        public hits: number = 0,
    ) {
    }
}

export function interpretResult(result: RollValues): InterpretedResult {
    const heroDamage = result.skulls - result.skullShields;
    const monsterDamage = result.skulls - result.lionShields;
    const interpretedHeroDamage = heroDamage < 0 ? 0 : heroDamage;
    const interpretedMonsterDamage = monsterDamage < 0 ? 0 : monsterDamage;
    return new InterpretedResult(
        interpretedHeroDamage,
        interpretedMonsterDamage,
        result.lionShields,
        result.skullShields,
        result.skulls,
    );
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.skulls + roll2.skulls,
        roll1.lionShields + roll2.lionShields,
        roll1.skullShields + roll2.skullShields,
    ),
};

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.dice + roll2.dice,
    ),
};
