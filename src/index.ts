import {secureRandomNumber} from './rng';
import {L5RRoller} from './l5r/roller';
import {L5RRoll} from './l5r/dice';
import {genesysRoller, starWarsRoller} from './genesys/roller';


Hooks.on('preCreateChatMessage', (_, data) => {
    const message = data.content;
    const rollers = [
        new L5RRoller(secureRandomNumber, 'l5r'),
        genesysRoller(secureRandomNumber, 'gen'),
        starWarsRoller(secureRandomNumber, 'sw'),
    ];
    if (message !== undefined) {
        for (let roller of rollers) {
            if (roller.handlesCommand(message)) {
                data.content = roller.rollCommand(message);
            }
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

Hooks.on('renderChatLog', () => {
    $('#chat-log').on('click', '.l5r-roller button', (event: Event) => {
        event.preventDefault();

        const roller = new L5RRoller(secureRandomNumber, 'l5r');

        const button = event.target as HTMLButtonElement;
        const form = button.parentElement as HTMLFormElement;
        const selectedRolls = Array.from(form.querySelectorAll('input:checked')) as HTMLInputElement[];
        const omittedRolls = Array.from(form.querySelectorAll('input:not(:checked)')) as HTMLInputElement[];

        if (selectedRolls.length > 0) {
            if (button.classList.contains('l5r-roller-keep')) {
                const keptRolls = parseDice(selectedRolls);
                roller.renderNewRoll(keptRolls);
            } else {
                const reRolls = parseDice(selectedRolls);
                const keptRolls = parseDice(omittedRolls);
                roller.renderNewRoll(roller.reRoll(keptRolls, reRolls));
            }
            selectedRolls.forEach((elem) => elem.checked = false);
        }
    });
});
