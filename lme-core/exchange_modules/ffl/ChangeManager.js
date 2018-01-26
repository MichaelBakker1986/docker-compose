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
    this.warnings.length = 0;
    //will also update the register
    if (this.changed) {
        //console.info('Changed content in FFL, reparsing all data')
        this.syntaxCheck(ffl, cursor);
        this.lines = ffl.split('\n')
        this.namedIndex = this.register.getIndex('name');
        const idIndex = this.register.getIndex('i');
        const names = this.register.getAll('name')
        const doubles = {}
        for (var i = 0; i < names.length; i++) {
            if (doubles[names[i]]) {
                this.warnings.push({
                    pos: doubles[names[i]],
                    message: "duplicate variablename" + names[i]
                })
                doubles[names[i]].push(i);
            }
            doubles[names[i]] = [i];
        }
    }

    var currentVariable;
    for (var i = cursor.row; i > 0; i--) {
        if (this.lines[i].match(/(variable |tuple |root|model )/)) {
            currentVariable = extractName(this.lines[i].trim())
            break;
        }
    }
    const changedCurrentVariable = this.currentVariableName != currentVariable;
    /* console.info(namedIndex)
     console.info(idIndex)
     console.info(doubles)*/
    if ((this.changed || changedCurrentVariable) && currentVariable && this.namedIndex[currentVariable]) {
        this.currentVariableName = currentVariable
        var variable = this.register.createInformationObject(this.currentVariableName, new RegisterToFFL(this.register).hiddenProperties)
        this.currentVariable = variable
    }
    this.changed = false;
}
exports.ChangeManager = ChangeManager