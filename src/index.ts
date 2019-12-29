import {secureRandomNumber} from './rng';
import {L5RRoller} from './l5r/roller';
import {L5RRoll} from './l5r/dice';
import {GenesysRoller} from './genesys/roller';


Hooks.on('preCreateChatMessage', (_, data) => {
    const message = data.content;
    const rollers = [
        new L5RRoller(secureRandomNumber, 'l5r'),
        new GenesysRoller(secureRandomNumber, 'gen'),
        new GenesysRoller(secureRandomNumber, 'sw'),
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

        const dialogOptions = {
            width: 350,
            bottom: 12,
            right: 300,
            classes: ['dialog', 'l5r-dice-panel'],
        };
        // @ts-ignore
        new Dialog(
            {
                title: 'Dice Roller',
                buttons: {},
                content: `
<div>
    <label>System
    <select>
        <option>D20</option>
        <option>Star Wars</option>
        <option selected>Genesys</option>
        <option>Legend of the 5 Rings</option>
    </select>
    </label>
    <div class="l5r-roller-dice">
        <button title="boost" style="background-image: url('modules/l5r-roller/public/images/gen/blue.png')" class="l5r-roller-die"></button>
        <button title="setback" style="background-image: url('modules/l5r-roller/public/images/gen/black.png')" class="l5r-roller-die"></button>
        <button title="ability" style="background-image: url('modules/l5r-roller/public/images/gen/green.png')" class="l5r-roller-die"></button>
        <button title="difficulty" style="background-image: url('modules/l5r-roller/public/images/gen/purple.png')" class="l5r-roller-die"></button>
        <button title="proficiency" style="background-image: url('modules/l5r-roller/public/images/gen/yellow.png')" class="l5r-roller-die"></button>
        <button title="challenge
        " style="background-image: url('modules/l5r-roller/public/images/gen/red.png')" class="l5r-roller-die"></button>
    </div>
    <div class="l5r-roller-dice">
        <button style="background-image: url('modules/l5r-roller/public/images/sw/blue.png')" class="l5r-roller-die"></button>
        <button style="background-image: url('modules/l5r-roller/public/images/sw/black.png')" class="l5r-roller-die"></button>
        <button style="background-image: url('modules/l5r-roller/public/images/sw/green.png')" class="l5r-roller-die"></button>
        <button style="background-image: url('modules/l5r-roller/public/images/sw/purple.png')" class="l5r-roller-die"></button>
        <button style="background-image: url('modules/l5r-roller/public/images/sw/yellow.png')" class="l5r-roller-die"></button>
        <button style="background-image: url('modules/l5r-roller/public/images/sw/red.png')" class="l5r-roller-die"></button>
        <button style="background-image: url('modules/l5r-roller/public/images/sw/whiteHex.png')" class="l5r-roller-die"></button>
    </div>
    <div class="l5r-roller-dice">
        <button style="background-image: url('modules/l5r-roller/public/images/l5r/white.png')" class="l5r-roller-die"></button>
        <button style="background-image: url('modules/l5r-roller/public/images/l5r/black.png')" class="l5r-roller-die"></button>
    </div>
    <div>
        <button>Roll</button>
    </div>
</div>
`,
            },
            dialogOptions,
        )
            .render(true);
    });
});


Hooks.on('ready', () => {

});