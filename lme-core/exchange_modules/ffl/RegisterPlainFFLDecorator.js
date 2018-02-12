/**
 * Backwards compatible decorator, until all unit-tests success it will serve to fix bugs.
 */
const SolutionFacade = require('../../src/SolutionFacade')
const RegisterToLMEParser = require('./RegisterToLMEParser').RegisterToLMEParser
const FFLFormatter = require('./FFLFormatter').Formatter
const Register = require('./Register').Register

function RegisterPlainFFLToLMEParser() {
}

RegisterPlainFFLToLMEParser.prototype.name = 'ffl'
RegisterPlainFFLToLMEParser.prototype.status = 'green';
RegisterPlainFFLToLMEParser.prototype.headername = '.finance ffl';

RegisterPlainFFLToLMEParser.prototype.deParse = function(data, workbook) {
    return new RegisterToLMEParser().deParse(data, workbook)
}
RegisterPlainFFLToLMEParser.prototype.parseData = function(data, workbook) {
    /*
     * Backward compatibility:
     * Allow the register to be provided
     */
    const register = data.register || new Register()
    const raw = data.raw || data;

    const fflFormatter = new FFLFormatter(register, raw)
    fflFormatter.parseProperties();
    workbook.modelName = fflFormatter.name || workbook.modelName;
    return new RegisterToLMEParser().parseData(register, workbook)
}
exports.RegisterPlainFFLToLMEParser = RegisterPlainFFLToLMEParser;
SolutionFacade.addParser(RegisterPlainFFLToLMEParser.prototype);