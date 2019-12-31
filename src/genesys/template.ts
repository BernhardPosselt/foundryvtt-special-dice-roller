const tpl = `
<ul>
{{#results}}
    {{#succeeded}}
    <li class="special-dice-roller-succeeded">Check: succeeded</li>
    {{/succeeded}}
    {{^succeeded}}
    <li class="special-dice-roller-failed">Check: failed</li>
    {{/succeeded}}
    {{#successes}}
    <li>Successes: {{successes}}</li>
    {{/successes}}
    {{#failures}}
    <li>Failures: {{failures}}</li>
    {{/failures}}
    {{#advantages}}
    <li>Advantages: {{advantages}}</li>
    {{/advantages}}
    {{#threats}}
    <li>Threats: {{threats}}</li>
    {{/threats}}
    {{#triumphs}}
    <li>Triumphs: {{triumphs}}</li>
    {{/triumphs}}
    {{#despairs}}
    <li>Despairs: {{despairs}}</li>
    {{/despairs}}
    {{#force}}
    <li>Force: {{force}}</li>
    {{/force}}
    {{#darkForce}}
    <li>Dark Force: {{darkForce}}</li>
    {{/darkForce}}
{{/results}}
</ul>
`;

export default tpl;
