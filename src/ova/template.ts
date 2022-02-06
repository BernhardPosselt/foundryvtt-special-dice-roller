const tpl = `
{{#results}}
    <div class="dice-roll">
        <div class="dice-result">
            {{^negative}}
            <div class="dice-tooltip">
                {{#key1}}<img class="ova-best" src="modules/special-dice-roller/public/images/ova/ova-1.png" alt="1 was the best die face" title="1 was the best die face">{{/key1}}
                {{#key2}}<img class="ova-best" src="modules/special-dice-roller/public/images/ova/ova-2.png" alt="2 was the best die face" title="2 was the best die face">{{/key2}}
                {{#key3}}<img class="ova-best" src="modules/special-dice-roller/public/images/ova/ova-3.png" alt="3 was the best die face" title="3 was the best die face">{{/key3}}
                {{#key4}}<img class="ova-best" src="modules/special-dice-roller/public/images/ova/ova-4.png" alt="4 was the best die face" title="4 was the best die face">{{/key4}}
                {{#key5}}<img class="ova-best" src="modules/special-dice-roller/public/images/ova/ova-5.png" alt="5 was the best die face" title="5 was the best die face">{{/key5}}
                {{#key6}}<img class="ova-best" src="modules/special-dice-roller/public/images/ova/ova-6.png" alt="6 was the best die face" title="6 was the best die face">{{/key6}}
            </div>
            {{/negative}}
            {{#negative}}
            <div class="dice-tooltip">
                {{#key1}}<img class="ova-worst" src="modules/special-dice-roller/public/images/ova/ova-1.png" alt="1 was the worst die face" title="1 was the worst die face">{{/key1}}
                {{#key2}}<img class="ova-worst" src="modules/special-dice-roller/public/images/ova/ova-2.png" alt="2 was the worst die face" title="2 was the worst die face">{{/key2}}
                {{#key3}}<img class="ova-worst" src="modules/special-dice-roller/public/images/ova/ova-3.png" alt="3 was the worst die face" title="3 was the worst die face">{{/key3}}
                {{#key4}}<img class="ova-worst" src="modules/special-dice-roller/public/images/ova/ova-4.png" alt="4 was the worst die face" title="4 was the worst die face">{{/key4}}
                {{#key5}}<img class="ova-worst" src="modules/special-dice-roller/public/images/ova/ova-5.png" alt="5 was the worst die face" title="5 was the worst die face">{{/key5}}
                {{#key6}}<img class="ova-worst" src="modules/special-dice-roller/public/images/ova/ova-6.png" alt="6 was the worst die face" title="6 was the worst die face">{{/key6}}
            </div>
            {{/negative}}
            {{#negative}}
            <h4 class="dice-total special-dice-roller-failed">{{value}}</h4>
            {{/negative}}
            {{^negative}}
            <h4 class="dice-total special-dice-roller-succeeded">{{value}}</h4>
            {{/negative}}
        </div>
    </div>
{{/results}}
`;
export default tpl;
