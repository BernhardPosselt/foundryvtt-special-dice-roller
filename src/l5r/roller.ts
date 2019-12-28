import {RandomNumberGenerator} from '../rng';
import {
    Dice,
    Faces,
    L5RRoll,
    RING_ROLL_TABLE,
    RollResult,
    rollResultMonoid,
    Rolls,
    rollToRollResult,
    SKILL_ROLL_TABLE,
} from './dice';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';
import {rollDie, Roller} from '../roller';
import * as Mustache from 'mustache';
import tpl from './template';
import {parseFormula, Parser} from '../parser';
import {ComplexParser, SimpleParser} from './parser';
import {escapeHtml} from '../util';

export class L5RRoller extends Roller {
    private readonly parsers: Parser<Rolls>[];

    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command);
        this.parsers = [new SimpleParser(), new ComplexParser()];
    }

    roll(rolls: Rolls): L5RRoll[] {
        const rings = rollDie(rolls.rings, RING_ROLL_TABLE, L5RRoller.isExploding, this.rng)
            .map((face) => new L5RRoll(Dice.RING, face));
        const skills = rollDie(rolls.skills, SKILL_ROLL_TABLE, L5RRoller.isExploding, this.rng)
            .map((face) => new L5RRoll(Dice.SKILL, face));
        return [...rings, ...skills];
    }

    reRoll(keptResults: L5RRoll[], reRollResults: L5RRoll[]): L5RRoll[] {
        const reRolledDice = reRollResults.map((roll) => roll.die);
        const ringReRolls = countMatches(reRolledDice, (die) => die === Dice.RING);
        const skillReRolls = countMatches(reRolledDice, (die) => die === Dice.SKILL);
        const reRolls = this.roll(new Rolls(ringReRolls, skillReRolls));
        return [...keptResults, ...reRolls];
    }

    combineRolls(rolls: L5RRoll[]): RollResult {
        const results = rolls
            .map((roll) => rollToRollResult(roll));
        return combineAll(results, rollResultMonoid);
    }

    renderNewRoll(rolls: L5RRoll[]) {
        const chatData: ChatData = {
            user: game.user.id,
            content: this.formatRolls(rolls),
        };
        ChatMessage.create(chatData, {displaySheet: false});
    }

    protected rollFormula(formula: string): string {
        try {
            const parsedFormula = parseFormula(formula, this.parsers);
            const rolls = this.roll(parsedFormula);
            return this.formatRolls(rolls);
        } catch (e) {
            return escapeHtml(e.message);
        }
    }

    private formatRolls(rolls: L5RRoll[]): string {
        return Mustache.render(tpl, {
            rolls: rolls,
            results: this.combineRolls(rolls),
            timestamp: new Date().getTime(),
            rollIndex: function () {
                return rolls.indexOf(this);
            },
        });
    }

    private static isExploding(face: Faces): boolean {
        return face === Faces.EXPLODING_STRIFE ||
            face === Faces.EXPLODING_OPPORTUNITY ||
            face === Faces.EXPLODING;
    }
}
