const tpl = `
<div class="l5r-roller">
    <div>
        <form>
            {{#rolls}}
            <img src="modules/l5r-roller/public/images/genesys/{{imageName}}.png')" data-index="roll{{rollIndex}}" data-die="{{die}}" data-face="{{face}}"/>
            {{/rolls}}
        </form>
    </div>
    <hr>
    <div>
        <ul>
        {{#results}}
            {{#succeeded}}
            <li>Check: succeeded</li>
            {{/succeeded}}
            {{^succeeded}}
            <li>Check: failed</li>
            {{/succeeded}}
            {{#successes}}
            <li>Successes: {{successes}}</li>
            {{/successes}}
            {{#failures}}
            <li>Failures: {{failures}}</li>
            {{/failures}}
            {{#abilities}}
            <li>Abilities: {{abilities}}</li>
            {{/abilities}}
            {{#threats}}
            <li>Threats: {{threats}}</li>
            {{/threats}}
            {{#triumphs}}
            <li>Triumphs: {{triumphs}}</li>
            {{/triumphs}}
            {{#descpairs}}
            <li>Despairs: {{descpairs}}</li>
            {{/descpairs}}
        {{/results}}
        </ul>
    </div>
</div>
`;

export default tpl;