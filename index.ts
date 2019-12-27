import {count, countResults, Dice, generateNumber, parseFormula, roll, RollResult} from './roller';
import * as Mustache from 'mustache';

const tpl = `
<div class="l5r-roller">
    <div>
        <form>
            {{#rolls}}
            <input type="checkbox" style="background-image: url('modules/l5r-roller/images/{{imageName}}.png')" name="roll{{rollIndex}}" data-die="{{die}}" data-face="{{face}}"/>
            {{/rolls}}
            <button class="l5r-roller-reroll">re-roll selected</button>
            <button class="l5r-roller-keep">keep selected</button>
        </form>
    </div>
    <hr>
    <div>
        <ul>
        {{#results}}
            {{#successes}}
            <li>Successes: {{successes}}</li>
            {{/successes}}
            {{#opportunity}}
            <li>Opportunity: {{opportunity}}</li>
            {{/opportunity}}
            {{#strife}}
            <li>Strife: {{strife}}</li>
            {{/strife}}
            {{#failures}}
            <li>Failures: {{failures}}</li>
            {{/failures}}
        {{/results}}
        </ul>
    </div>
</div>
`;

function formatRolls(rolls: RollResult[]): string {
    return Mustache.render(tpl, {
        rolls: rolls,
        results: countResults(rolls),
        timestamp: new Date().getTime(),
        rollIndex: function () {
            return rolls.indexOf(this);
        },
    });
}

Hooks.on('preCreateChatMessage', (_, data) => {
    const content = data.content;
    if (content !== undefined && content.startsWith('/l5r ')) {
        const formula = content
            .replace(/\/l5r /g, '')
            .replace(/\s+/g, '');
        console.info(`Rolling formula ${formula}`);

        try {
            const parsedFormula = parseFormula(formula);
            const rolls = roll(parsedFormula.rings, parsedFormula.skills, generateNumber);
            data.content = formatRolls(rolls);
        } catch (e) {
            data.content = e.message;
        }
    }
});

function parseDice(inputs: HTMLInputElement[]): RollResult[] {
    return inputs
        .map((roll) => {
            const die = parseInt(roll.dataset.die ?? '0', 10);
            const faces = parseInt(roll.dataset.face ?? '0', 10);
            return new RollResult(die, faces);
        });
}

function renderNewRoll(rolls: RollResult[]) {
    const chatData: ChatData = {
        user: game.user.id,
        content: formatRolls(rolls),
    };
    ChatMessage.create(chatData, {displaySheet: false});
}

Hooks.on('renderChatLog', () => {
    $('#chat-log').on('click', '.l5r-roller button', (event: Event) => {
        event.preventDefault();

        const button = event.target as HTMLButtonElement;
        const form = button.parentElement as HTMLFormElement;
        const selectedRolls = Array.from(form.querySelectorAll('input:checked')) as HTMLInputElement[];
        const omittedRolls = Array.from(form.querySelectorAll('input:not(:checked)')) as HTMLInputElement[];

        if (button.classList.contains('l5r-roller-keep')) {
            const keptRolls = parseDice(selectedRolls);
            if (keptRolls.length > 0) {
                renderNewRoll(keptRolls);
            }
        } else {
            const reRollDice = parseDice(selectedRolls)
                .map((roll) => roll.die);
            const ringReRolls = count(reRollDice, (die) => die === Dice.RING);
            const skillReRolls = count(reRollDice, (die) => die === Dice.SKILL);
            const reRolls = roll(ringReRolls, skillReRolls, generateNumber);
            const unaffectedRolls = parseDice(omittedRolls);
            renderNewRoll([...unaffectedRolls, ...reRolls]);
        }
        selectedRolls.forEach((elem) => elem.checked = false);
    });
});
