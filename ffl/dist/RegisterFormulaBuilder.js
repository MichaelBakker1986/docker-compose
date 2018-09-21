'use strict';

var _log = require('log6');

function RegisterFormulaBuilder(register) {

	var refersToIndex = register.schemaIndexes.refersto;
	var nameIndex = register.schemaIndexes.name;
	var formulaIndex = register.schemaIndexes.formula;
	var trend_formulaIndex = register.schemaIndexes.formula_trend;
	var notTrend_formulaIndex = register.schemaIndexes.formula_notrend;
	var aggregationIndex = register.schemaIndexes.aggregation;
	var modifierIndex = register.schemaIndexes.modifier;
	var tree_index = register.schemaIndexes.tree_index;
	var parentNameIndex = register.schemaIndexes.parentId;
	var childIndex = register.schemaIndexes.children;
	var inherited = {};
	var names = register.getIndex('name');

	function Builder() {}

	Builder.prototype.inherit = function (node) {
		if (names.root === node) return;
		if (!inherited[node[nameIndex]]) {
			inherited[node[nameIndex]] = true;
			var supertype = node[refersToIndex] ? names[node[refersToIndex]] : names.root;
			if (_log.DEBUG && supertype == null) (0, _log.debug)('RefersTo: [' + node[refersToIndex] + '] is declared in the model but does not exists');

			if (supertype[refersToIndex]) this.inherit(supertype);
			for (var i = 0; i < supertype.length; i++) {
				if (node[i] == null) node[i] = supertype[i];
			}
		}
	};
	Builder.prototype.buildFFLFormula = function (node, summable) {
		var valueFormula = void 0;
		if (node[refersToIndex]) {
			valueFormula = node[refersToIndex];
		} else {
			var trend_formula = node[trend_formulaIndex];
			valueFormula = node[notTrend_formulaIndex] || node[formulaIndex];
			if (trend_formula != null && valueFormula !== trend_formula) {
				valueFormula = 'If(IsTrend,' + trend_formula + ',' + (valueFormula ? valueFormula : 'NA') + ')';
			}
			if (summable && node[aggregationIndex] === 'flow') {
				valueFormula = 'If(TimeAggregated,Aggregate(Self,x),' + (valueFormula ? valueFormula : 'NA') + ')';
			}
			if (node[modifierIndex] && node[modifierIndex].indexOf('=') > -1) {
				var treeIdx = node[tree_index] - 2;
				var siblings = register.i[node[parentNameIndex]][childIndex];
				var sum_formula = [];

				for (var i = treeIdx; i >= 0; i--) {
					var sibling_modifier = siblings[i][modifierIndex];
					if (sibling_modifier) {
						if (sibling_modifier.indexOf('=') > -1) break;
						var without_total = sibling_modifier.replace(/=/, '');
						if (without_total.length > 0) sum_formula.push(without_total + siblings[i][nameIndex]);
					}
				}
				valueFormula = sum_formula.reverse().join('');
			}
		}
		return valueFormula;
	};
	return new Builder();
}

module.exports = RegisterFormulaBuilder;