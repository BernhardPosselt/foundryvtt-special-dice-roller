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
export enum Faces {
    FACE1,
    FACE2,
    DOUBLE_FACE2
}
```

Next we are going to define what face each die side should get:

```typescript
export const D4_ROLL_TABLE: Faces[] = [
    Faces.FACE1,
    Faces.FACE1,
    Faces.FACE2,
    Faces.FACE2,
];

export const D6_ROLL_TABLE: Faces[] = [
    Faces.FACE1,
    Faces.FACE1,
    Faces.FACE2,
    Faces.FACE2,
    Faces.DOUBLE_FACE2,
    Faces.DOUBLE_FACE2,
];
```

and define the image names for each die and face:

```typescript
// images will end in .png so blackf1 will be located in public/images/d20/blackf1.png
const d4Images = new Map<Faces, string>();
d4Images.set(Faces.FACE1, 'blackf1');
d4Images.set(Faces.FACE2, 'blackf2');

const d6Images = new Map<Faces, string>();
d6Images.set(Faces.FACE1, 'redf1');
d6Images.set(Faces.FACE2, 'redf2');
d6Images.set(Faces.FACE2, 'redff2');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.D4, d4Images);
dieRollImages.set(Dice.D6, d6Images);
```

## Describing Rolls

Now we need an object to describe the dice pool itself and a Monoid that describes how we should add two DicePools. The identity element is an object that is used if none or one DicePool is present and that can be added to a DicePool without changing its result. Since we define 0 as default values in the constructor, we can just re-use that:

```typescript
export class DicePool {
    constructor(public d4: number = 0, public d6: number = 0) {
    }
}

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.d4 + roll2.d4,
        roll1.d6 + roll2.d6,
    ),
};
```

Next we need a way to count all results that were rolled. To do that create a RollsValues class which holds all values that need to be counted. We also need a Monoid so we can combine two results:

```typescript
export class RollValues {
    constructor(public face1: number = 0, public face2: number = 0) { 
    }
} 

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.face1 + roll2.face1,
        roll1.face2 + roll2.face2,
    ),
};
```

We now need a way to map from a die and a face to a RollValues Object. To do that we create a simple function:

```typescript
export function rollToRollResult(roll: Roll<Dice, Faces>): RollValues {
    if (roll.face === Faces.Face1) {
        return new RollValues(1, 0);
    } else if (roll.face === Face.Face2) {
        return new RollValues(0, 1);
    } else if (roll.face === Face.DOUBLE_FACE2) {
        return new RollValues(0, 2);
    } else {
        throw new Error(`Unhandled Face ${roll.face}`);
    }
}
```

The last remaining part is a way to explain the dice result in our template. Let's say that rolling the same **FACE1** and **FACE2** values makes our check succeed:

```typescript
export class InterpretedResult {
    constructor(public face1: number = 0, public face2: number = 0, public succeeded: boolean = false) {
    }
}

export function interpretResult(result: RollValues): InterpretedResult {
    return new InterpretedResult(
        result.face1,
        result.face2,
        result.face1 === result.face2
    )
}
```

## Parsing the Chat Message

Now that we know what dice we have available, we need a way to parse the chat message that was sent by a user. To do that you can either subclass the **Parser** class or implement **IParser** for a more complicated roll formula or simply re-use the current convention which counts a single letter.

Let's use f(our) and s(ix) for d4 and d6 respectively

We want to place that in a new file called **parser.ts**:

```typescript
function letterToRolls(letter: string, occurrences: number): DicePool {
    if (letter === 'f') {
        return new DicePool(occurrences, 0);
    } else if (letter === 's') {
        return new DicePool(0, occurrences);
    } else {
        throw new Error(`Unknown letter ${letter}`);
    }
}

export class SimpleParser extends DefaultSimpleParser<DicePool> {
    constructor() {
        super(
            'fs',
            letterToRolls,
            dicePoolMonoid,
            ['d4', 'd6'],
        );
    }
}
```

## Creating the Template

You can use any template language that you want or re-use the shipped Mustache engine. Our roll template partial would look something like this in Mustache:

```typescript
const tpl = `
<ul>
{{#results}}
    {{#succeeded}}
    <li>Roll Succeded</li>
    {{/succeeded}}
    {{#face1}}
    <li>Face 1s: {{face1}}</li>
    {{/face1}}
    {{#face2}}
    <li>Face 2s: {{face2}}</li>
    {{/face2}}
{{/results}}
</ul>
`;
export default tpl;
```

## Creating the Roller

The thing that ties everything together is the Roller. Create a **roller.ts** file and

```typescript
export class D20Roller extends Roller<Dice, Faces, DicePool> {
    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()]);
    }

    public roll(rolls: DicePool): Roll<Dice, Faces>[] {
        return [
            ...rollDie(rolls.d4, Dice.D4, D4_ROLL_TABLE, this.rng),
            ...rollDie(rolls.d6, Dice.D6, D6_ROLL_TABLE, this.rng),
        ];
    }

    public formatRolls(rolls: Array<Roll<Dice, Faces>>, flavorText?: string): string {
        const combinedRolls = combineRolls(rolls, parseRollValues, rollValuesMonoid);
        return Mustache.render(
            base,
            {
                system: this.command,
                canReRoll: this.canReRoll,
                canKeep: this.canKeep,
                flavorText,
                rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages)),
                results: interpretResult(combinedRolls),
                rollIndex(): number {
                    return rolls.indexOf(this);
                },
            },
            {interpretation: tpl},
        );
    }

    protected toDicePool(dice: Dice[]): DicePool {
        const d4 = countMatches(dice, (die) => die === Dice.D4);
        const d6 = countMatches(dice, (die) => die === Dice.D6);
        return new DicePool(d4, d6);
    }

    public toRoll(die: number, face: number): Roll<Dice, Faces> {
        return new Roll(die, face);
    }

}
```

The roller base class accepts two additional boolean parameters to enable re-rolling and keeping dice. The templates are also aware of it so to make use of it, passing the flags is the only thing that you have to do.

## Adding the Roller

To wire everything up we just need to add our Roller to the list of available rollers in **index.ts**. The object key is the name of the property, under which it can be accessed under **game.specialDiceRoller**, e.g. **d20** would make it available at **game.specialDiceRoller.d20**
```typescript
interface IExportedRollers {
    // ...
    d20: D20Roller;
}

const specialDiceRoller = {
    // ...
    d20: new D20Roller(secureRandomNumber, 'd20'),
};
```

We should now be able to roll our first roll using the chat message **/d20 2f5s**
