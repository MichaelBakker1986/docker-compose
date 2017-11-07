function V05CaseFix() {
    this.on = true;
}

V05CaseFix.prototype.parse = function(input) {
    input = input.replace(/Matrixlookup/gmi, 'MatrixLookup')
    input = input.replace(/Startdate/gmi, 'StartDate')
    input = input.replace(/GoodWill/gmi, 'GoodWill')
    return input;
}
exports.V05CaseFix = new V05CaseFix();