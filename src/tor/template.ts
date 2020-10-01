const tpl = `
<ul>
{{#results}}
    {{#autosuccess}}
    <li class="special-dice-roller-succeeded">Automatic Success</li>
    {{/autosuccess}}
    {{^autosuccess}}
    <li>Total: {{total}}</li>
    <li>Great Successes: {{great}}</li>
    {{/autosuccess}}
{{/results}}
</ul>
`;

export default tpl;
