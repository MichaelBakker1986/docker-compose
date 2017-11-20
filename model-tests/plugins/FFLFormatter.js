if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
        'use strict';
        if (this == null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count != count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (var i = 0; i < count; i++) {
            rpt += str;
        }
        return rpt;
    }
}

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
    this.variables['Root'] = ['root', false, 'root', null, null]
    this.reassembled = this.reassembleFfl(['Root', false], 1, firstVar)
    this.insertConstants();
}
LexialParser.prototype.reassembleFfl = function(var_desc, depth, index) {
    const self = this;
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
            //here should go tuple/modifier/refer-to extraction.
            const refId = $1.indexOf('___');
            const varDesc = $1.substring(0, refId - 1)
            const tuple = varDesc.startsWith('tuple');
            const referIdx = varDesc.toLowerCase().indexOf('refers to')
            const varname = tuple ? referIdx == -1 ? varDesc.substring(4) : varDesc.substring(4, referIdx) : referIdx == -1 ? varDesc.substring(9) : varDesc.substring(9, referIdx);
            const modifier = varname.startsWith('+') ? '+' : varname.startsWith('=') ? '=' : varname.startsWith('-') ? '-' : null;
            let name = varname.substring(modifier ? 1 : 0);
            self.variables[name] = [varDesc, tuple, name, modifier, 'ref']
            varparts.push(indent + varDesc + "\n" + indent + "{\n" + self.reassembleFfl(name, depth + 1, parseInt($1.substring(refId + 3))) + "\n" + indent + "}")
            return ''
        });
    }
    var r;
    if (parts.length == 0) {
        if (varparts.length == 0) {
            r = ''
        } else {
            r = varparts.join('\n')
        }
    } else {
        if (varparts.length == 0) {
            r = indent + parts.join(';\n' + indent) + ';'
        } else {
            r = indent + parts.join(';\n' + indent) + ";\n" + (varparts.length > 0 ? varparts.join('\n') : ';')
        }
    }
    return r;
}

function Factory() {
    this.on = false;
}

Factory.prototype.parse = function(input) {
    let lexialParser = new LexialParser(input);
    lexialParser.buildTree();
    return {
        toString: function() {
            return lexialParser.header + '{\n' + lexialParser.reassembled + '\n}'
        },
        vars: function() {
            return lexialParser.variables;
        }
    };
}
exports.LexialParser = new Factory();
