const tpl = `
<div class="special-dice-roller">
    <div>
        <form>
            {{#rolls}}
            <input type="checkbox" style="background-image: url('modules/special-dice-roller/public/images/v5/{{imageName}}.png')" name="roll{{rollIndex}}" data-die="{{die}}" data-face="{{face}}"/>
            {{/rolls}}
            <button class="special-dice-roller-reroll" data-roller="v5">re-roll selected</button>
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
            <li class="special-dice-roller-v5-messy-critical">Messy Critical</li>
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