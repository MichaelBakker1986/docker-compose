function ConvertEvaluateAsString() {
	this.on = true
}

ConvertEvaluateAsString.prototype.parse = function(input) {
	return input.replace(/EvaluateAsString/gmi, 'String')
}
export default new ConvertEvaluateAsString()