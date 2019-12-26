interface User {
    id: string
}

interface Game {
    user: User
}

interface ChatData {
    user: string;
    type: string;
    content: string;
}

interface RenderProps {
    displaySheet: boolean;
}

interface ChatMessage {
    create(chatData: ChatData, renderProps: RenderProps): void;
}

type TemplateData = {
    [key: string]: any
}

interface MessageContents {
    content: string;
}

interface Message {
    message: MessageContents;
}

interface Hooks {
    on(event: string, callback: (app: any, html: JQuery, msg: Message) => void): void;
}

declare var game: Game;
declare var CHAT_MESSAGE_TYPES: any;
declare var ChatMessage: ChatMessage;
declare var Hooks: Hooks;

declare function renderTemplate(template: string, templateData: TemplateData): Promise<string>;