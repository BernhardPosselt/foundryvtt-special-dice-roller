import {GenesysRoller, genesysRoller, starWarsRoller} from './genesys/roller';
import {HeroQuestRoller} from './heroquest/roller';
import {HEXRoller} from './hex/roller';
import {L5RRoller} from './l5r/roller';
import {secureRandomNumber} from './rng';
import {IndexedRoll, IRoller, ReRoll} from './roller';
import {TorRoller} from './tor/roller';
import {V5Roller} from './v5/roller';
import { warhammerRoller, WarhammerRoller } from './wfrp3/roller';
import {Descent2Roller} from './desc2/roller';
import {OVARoller, ovaRoller} from './ova/roller';

// begin foundry types
interface IHooks {
    on(event: string, callback: (chatLog: IChatLog, messageText: string, msg: IChatData) => void): void;
}

interface IChatData {
    user: string;
    content: string;
}

interface IChatLog {
    tabName: string;
}

interface IChatMessage {
    create(template: IChatData, options: object): void;
}

interface IUser {
    id: string;
}

interface IGame {
    user: IUser;
    specialDiceRoller: IExportedRollers;
}

declare var Hooks: IHooks;
declare var ChatMessage: IChatMessage;
declare var game: IGame;

// end foundry types

interface IExportedRollers {
    l5r: L5RRoller;
    v5: V5Roller;
    genesys: GenesysRoller;
    starWars: GenesysRoller;
    heroQuest: HeroQuestRoller;
    heXXen: HEXRoller;
    tor: TorRoller;
    warhammer3: WarhammerRoller;
    desc2: Descent2Roller;
    ova: OVARoller;
}

const specialDiceRoller = {
    l5r: new L5RRoller(secureRandomNumber, 'l5r'),
    v5: new V5Roller(secureRandomNumber, 'v5'),
    genesys: genesysRoller(secureRandomNumber, 'gen'),
    starWars: starWarsRoller(secureRandomNumber, 'sw'),
    heroQuest: new HeroQuestRoller(secureRandomNumber, 'hq'),
    heXXen: new HEXRoller(secureRandomNumber, 'hex'),
    tor: new TorRoller(secureRandomNumber, 'tor'),
    warhammer3: warhammerRoller(secureRandomNumber, 'wfrp3'),
    desc2: new Descent2Roller(secureRandomNumber, 'desc2'),
    ova: ovaRoller(secureRandomNumber, 'ova'),
};

Hooks.on('init', () => {
    game.specialDiceRoller = specialDiceRoller;

    Hooks.on('chatMessage', (_: IChatLog, messageText: string, data: IChatData) => {
        if (messageText !== undefined) {
            for (const roller of rollers) {
                if (roller.handlesCommand(messageText)) {
                    data.content = roller.rollCommand(messageText);
                    ChatMessage.create(data, {});
                    return false;
                }
            }
        }
        return true;
    });
});

const rollers: IRoller[] = Object.values(specialDiceRoller);

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
    const chatData: IChatData = {
        user: game.user.id,
        content: rolls,
    };
    ChatMessage.create(chatData, {displaySheet: false});
}
