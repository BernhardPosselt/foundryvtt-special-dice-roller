# Adding a New Dice System

To create a new dice system, think of a proper acronym to roll them (e.g. /d20 ). We will go with **d20** for this example.
 
 Create the following parts:

* **public/images/d20**: your dice images will go into this folder
* **src/d20**: this will hold your code 

A dice system consists of the following parts:

* Different dice
* Different dice faces and their images
* Rules how to role the dice
* Rules how to interpret these dice

## Describing Dice

Everything related to dice themselves should go into **src/d20/dice.ts**. 

Let's say your dice will have 2 different dice, a 4 sided and a 6 sided die. Both can have two different symbols, the second one can occur once and twice. Then you'd create an enum for both dice

```typescript
export enum Dice {
    D4,
    D6
}
```

and an enum for all possible fields:

```typescript
export enum Dice {
    FACE1,
    FACE2,
    DOUBLE_FACE2
}
```

Now we need an object to describe the dice pool itself and a Monoid that describes how we should add two DicePools. The identity element is an object that is used if none or one DicePool is present and that can be added to a DicePool without changing its result. Since we define 0 default values in the constructor, we can just re-use that:

```typescript
export class DicePool {
    constructor(public d4 = 0, public d6 = 0) {
    }
}

export const dicePoolMonoid: Monoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.d4 + roll2.d4,
        roll1.d6 + roll2.d6,
    ),
};
```

Next we need a way to record all results that were rolled. To do that create a RollsValues class which holds all values that need to be counted. We also need a Monoid for that to combine multiple values:

```typescript
export class RollValues {
    constructor(public face1 = 0, public face2 = 0) { 
    }
} 

export const rollValuesMonoid: Monoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.face1 + roll2.face1,
        roll1.face2 + roll2.face2,
    ),
};
```