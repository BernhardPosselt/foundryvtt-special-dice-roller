const tpl = `
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
</ul>
{{/results}}
`;

export default tpl;
