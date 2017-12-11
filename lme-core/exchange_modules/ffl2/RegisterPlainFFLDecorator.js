/**
 * Backwards compatible decorator, until all unit-tests success it will serve to fix bugs.
 */
const SolutionFacade = require('../../src/SolutionFacade')
const RegisterToLMEParser = require('./RegisterToLMEParser').RegisterToLMEParser
const FFLFormatter = require('./FFLFormatter').Formatter
const Register = require('./Register').Register

function RegisterPlainFFLToLMEParser() {
}

RegisterPlainFFLToLMEParser.prototype.name = 'ffl2_backwards'
RegisterPlainFFLToLMEParser.prototype.status = 'green';
RegisterPlainFFLToLMEParser.prototype.headername = '.finance ffl2_backwards';

RegisterPlainFFLToLMEParser.prototype.parseData = function(data, workbook) {
    const register = new Register()
    const fflFormatter = new FFLFormatter(register, data)
    fflFormatter.parseProperties();
    return new RegisterToLMEParser().parseData(register, workbook)
}
exports.RegisterPlainFFLToLMEParser = RegisterPlainFFLToLMEParser;
SolutionFacade.addParser(RegisterPlainFFLToLMEParser.prototype);