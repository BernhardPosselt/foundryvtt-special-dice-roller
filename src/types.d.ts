interface MessageContents {
    content: string;
}

interface Hooks {
    on(event: string, callback: (msg: MessageContents) => void): void;
}

interface ChatData {
    user: string;
    content: string;
}

interface ChatMessage {
    create(template: ChatData, options: Object): void;
}


interface User {
    id: string;
}

interface ExportedRollers {
    l5r: any;
    v5: any;
    genesys: any;
    starWars: any;
    heroQuest: any;
}

interface Game {
    user: User
    specialDiceRoller: ExportedRollers
}

declare var Hooks: Hooks;
declare var ChatMessage: ChatMessage;
declare var game: Game;
