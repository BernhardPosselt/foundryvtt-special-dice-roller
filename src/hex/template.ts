const tpl = `
<ul>
{{#results}}
    {{#ERFOLGE}}
    <li>Erfolge: {{ERFOLGE}}</li>
    {{/ERFOLGE}}
    {{#ESPRIT}}
    <li>Esprit: {{ESPRIT}}</li>
    {{/ESPRIT}}
    {{#JANUS}}
    <li>Janusköpfe: {{JANUS}}</li>
    {{/JANUS}}
    {{#BLUT}}
    <li>Blutstropfen: {{BLUT}}</li>
    {{/BLUT}}
    {{#ELIXIR}}
    <li>Exlixire: {{ELIXIR}}</li>
    {{/ELIXIR}}
    {{#FLUCH}}
    <li>Flüche: {{FLUCH}}</li>
    {{/FLUCH}}
</ul>
{{/results}}
`;

export default tpl;
