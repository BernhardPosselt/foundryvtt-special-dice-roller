const tpl = `
<div class="l5r-roller">
    <div>
        <form>
            {{#rolls}}
            <input type="checkbox" style="background-image: url('modules/l5r-roller/images/{{imageName}}.png')" name="roll{{rollIndex}}" data-die="{{die}}" data-face="{{face}}"/>
            {{/rolls}}
            <button class="l5r-roller-reroll">re-roll selected</button>
            <button class="l5r-roller-keep">keep selected</button>
        </form>
    </div>
    <hr>
    <div>
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
            {{#failures}}
            <li>Failures: {{failures}}</li>
            {{/failures}}
        {{/results}}
        </ul>
    </div>
</div>
`;

export default tpl;