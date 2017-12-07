/**
 * Track movement in edited file
 * Record changes made by editor
 * Syntactical checking
 * @constructor
 */
const Register = require('./Register').Register
const Formatter = require('./FFLFormatter').Formatter
const RegisterToFFL = require('./RegisterToFFL').RegisterToFFL

function ChangeManager(register) {
    this.register = register;
    this.currentVariable = []
    this.currentVariableName = null
    this.error = null;
}

function extractName(line) {
    return line.replace(/(?:variable|tuple)\s*(\w+).*/i, "$1")
}

ChangeManager.prototype.syntaxCheck = function(ffl) {
    try {
        this.register.clean();
        const formatter = new Formatter(this.register, ffl)
        formatter.parseProperties()
        this.error = null
    } catch (err) {
        this.error = err.toString()
        console.error(err)
    }
}

/**
 * When cursor is changed in file, adept state. Set active variable
 */
ChangeManager.prototype.updateCursor = function(ffl, cursor) {
    //will also update the register
    this.syntaxCheck(ffl, cursor);
    const lines = ffl.split('\n')
    let currentVariable;
    for (var i = cursor.row; i > 0; i--) {
        if (lines[i].match(/(variable |tuple |root|model )/)) {
            currentVariable = extractName(lines[i].trim())
            break;
        }
    }
    if (currentVariable && this.register.getIndex('name')[currentVariable]) {
        this.currentVariableName = currentVariable
        var variable = this.register.createInformationObject(this.currentVariableName, new RegisterToFFL(this.register).hiddenProperties)
        this.currentVariable = variable
    }
}


exports.ChangeManager = ChangeManager