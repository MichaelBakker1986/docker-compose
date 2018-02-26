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
    this.warnings = []
    this.changed = true;
    this.lines = []
}

ChangeManager.prototype.setModelChanged = function() {
    this.changed = true;
}

/**
 * Extract:
 * tuple =+test Implies
 * tuple -test
 * variable =test refers to
 * =test refers to
 * To: test
 */
ChangeManager.prototype.extractName = function(line) {
    return line.replace(/(?:variable |tuple |function )?\s*(?:\+?-?=?)+(\w+).*/i, "$1")
}
ChangeManager.prototype.isVariableLine = function(line) {
    return /^(?:variable |tuple |function )?\s*(?:\+?-?=?)+(\w+)\s*(?:Refers to \w+|Implies \w+)?\s*\n\s*{/igm.test(line)
}
ChangeManager.prototype.syntaxCheck = function(ffl) {
    try {
        this.register.clean();
        const formatter = new Formatter(this.register, ffl)
        formatter.parseProperties()
        this.error = null
    } catch (err) {
        this.error = err.toString()
        console.error('Error while checking syntax', err)
    }
}

ChangeManager.prototype.validCurrentLine = function(line, nextline) {
    const trimmed = String(line).replace(/\s+/gmi, ' ').trim();
    const trimmedNextLine = String(nextline).replace(/\s+/gmi, ' ').trim();
    return trimmed.endsWith(';') || this.isVariableLine(trimmed + '\n' + trimmedNextLine)
}
/**
 * When cursor is changed in file, adept state. Set active variable
 */
ChangeManager.prototype.updateCursor = function(ffl, cursor) {
    this.warnings.length = 0;
    //will also update the register
    if (this.changed) {
        this.syntaxCheck(ffl, cursor);
        this.lines = ffl.split('\n')
        this.namedIndex = this.register.getIndex('name');
        const idIndex = this.register.getIndex('i');
        const names = this.register.getAll('name')
        const doubles = {}
        for (var i = 0; i < names.length; i++) {
            if (doubles[names[i]]) {
                this.warnings.push({
                    pos    : doubles[names[i]],
                    message: "duplicate variablename" + names[i]
                })
                doubles[names[i]].push(i);
            }
            doubles[names[i]] = [i];
        }
    }

    var currentVariable;
    for (var i = cursor.row; i > 0; i--) {
        if ((this.lines[i] || '').match(/(variable |tuple |root|model )/)) {
            currentVariable = this.extractName(this.lines[i].trim())
            break;
        }
    }
    const changedCurrentVariable = this.currentVariableName != currentVariable;
    if ((this.changed || changedCurrentVariable) && currentVariable && this.namedIndex[currentVariable]) {
        this.currentVariableName = currentVariable
        var variable = this.register.createInformationObject(this.currentVariableName, new RegisterToFFL(this.register).hiddenProperties)
        this.currentVariable = variable
    }
    this.changed = false;
}
exports.ChangeManager = ChangeManager