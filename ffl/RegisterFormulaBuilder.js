import { DEBUG, debug } from 'log6'

function RegisterFormulaBuilder(register) {

	const refersToIndex = register.schemaIndexes.refersto
	const nameIndex = register.schemaIndexes.name
	const formulaIndex = register.schemaIndexes.formula
	const trend_formulaIndex = register.schemaIndexes.formula_trend
	const notTrend_formulaIndex = register.schemaIndexes.formula_notrend
	const aggregationIndex = register.schemaIndexes.aggregation
	const modifierIndex = register.schemaIndexes.modifier
	const tree_index = register.schemaIndexes.tree_index
	const parentNameIndex = register.schemaIndexes.parentId
	const childIndex = register.schemaIndexes.children
	const inherited = {}
	const names = register.getIndex('name')

	function Builder() {
	}

	Builder.prototype.inherit = function(node) {
		//only inherit properties once.
		//INFO: inheritance could also be possible via database
		if (names.root === node) return
		if (!inherited[node[nameIndex]]) {
			inherited[node[nameIndex]] = true
			const supertype = node[refersToIndex] ? names[node[refersToIndex]] : names.root
			if (DEBUG && supertype == null) debug(`RefersTo: [${node[refersToIndex]}] is declared in the model but does not exists`)
			//first inherit from parents of parents.
			if (supertype[refersToIndex]) this.inherit(supertype)
			for (let i = 0; i < supertype.length; i++) {
				if (node[i] == null) node[i] = supertype[i]
			}
		}
	}
	Builder.prototype.buildFFLFormula = function(node, summable) {
		let valueFormula
		if (node[refersToIndex]) {
			valueFormula = node[refersToIndex]
		} else {
			const trend_formula = node[trend_formulaIndex]
			valueFormula = node[notTrend_formulaIndex] || node[formulaIndex]//notrend is more specific than formula
			if (trend_formula != null && valueFormula !== trend_formula) {//first of all, if both formula's are identical. We can skip the exercise
				valueFormula = `If(IsTrend,${trend_formula},${valueFormula ? valueFormula : 'NA'})`
			}
			if (summable && node[aggregationIndex] === 'flow') {
				valueFormula = `If(TimeAggregated,Aggregate(Self,x),${valueFormula ? valueFormula : 'NA'})`
			}
			if (node[modifierIndex] && node[modifierIndex].indexOf('=') > -1) {
				const treeIdx = (node[tree_index] - 2)
				const siblings = register.i[node[parentNameIndex]][childIndex]
				const sum_formula = []

				for (let i = treeIdx; i >= 0; i--) {
					const sibling_modifier = siblings[i][modifierIndex]
					if (sibling_modifier) {
						if (sibling_modifier.indexOf('=') > -1) break
						const without_total = sibling_modifier.replace(/=/, '')
						if (without_total.length > 0) sum_formula.push(without_total + siblings[i][nameIndex])
					}
				}
				valueFormula = sum_formula.reverse().join('')
			}
		}
		return valueFormula
	}
	return new Builder()
}

module.exports = RegisterFormulaBuilder