const tpl = `
<div class="l5r-roller">
    <div>
        <form>
            {{#rolls}}
            <input type="checkbox" style="background-image: url('modules/l5r-roller/public/images/v5/{{imageName}}.png')" name="roll{{rollIndex}}" data-die="{{die}}" data-face="{{face}}"/>
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
            {{#messyCritical}}
            <li class="l5r-roller-v5-messy-critical">Messy Critical</li>
            {{/messyCritical}}
            {{#bestialFailure}}
            <li>Potential Bestial Failure</li>
            {{/bestialFailure}}
        {{/results}}
        </ul>
    </div>
</div>
`;

export default tpl;