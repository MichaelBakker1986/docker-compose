require('../StringUtils')//inject .Repeat into String object
function LexialParser(data) {
    this.original = data;
    this.data = data;
    this.reassembled = '';
    this.constants = [];
    this.vars = [];
    this.comments = [];
    this.header = '';
    this.variables = {}
}

LexialParser.prototype.extractHeader = function() {
    this.header = this.original.substring(0, this.original.indexOf('{'))
}
LexialParser.prototype.extractConstants = function() {
    var constants = {};
    let index = 0;
    this.data = this.data.replace(/"(.*?)"/gm, function($0) {
        constants[++index] = $0
        return '__' + index
    })
    this.constants = constants;
}
LexialParser.prototype.insertConstants = function() {
    var constants = this.constants;
    this.reassembled = this.reassembled.replace(/__(\d+)/gm, function($1, $2) {
        return constants[parseInt($2)]
    })
}
LexialParser.prototype.extractComments = function() {
    var comments = {}
    let index = 0;
    this.data = this.data.replace(/\/\/.*/gm, function($0) {
        comments[++index] = $0
        return '____' + index
    })
    this.comments = comments;
}

LexialParser.prototype.removeWhite = function() {
    this.data = this.data.replace(/\s\s+/g, ' ')
    //TODO: parse by properties, not by semicolons
        .replace(/;\s+/g, ';')//7ms of 100ms..(V05) (expensive, but it is removing trailing whitespaces of properties)
}
LexialParser.prototype.extractVars = function() {
    let noneexit = true;
    var data = this.data;
    var index = 0;
    var vars = [];
    while (noneexit) {
        noneexit = false;
        data = data.replace(/{([^}{]*?)}/gm, function($0, $1) {
            //this happens to many times...
            noneexit = true;
            vars[++index] = $1
            return '___' + index
        })
    }
    this.vars = vars;
}
LexialParser.prototype.findRootVariable = function() {
    return this.vars.length - 1
}
LexialParser.prototype.buildTree = function() {
    this.extractHeader();
    this.extractConstants();
    this.extractComments();
    this.removeWhite();
    this.extractVars();
    var firstVar = this.findRootVariable();
    this.reassembled = this.prettyFormatFFL(1, firstVar)
    this.insertConstants();
}
LexialParser.prototype.walk = function(visit) {
    this.extractHeader();
    this.extractConstants();
    this.extractComments();
    this.removeWhite();
    this.extractVars();
    var firstVar = this.findRootVariable();
    this.vars[firstVar] = this.vars[firstVar].replace(/;root/i, ';variable root')
    this.walkTree(visit, ['root', firstVar, null, null, false, null, this.vars[firstVar].trim()], 1, firstVar)
}
LexialParser.prototype.walkTree = function(visit, var_desc, depth, index) {
    var self = this;
    const parts = this.vars[index].trim().split(';')
    const children = [];
    if (parts[parts.length - 1] == '') {
        parts.length--;
    } else {
        var temp = parts[parts.length - 1];
        parts.length--;
        temp.replace(/((?!( variable | tuple )).)+/gm, function($1) {
            //here should go tuple/modifier/refer-to extraction.
            const refIdStartIndex = $1.indexOf('___');
            const varDesc = $1.substring(0, refIdStartIndex - 1)
            const tuple = varDesc.startsWith('tuple');
            const referIdx = varDesc.toLowerCase().indexOf('refers to')
            const referstoVariableName = referIdx != -1 ? varDesc.substring(referIdx + 10) : null;
            const varname = tuple ? referIdx == -1 ? varDesc.substring(6) : varDesc.substring(6, referIdx) : referIdx == -1 ? varDesc.substring(9) : varDesc.substring(9, referIdx);
            const modifier = varname.startsWith('+') ? '+' : varname.startsWith('=') ? '=' : varname.startsWith('-') ? '-' : null;
            let name = varname.substring(modifier ? 1 : 0);
            let varRefIndex = parseInt($1.substring(refIdStartIndex + 3));
            let variable = [name, varRefIndex, modifier, var_desc[0], tuple, referstoVariableName, varDesc, children.length];
            children.push(variable)
            self.walkTree(visit, variable, depth + 1, varRefIndex)
            return ''
        });
    }
    visit(var_desc, parts, children)
}
String.prototype.format = function() {
    var formatted = this;
    for (arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};
LexialParser.prototype.prettyFormatFFL = function(depth, index) {
    var self = this;
    const indent = " ".repeat(depth);
    const variable = this.vars[index].trim()
    const parts = variable.split(';')
    const varparts = [];
    if (parts[parts.length - 1] == '') {
        parts.length--;
    } else {
        var temp = parts[parts.length - 1];
        parts.length--
        temp.replace(/((?!( variable | tuple )).)+/gm, function($1) {
            const refId = $1.indexOf('___');
            varparts.push(indent + $1.substring(0, refId - 1) + "\n" + indent + "{\n" + self.prettyFormatFFL(depth + 1, parseInt($1.substring(refId + 3))) + "\n" + indent + "}")
            return ''
        });
    }
    var lb = ';\n'
    var r;
    if (parts.length == 0) {
        if (varparts.length == 0) {
            r = ''
        } else {
            r = varparts.join('\n')
        }
    } else {
        if (varparts.length == 0) {
            r = indent + parts.join(lb + indent) + ';'
        } else {
            r = indent + parts.join(lb + indent) + ";\n" + (varparts.length > 0 ? varparts.join('\n') : ';')
        }
    }
    return r;
}

function Factory() {
    this.on = false;
    this.props = false;
}

Factory.prototype.create = function(input) {
    const lexialParser = new LexialParser(input);
    return {
        visit: function(visitor) {
            return lexialParser.walk(visitor)
        },
        change: function(index, property, value) {
            var variable = lexialParser.vars[index];
            var startSearchindex = variable.indexOf(property + ':')
            var endSearchindex = variable.indexOf(';', startSearchindex + (property.length + 1))
            var result;
            if (startSearchindex == -1) {
                result = property + ':' + value + ';' + variable
            } else {
                result = variable.substring(0, startSearchindex) + property + ":" + value + variable.substring(endSearchindex)
            }
            lexialParser.vars[index] = result
        },
        toFFL: function() {
            lexialParser.reassembled = lexialParser.prettyFormatFFL(1, lexialParser.findRootVariable())
            lexialParser.insertConstants();
            return lexialParser.header + '{\n' + lexialParser.reassembled + '\n}'
        }
    }
}
Factory.prototype.parse = function(input) {
    let lexialParser = new LexialParser(input);
    lexialParser.props = this.props;
    lexialParser.buildTree();
    return {
        toString: function() {
            return lexialParser.header + '{\n' + lexialParser.reassembled + '\n}'
        }
    };
}
exports.LexialParser = new Factory();
