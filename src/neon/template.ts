const tpl = `
<ul>
{{#results}}
    {{#state}}
    <li class="neon-{{stateClass}}"><strong>{{state}}</strong></li>
    {{/state}}
    {{#highestAction}}
    <li><em>{{highestAction}}</em> was rolled</li>
    {{/highestAction}}
    {{#boons}}
    <li><em>{{boons}}</em> boon(s)</li>
    {{/boons}}
{{/results}}
</ul>
`;

export default tpl;