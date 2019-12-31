import {genesysRoller, starWarsRoller} from './genesys/roller';
import {L5RRoller} from './l5r/roller';
import {secureRandomNumber} from './rng';
import {IRoller} from './roller';
import {V5Roller} from './v5/roller';

const rollers: IRoller[] = [
    new L5RRoller(secureRandomNumber, 'l5r'),
    new V5Roller(secureRandomNumber, 'v5'),
    genesysRoller(secureRandomNumber, 'gen'),
    starWarsRoller(secureRandomNumber, 'sw'),
];

Hooks.on('preCreateChatMessage', (_, data) => {
    const message = data.content;
    if (message !== undefined) {
        for (const roller of rollers) {
            if (roller.handlesCommand(message)) {
                data.content = roller.rollCommand(message);
            }
        }
    }
});

function parseDice(inputs: HTMLInputElement[]): Array<[number, number]> {
    return inputs
        .map((roll) => {
            const die = parseInt(roll.dataset.die ?? '0', 10);
            const face = parseInt(roll.dataset.face ?? '0', 10);
            return [die, face];
        });
}

Hooks.on('renderChatLog', () => {
    $('#chat-log').on('click', '.special-dice-roller button', (event: Event) => {
        event.preventDefault();

        const button = event.target as HTMLButtonElement;
        const rollerKey = button.dataset.roller;
        const form = button.parentElement as HTMLFormElement;
        const rolls = Array.from(form.querySelectorAll('input'));
        const selectedRolls = rolls.filter((roll) => roll.checked);

        for (const roller of rollers) {
            if (selectedRolls.length > 0 && roller.command === rollerKey) {
                if (button.classList.contains('special-dice-roller-keep') && roller.canKeep) {
                    const keptRolls = parseDice(selectedRolls);
                    const result = roller.formatKeptRolls(keptRolls);
                    renderNewRoll(result);
                } else if (roller.canReRoll) {
                    const omittedRolls = rolls.filter((roll) => !roll.checked);
                    const reRolls = parseDice(selectedRolls);
                    const keptRolls = parseDice(omittedRolls);
                    const result = roller.formatReRolls(keptRolls, reRolls);
                    renderNewRoll(result);
                }
                selectedRolls.forEach((elem) => elem.checked = false);
            }
        }
    });
});

function renderNewRoll(rolls: string): void {
    const chatData: ChatData = {
        user: game.user.id,
        content: rolls,
    };
    ChatMessage.create(chatData, {displaySheet: false});
}
