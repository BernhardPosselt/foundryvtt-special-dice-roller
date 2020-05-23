const tpl = `
<ul>
{{#results}}
    <li>Erfolge: {{ERFOLGE}}</li>
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
