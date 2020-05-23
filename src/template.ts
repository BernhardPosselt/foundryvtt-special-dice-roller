const base = `
<div class="special-dice-roller">
    <div>
        {{#flavorText}}
        <span class="flavor-text">{{flavorText}}</span>
        {{/flavorText}}
        <form>
            {{#rolls}}
            <input
                class="{{#wasReRoll}}special-dice-roller-was-re-roll{{/wasReRoll}}"
                type="checkbox"
                style="background-image: url('modules/special-dice-roller/public/images/{{system}}/{{imageName}}.png')"
                name="roll{{rollIndex}}"
                data-die="{{die}}"
                data-face="{{face}}"
                {{#noSelectionPossible}}disabled="disabled"{{/noSelectionPossible}}
            >
            {{/rolls}}
            {{#canReRoll}}
            <button class="special-dice-roller-reroll" data-roller="{{system}}">re-roll selected</button>
            {{/canReRoll}}
            {{#canKeep}}
            <button class="special-dice-roller-keep" data-roller="{{system}}">keep selected</button>
            {{/canKeep}}
        </form>
    </div>
    <hr>
    <div>
        {{> interpretation}}
    </div>
</div>
`;

export default base;
