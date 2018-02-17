/**
 * Convert Register into Formula-View only
 */
const FFLFormatter = require('../lme-core/exchange_modules/ffl/FFLFormatter').Formatter
const Register = require('../lme-core/exchange_modules/ffl/Register').Register

function EconomicEditorView() {
    this.on = false;
    this.properties = true;
}

var defaultValue = {
    visible: {
        undefined: true,
        '1.0': true,
        '1': true,
        'true': true,
        'On': true
    },
    locked: {
        '0.0': true,
        '0': true,
        'false': true,
        'Off': true,
        'No': true
    },
    required: {
        '0.0': true,
        '0': true,
        'false': true,
        'No': true,
        'Off': true
    }
}

EconomicEditorView.prototype.parse = function(input, rootNodeName) {
    const indexer = new Register()
    const fflFormatter = new FFLFormatter(indexer, input)
    fflFormatter.parseProperties();

    const props = this.properties;
    const solutionName = fflFormatter.name;
    const nameIndex = indexer.schemaIndexes.name;
    const tupleIndex = indexer.schemaIndexes.tuple;
    const referstoIndex = indexer.schemaIndexes.refersto;
    const displayTypeIndex = indexer.schemaIndexes.displaytype;
    const dataTypeIndex = indexer.schemaIndexes.datatype;
    const childIndex = indexer.schemaIndexes.children;
    const choiceIndex = indexer.schemaIndexes.choices;
    const trend_formulaIndex = indexer.schemaIndexes.formula_trend;
    const lockedIndex = indexer.schemaIndexes.locked;
    const visibleIndex = indexer.schemaIndexes.visible;
    const modifierIndex = indexer.schemaIndexes.modifier;
    const requiredIndex = indexer.schemaIndexes.required;
    const formulaIndex = indexer.schemaIndexes.formula;
    const hintIndex = indexer.schemaIndexes.hint;
    const notrend_formulaIndex = indexer.schemaIndexes.formula_notrend;
    var output = [];
    const names = indexer.getIndex('name')
    const rootNode = names[rootNodeName || 'root']
    indexer.walk(rootNode, 0, function(node, depth) {
        if (depth == 0) return//skip fr
        const nodeName = node[nameIndex]
        const locked = node[lockedIndex];
        const isLocked = locked || false
        const visible = node[visibleIndex];
        const isVisible = visible || false
        const required = node[requiredIndex];
        const isRequired = required || false
        var formula = node[notrend_formulaIndex] || node[formulaIndex];
        if (node[trend_formulaIndex] && node[notrend_formulaIndex] != node[trend_formulaIndex]) formula = "If(Trend," + node[trend_formulaIndex] + "," + node[notrend_formulaIndex] + ")"
        const hasFormula = formula || false
        const hint = node[hintIndex] || false

        if (hasFormula || node[childIndex].length > 0) {
            var spaces = [];
            const total = (node[modifierIndex] || '') + nodeName + (props ? " is " + ((isLocked ? 'locked  ' : '') + (isVisible ? 'visible ' : '') + (isRequired ? 'required ' : '')) : '');
            spaces.length = Math.max((80 - total.length) - depth, 0);
            const prefix = [];
            prefix.length = depth;
            output.push(prefix.join(' ') + total + (hasFormula ? spaces.join(' ') + '=' + formula : ''));
        }
        if (props && isRequired && !defaultValue.required[required]) {
            var spaces = [];
            const total3 = (node[modifierIndex] || '') + nodeName + ".required";
            spaces.length = Math.max((80 - total3.length) - depth, 0);
            const prefix = [];
            prefix.length = depth;
            output.push(prefix.join(' ') + total3 + spaces.join(' ') + '=' + required);
        }
        if (props && isVisible && !defaultValue.visible[visible]) {
            const spaces = [];
            const total6 = (node.modifier || '') + nodeName + ".visible";
            spaces.length = Math.max((80 - total6.length) - depth, 0);
            const prefix = [];
            prefix.length = depth;
            output.push(prefix.join(' ') + total6 + spaces.join(' ') + '=' + visible);
        }
        if (props && isLocked && !defaultValue.locked[locked]) {
            const spaces = [];
            const total2 = (node.modifier || '') + nodeName + ".locked";
            spaces.length = Math.max((80 - total2.length) - depth, 0);
            const prefix = [];
            prefix.length = depth;
            output.push(prefix.join(' ') + total2 + spaces.join(' ') + '=' + locked);
        }
    })
    return output.join('\n');
}

exports.EconomicEditorView = new EconomicEditorView();

