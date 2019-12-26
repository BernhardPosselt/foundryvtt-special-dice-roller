import {countResults, generateNumber, parseFormula, roll} from './roller';

Hooks.on('renderChatMessage', (_, html, msg) => {
    const content = msg.message.content;
    if (content.startsWith('/l5r ')) {
        const formula = content.replace(/\/l5r /g, '');
        console.debug(`Rolling formula ${formula}`);
        const parsedFormula = parseFormula(formula);
        const rolls = roll(parsedFormula.rings, parsedFormula.skills, generateNumber);
        html.hide();

        const template = 'public/modules/l5r-roller/templates/roll-dialog.html';
        const templateData: TemplateData = {
            rolls: rolls,
            results: countResults(rolls),
        };
        const chatData: ChatData = {
            user: game.user.id,
            type: CHAT_MESSAGE_TYPES.OTHER,
            content: ''
        };
        renderTemplate(template, templateData)
            .then((content) => {
                chatData['content'] = content;
                ChatMessage.create(chatData, {displaySheet: false});
            });
    }
});