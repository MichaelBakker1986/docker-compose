const log = require('log6')

function RegisterFormulaBuilder(register) {

    const referstoIndex = register.schemaIndexes.refersto;
    const nameIndex = register.schemaIndexes.name;
    const formulaindex = register.schemaIndexes.formula;
    const trend_formulaIndex = register.schemaIndexes.formula_trend;
    const notrend_formulaIndex = register.schemaIndexes.formula_notrend;
    const aggregationIndex = register.schemaIndexes.aggregation;
    const modifierIndex = register.schemaIndexes.modifier;
    const treeIndex = register.schemaIndexes.treeindex;
    const parentNameIndex = register.schemaIndexes.parentId;
    const childIndex = register.schemaIndexes.children;
    const inherited = {}
    const names = register.getIndex('name');

    function Builder() {
    }

    Builder.prototype.inherit = function(node) {
        //only inherit properties once.
        //INFO: inheritance could also be possible via database
        if (names.root == node) return
        if (!inherited[node[nameIndex]]) {
            inherited[node[nameIndex]] = true
            const supertype = node[referstoIndex] ? names[node[referstoIndex]] : names.root
            if (log.DEBUG && supertype == null) log.debug('RefersTo: [' + node[referstoIndex] + '] is declared in the model but does not exsists');
            //first inherit from parents of parents.
            if (supertype[referstoIndex]) this.inherit(supertype)
            for (var i = 0; i < supertype.length; i++) {
                if (node[i] == null) node[i] = supertype[i];
            }
        }
    }
    Builder.prototype.buildFFLFormula = function(node, summable) {
        var valueFormula;
        if (node[referstoIndex]) {
            valueFormula = node[referstoIndex]
        } else {
            var trendformula = node[trend_formulaIndex];
            valueFormula = node[notrend_formulaIndex] || node[formulaindex];//notrend is more specific than formula
            if (trendformula != null && valueFormula != trendformula) {//first of all, if both formula's are identical. We can skip the exercise
                valueFormula = 'If(IsTrend,' + trendformula + ',' + (valueFormula ? valueFormula : 'NA') + ')';
            }
            if (summable && node[aggregationIndex] == 'flow') {
                valueFormula = 'If(TimeAggregated,Aggregate(Self,x),' + (valueFormula ? valueFormula : 'NA') + ')'
            }
            if (node[modifierIndex] && node[modifierIndex].indexOf('=') > -1) {
                const treeIdx = (node[treeIndex] - 2)
                const siblings = register.i[node[parentNameIndex]][childIndex]
                var sumformula = [];

                for (var i = treeIdx; i >= 0; i--) {
                    const sibling_modifier = siblings[i][modifierIndex];
                    if (sibling_modifier) {
                        if (sibling_modifier.indexOf('=') > -1) break
                        const withouttotal = sibling_modifier.replace(/=/, '');
                        if (withouttotal.length > 0) sumformula.push(withouttotal + siblings[i][nameIndex]);
                    }
                }
                //if (valueFormula) log.error(nodeName + '=\n' + sumformula.reverse().join('') + '\nformula:\n' + valueFormula)
                valueFormula = sumformula.reverse().join('');
            }
        }
        return valueFormula;
    }
    return new Builder();
}

module.exports = RegisterFormulaBuilder