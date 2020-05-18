import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    MONSTER,
    HERO,
}

export enum Faces {
    HERO_SKULL,
    HERO_LION_SHIELD,
    HERO_SKULL_SHIELD,
    MONSTER_SKULL,
    MONSTER_LION_SHIELD,
    MONSTER_SKULL_SHIELD,
}

export const MONSTER_TABLE: Faces[] = [
    Faces.MONSTER_SKULL,
    Faces.MONSTER_SKULL,
    Faces.MONSTER_SKULL,
    Faces.MONSTER_LION_SHIELD,
    Faces.MONSTER_LION_SHIELD,
    Faces.MONSTER_SKULL_SHIELD,
];

export const HERO_TABLE: Faces[] = [
    Faces.HERO_SKULL,
    Faces.HERO_SKULL,
    Faces.HERO_SKULL,
    Faces.HERO_LION_SHIELD,
    Faces.HERO_LION_SHIELD,
    Faces.HERO_SKULL_SHIELD,
];

export class DicePool {
    constructor(
        public hero: number = 0,
        public monster: number = 0,
    ) {
    }

    public toString(): string {
        return `hero: ${this.hero}, monster: ${this.monster}`;
    }
}

export class RollValues {
    constructor(
        public heroSkulls: number = 0,
        public heroLionShields: number = 0,
        public heroSkullShields: number = 0,
        public monsterSkulls: number = 0,
        public monsterLionShields: number = 0,
        public monsterSkullShields: number = 0,
    ) {
    }
}

const diceImages = new Map<Faces, string>();
diceImages.set(Faces.HERO_SKULL, 'heroskull');
diceImages.set(Faces.HERO_SKULL_SHIELD, 'heroskullshield');
diceImages.set(Faces.HERO_LION_SHIELD, 'herolionshield');
diceImages.set(Faces.MONSTER_SKULL, 'monsterskull');
diceImages.set(Faces.MONSTER_SKULL_SHIELD, 'monsterskullshield');
diceImages.set(Faces.MONSTER_LION_SHIELD, 'monsterlionshield');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.HERO, diceImages);
dieRollImages.set(Dice.MONSTER, diceImages);

const rollToRollResultMapping = new Map<Faces, Partial<RollValues>>();
rollToRollResultMapping.set(Faces.HERO_SKULL, {heroSkulls: 1});
rollToRollResultMapping.set(Faces.HERO_SKULL_SHIELD, {heroSkullShields: 1});
rollToRollResultMapping.set(Faces.HERO_LION_SHIELD, {heroLionShields: 1});
rollToRollResultMapping.set(Faces.MONSTER_SKULL, {monsterSkulls: 1});
rollToRollResultMapping.set(Faces.MONSTER_SKULL_SHIELD, {monsterSkullShields: 1});
rollToRollResultMapping.set(Faces.MONSTER_LION_SHIELD, {monsterLionShields: 1});

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
    ) {
    }
}

export function interpretResult(result: RollValues): InterpretedResult {
    const heroDamage = result.heroSkulls - result.monsterSkullShields;
    const monsterDamage = result.monsterSkulls - result.heroLionShields;
    const interpretedHeroDamage = heroDamage < 0 ? 0 : heroDamage;
    const interpretedMonsterDamage = monsterDamage < 0 ? 0 : monsterDamage;
    return new InterpretedResult(
        interpretedHeroDamage,
        interpretedMonsterDamage,
    );
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.heroSkulls + roll2.heroSkulls,
        roll1.heroLionShields + roll2.heroLionShields,
        roll1.heroSkullShields + roll2.heroSkullShields,
        roll1.monsterSkulls + roll2.monsterSkulls,
        roll1.monsterLionShields + roll2.monsterLionShields,
        roll1.monsterSkullShields + roll2.monsterSkullShields,
    ),
};

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.hero + roll2.hero,
        roll1.monster + roll2.monster,
    ),
};
