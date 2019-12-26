import {countResults, generateNumber, parseFormula, roll} from './roller';
import * as Mustache from 'mustache';

const tpl = `
<div>
    <div>
        {{#rolls}}
        <img alt="{{imageName}}" src="public/modules/ffg-roller/images/{{imageName}}.png" width="36" height="36">
        {{/rolls}}
    </div>
    <hr>
    <div>
        <ul>
        {{#results}}
            {{#successes}}
            <li>Successes: {{successes}}</li>
            {{/successes}}
            {{#opportunity}}
            <li>Opportunity: {{opportunity}}</li>
            {{/opportunity}}
            {{#strife}}
            <li>Strife: {{strife}}</li>
            {{/strife}}
            {{#failures}}
            <li>Failures: {{failures}}</li>
            {{/failures}}
        {{/results}}
        </ul>
    </div>
</div>
`;

Hooks.on('preCreateChatMessage', (_, data) => {
    const content = data.content;
    if (content !== undefined && content.startsWith('/l5r ')) {
        const formula = content.replace(/\/l5r /g, '');
        console.info(`Rolling formula ${formula}`);

        try {
            const parsedFormula = parseFormula(formula);
            const rolls = roll(parsedFormula.rings, parsedFormula.skills, generateNumber);
            data.content = Mustache.render(tpl, {
                rolls: rolls,
                results: countResults(rolls),
            });
        } catch (e) {
            data.content = e.message;
        }
    }
});