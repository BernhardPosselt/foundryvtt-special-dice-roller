const tpl = `
{{#results}}
    <div class="dice-roll">
        <div class="dice-result">
            {{^negative}}
            <div class="dice-tooltip">
                <section class="tooltip-part">
                    <div class="dice">
                        <ol class="dice-rolls">
                            {{#key1}}<li class="roll die d6 max">1</li>{{/key1}}
                            {{#key2}}<li class="roll die d6 max">2</li>{{/key2}}
                            {{#key3}}<li class="roll die d6 max">3</li>{{/key3}}
                            {{#key4}}<li class="roll die d6 max">4</li>{{/key4}}
                            {{#key5}}<li class="roll die d6 max">5</li>{{/key5}}
                            {{#key6}}<li class="roll die d6 max">6</li>{{/key6}}
                        </ol>
                    </div>
                </section>
            </div>
            {{/negative}}
            {{#negative}}
            <div class="dice-tooltip">
                <section class="tooltip-part">
                    <div class="dice">
                        <ol class="dice-rolls">
                            {{#key1}}<li class="roll die d6 min">1</li>{{/key1}}
                            {{#key2}}<li class="roll die d6 min">2</li>{{/key2}}
                            {{#key3}}<li class="roll die d6 min">3</li>{{/key3}}
                            {{#key4}}<li class="roll die d6 min">4</li>{{/key4}}
                            {{#key5}}<li class="roll die d6 min">5</li>{{/key5}}
                            {{#key6}}<li class="roll die d6 min">6</li>{{/key6}}
                        </ol>
                    </div>
                </section>
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
