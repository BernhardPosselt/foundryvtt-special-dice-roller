const tpl = `
<ul>
{{#results}}
    {{#autosuccess}}
    <li class="special-dice-roller-succeeded">Automatic Success</li>
    {{/autosuccess}}
    {{^autosuccess}}
    <li>Total: {{total}}</li>
    {{/autosuccess}}
    <li>Great Successes: {{great}}</li>
    {{#adversary}}
    <li class="special-dice-roller-failed">Adversary Roll</li>
    {{/adversary}}
    {{#tired}}
    <li class="special-dice-roller-failed">Weary</li>
    {{/tired}}
{{/results}}
</ul>
`;

export default tpl;
