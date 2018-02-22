/**
 * @Deprecated, use Register.js
 */
function Solution(solutionName) {
    this.name = solutionName;
    this.nodes = [];
    this.formulas = new Set();
}

Solution.prototype.getFormulaKeys = function() {
    const temp_array = []
    this.formulas.forEach(function(v) {
        temp_array.push(v)
    });
    return temp_array;
}
Solution.prototype.createNode = function(formulaId, displaytype, n) {
    n.displaytype = (displaytype || 'string')
    if (formulaId !== undefined) this.formulas.add(formulaId);
    this.nodes.push(n);
}

module.exports = Solution;