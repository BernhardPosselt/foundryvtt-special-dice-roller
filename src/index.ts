import {genesysRoller, starWarsRoller} from './genesys/roller';
import {HeroQuestRoller} from './heroquest/roller';
import {L5RRoller} from './l5r/roller';
import {secureRandomNumber} from './rng';
import {IndexedRoll, IRoller, ReRoll} from './roller';
import {V5Roller} from './v5/roller';

const rollers: IRoller[] = [
    new L5RRoller(secureRandomNumber, 'l5r'),
    new V5Roller(secureRandomNumber, 'v5'),
    genesysRoller(secureRandomNumber, 'gen'),
    starWarsRoller(secureRandomNumber, 'sw'),
    new HeroQuestRoller(secureRandomNumber, 'hq'),
];

Hooks.on('init', () => {
    game.specialDiceRoller = {
        l5r: rollers[0],
        v5: rollers[1],
        genesys: rollers[2],
        starWars: rollers[3],
        heroQuest: rollers[4],
    };
});

Hooks.on('preCreateChatMessage', (data) => {
    const message = data.content;
    if (message !== undefined) {
        for (const roller of rollers) {
            if (roller.handlesCommand(message)) {
                data.content = roller.rollCommand(message);
            }
        }
    }
});

function parseRoll(input: HTMLInputElement): IndexedRoll {
    const die = parseInt(input.dataset.die ?? '0', 10);
    const face = parseInt(input.dataset.face ?? '0', 10);
    return [die, face];
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
                    const keptRolls = selectedRolls.map((roll) => parseRoll(roll));
                    const result = roller.formatKeptRolls(keptRolls);
                    renderNewRoll(result);
                } else if (roller.canReRoll) {
                    const parsedRolls = rolls
                        .map((rollInput) => {
                            const roll = parseRoll(rollInput);
                            return new ReRoll(roll, rollInput.checked);
                        });
                    const result = roller.formatReRolls(parsedRolls);
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
