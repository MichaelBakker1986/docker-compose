/**
 * Do data-manipulations over the result of excel-connect.
 */
import { Register } from '../lme-core/index'

function MatrixManager() {
	this.register = {}
	this.matrix = []
}

/*
 * Language used by the editor
 */
MatrixManager.prototype.toFatrix = function() {
	const register = new Register(['table', 'row', 'col', 'value'])
	for (let matrix_index = 0; matrix_index < this.matrix.length; matrix_index++) {
		const table = this.matrix[matrix_index]
		const table_name = table.name
		for (let row in table.xasValues) {
			for (let col in table.xasValues[row]) {
				register.addRow([table_name, row, col, table.xasValues[row][col]])
			}
		}
	}
	let output = [['TableName', 'RowName', 'ColumnID', 'Value']]
	for (let register_index = 0; register_index < register.i.length; register_index++) {
		const obj = register.i[register_index]
		output.push([obj[0], obj[1], obj[2], obj[3]])
	}
	output = output.map(function(el) {
		return el.map(innerEl => {
			const prefix = []
			prefix.length = Math.max(30 - String(innerEl).length, 0)
			return innerEl + prefix.join(' ')
		}).join('|')
	})
	return output.join('\n')
}
MatrixManager.prototype.setMatrices = function(matrixArg) {
	this.matrix.length = 0
	this.register = {}
	for (let table_name in matrixArg) {
		this.register[table_name] = matrixArg[table_name]
		this.matrix.push(matrixArg[table_name])
	}
}
module.exports = MatrixManager