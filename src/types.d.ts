interface MessageContents {
    content: string;
}

interface Hooks {
    on(event: string, callback: (message_class: string, msg: MessageContents) => void): void;
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

interface Game {
    user: User
}

declare var Hooks: Hooks;
declare var ChatMessage: ChatMessage;
declare var game: Game;
