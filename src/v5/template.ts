const tpl = `
<ul>
{{#results}}
    {{#successes}}
    <li>Successes: {{successes}}</li>
    {{/successes}}
    {{#messyCritical}}
    <li class="special-dice-roller-v5-messy-critical">Messy Critical</li>
    {{/messyCritical}}
    {{#bestialFailure}}
    <li>Potential Bestial Failure</li>
    {{/bestialFailure}}
{{/results}}
</ul>
`;

export default tpl;
