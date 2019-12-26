import {countResults, generateNumber, parseFormula, roll} from './roller';
import * as Mustache from 'mustache';

const tpl = `
<div>
    <div>
        {{#each rolls as roll}}
        <img alt="{{roll}}" src="public/modules/ffg-roller/images/{{roll.imageName}}.png" width="36" height="36">
        {{/each}}
    </div>
    <hr>
    <div>
        <ul>
            {{#if results.opportunity > 0}}
            <li>Opportunity: {{results.opportunity}}</li>
            {{/if}}
            {{#if results.strife > 0}}
            <li>Opportunity: {{results.strife}}</li>
            {{/if}}
            {{#if results.successes > 0}}
            <li>Opportunity: {{results.successes}}</li>
            {{/if}}
            {{#if results.failures > 0}}
            <li>Opportunity: {{results.failures}}</li>
            {{/if}}
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