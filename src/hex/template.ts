const tpl = `
<ul>
{{#results}}
    {{#ERFOLGE}}
    <li>Erfolge: {{ERFOLGE}}</li>
    {{/ERFOLGE}}
    {{#ESPRIT}}
    <li>Esprit: {{ESPRIT}}</li>
    {{/ESPRIT}}
    {{#BLUT}}
    <li>Blutstropfen: {{BLUT}}</li>
    {{/BLUT}}
    {{#ELIXIR}}
    <li>Elixire: {{ELIXIR}}</li>
    {{/ELIXIR}}
    {{#FLUCH}}
    <li>Flüche: {{FLUCH}}</li>
    {{/FLUCH}}
</ul>
{{/results}}
`;

export default tpl;
