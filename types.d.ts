interface MessageContents {
    content: string;
}

interface Hooks {
    on(event: string, callback: (message_class: string, msg: MessageContents) => void): void;
}

declare var Hooks: Hooks;

