const tpl = `
<ul>
{{#results}}
    {{#action}}
    <li>Action: {{face1}}</li>
    {{/action}}
    {{#danger}}
    <li>Danger: {{danger}}</li>
    {{/danger}}
{{/results}}
</ul>
`;

export default tpl;