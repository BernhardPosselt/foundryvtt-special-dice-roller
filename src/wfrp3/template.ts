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
    {{#boons}}
    <li>Boons: {{boons}}</li>
    {{/boons}}
    {{#banes}}
    <li>Banes: {{banes}}</li>
    {{/banes}}
    {{#comets}}
    <li>Comets: {{comets}}</li>
    {{/comets}}
    {{#stars}}
    <li>Stars: {{stars}}</li>
    {{/stars}}
    {{#delays}}
    <li>Delay: {{delays}}</li>
    {{/delays}}
    {{#fatigues}}
    <li>Exhaustion: {{fatigues}}</li>
    {{/fatigues}}
{{/results}}
</ul>
`;

export default tpl;
