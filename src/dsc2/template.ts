const tpl = `
<ul>
{{#results}}
    {{#miss}}
    <li class="special-dice-roller-failed">Check: missed</li>
    {{/miss}}
    {{#range}}
    <li>Range: {{range}}</li>
    {{/range}}
    {{#shield}}
    <li>Shields: {{shield}}</li>
    {{/shield}}
    {{#surge}}
    <li>Surges: {{surge}}</li>
    {{/surge}}
    {{#damage}}
    <li>Damage: {{damage}}</li>
    {{/damage}}
    {{#totalDamage}}
    <li>Total Damage: {{totalDamage}}</li>
    {{/totalDamage}}
</ul>
{{/results}}
`;

export default tpl;
