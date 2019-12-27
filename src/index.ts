import {secureRandomNumber} from './rng';
import {countResults, reRoll, roll} from './l5r/roller';
import * as Mustache from 'mustache';
import tpl from './l5r/template';
import {parseFormula} from './l5r/parser';
import {L5RRoll} from './l5r/dice';

function formatRolls(rolls: L5RRoll[]): string {
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
            .replace(/\/l5r /g, '');
        console.info(`Rolling formula ${formula}`);

        try {
            const parsedFormula = parseFormula(formula);
            const rolls = roll(parsedFormula, secureRandomNumber);
            data.content = formatRolls(rolls);
        } catch (e) {
            data.content = e.message;
        }
    }
});

function parseDice(inputs: HTMLInputElement[]): L5RRoll[] {
    return inputs
        .map((roll) => {
            const die = parseInt(roll.dataset.die ?? '0', 10);
            const faces = parseInt(roll.dataset.face ?? '0', 10);
            return new L5RRoll(die, faces);
        });
}

function renderNewRoll(rolls: L5RRoll[]) {
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

        if (selectedRolls.length > 0) {
            if (button.classList.contains('l5r-roller-keep')) {
                const keptRolls = parseDice(selectedRolls);
                renderNewRoll(keptRolls);
            } else {
                const reRolls = parseDice(selectedRolls);
                const keptRolls = parseDice(omittedRolls);
                renderNewRoll(reRoll(keptRolls, reRolls, secureRandomNumber));
            }
            selectedRolls.forEach((elem) => elem.checked = false);
        }
    });
});
