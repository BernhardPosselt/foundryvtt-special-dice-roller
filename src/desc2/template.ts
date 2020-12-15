const tpl = `
<ul>
{{#results}}
    {{#miss}}
    <li class="special-dice-roller-failed">Check: missed</li>
    {{/miss}}
    {{#surge}}
    <li>Surges: {{surge}}</li>
    {{/surge}}
    {{#range}}
    <li>Range: {{range}}</li>
    {{/range}}
    {{#damage}}
    <li>Damage: {{damage}}</li>
    {{/damage}}
    {{#shield}}
    <li>Shields: {{shield}}</li>
    {{/shield}}
    <li>Total Damage: {{totalDamage}}</li>
</ul>
{{/results}}
`;

export default tpl;
