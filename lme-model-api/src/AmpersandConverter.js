function AmpersandConverter() {
	this.on = true
}

AmpersandConverter.prototype.parse = function(input) {
	return input.replace(/(=|,|\()\s{0,4}\&/gm, ' $1 ')
}
export default new AmpersandConverter()