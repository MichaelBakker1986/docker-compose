function V05CaseFix() {
	this.on = true
}

V05CaseFix.prototype.parse = function(input) {
	input = input.replace(/Matrixlookup/gmi, 'MatrixLookup')
	input = input.replace(/Startdate/gmi, 'StartDate')
	input = input.replace(/GoodWill/gmi, 'GoodWill')
	return input
}
export default new V05CaseFix()