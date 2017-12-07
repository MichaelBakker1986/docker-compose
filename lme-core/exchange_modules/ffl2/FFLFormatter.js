/**
 * Is a FFL quick-formatter (V05 '3.1m chars' 90ms) and is FFL to indexed formatter
 */
function FFLFormatter(register, data) {
    this.register = register;
    register.addColumn('desc')
    this.vars = register.getIndex('i')
    this.original = data;
    this.data = data;
    this.reassembled = '';
    this.constants = [];
    this.comments = [];
    this.header = '';
    this.indents = [];
    for (var i = 0; i < 30; i++) {
        this.indents[i] = new Array(i).join(" ")
    }
}

/**
 * Extract imports, model name,comments in header
 */
FFLFormatter.prototype.extractHeader = function() {
    this.header = this.original.substring(0, this.original.indexOf('{'))
    //INFO: the header is not indexed.
    this.register.header = this.header;
    const headerLines = this.header.split('\n');
    for (var i = 0; i < headerLines.length; i++) {
        var headerLine = headerLines[i].trim();
        let modelName;
        if (modelName = headerLine.match(/^\s*model (\w+)/i)) {
            this.name = modelName[1];
            break;
        }
    }
}
FFLFormatter.prototype.extractConstants = function() {
    var constants = {};
    let index = 0;
    this.data = this.data.replace(/"(.*?)"/gm, function($0) {
        constants[++index] = $0
        return '__' + index
    })
    this.constants = constants;
}
FFLFormatter.prototype.insertConstants = function() {
    var constants = this.constants;
    this.reassembled = this.reassembled.replace(/__(\d+)/gm, function($1, $2) {
        return constants[parseInt($2)]
    })
}
FFLFormatter.prototype.extractComments = function() {
    var comments = {}
    let index = 0;
    this.data = this.data.replace(/\/\/.*/gm, function($0) {
        comments[++index] = $0
        return '____' + index
    })
    this.comments = comments;
}

FFLFormatter.prototype.removeWhite = function() {
    this.data = this.data.replace(/\s\s+/g, ' ')
    //TODO: parse by properties, not by semicolons
        .replace(/;\s+/g, ';')//7ms of 100ms..(V05) (expensive, but it is removing trailing whitespaces of properties)
}
FFLFormatter.prototype.extractVars = function() {
    let noneexit = true;
    var data = this.data;
    var index = 0;
    const vars = [];
    const register = this.register;
    while (noneexit) {
        noneexit = false;
        data = data.replace(/{([^}{]*?)}/gm, function($0, $1) {
            //this happens to many times...
            noneexit = true;
            const index = register.addRow([$1])
            return '___' + index
        })
    }
    //  this.vars = vars;
}
FFLFormatter.prototype.findRootVariable = function() {
    return this.register.lastRowIndex()

}
FFLFormatter.prototype.buildTree = function() {
    this.extractHeader();
    this.extractConstants();
    this.extractComments();
    this.removeWhite();
    this.extractVars();
    var firstVar = this.findRootVariable();
    this.reassembled = this.prettyFormatFFL(2, firstVar)
    this.insertConstants();
}
FFLFormatter.prototype.walk = function(visit) {
    this.extractHeader();
    this.extractConstants();
    this.extractComments();
    this.removeWhite();
    this.extractVars();
    var firstVar = this.register.lastRowIndex();
    const firstRow = this.vars[firstVar];
    firstRow[0] = firstRow[0].replace(/root /gi, 'variable root ').trim()

    //this is a trick, not wrong!. parent and child index are the same to start with root.
    firstRow.push('root', firstVar, null, null, null, null, 0, [])
    this.walkTree(visit, firstVar, 1)
}
FFLFormatter.prototype.walkTree = function(visit, parentId, depth) {
    var self = this;
    const parts = this.vars[parentId][0].trim().split(';')
    let children = 0;
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
            const modifier = varname.startsWith('+=') ? "+=" : varname.startsWith('+') ? '+' : varname.startsWith('=') ? '=' : varname.startsWith('-') ? '-' : null;
            const name = varname.substring(modifier ? modifier.length : 0).trim();//it might be a double space in the end. its too easy to trim.
            const varRefIndex = parseInt($1.substring(refIdStartIndex + 3));

            const variable = self.vars[varRefIndex];
            variable.push(name, varRefIndex, modifier, parentId, tuple, referstoVariableName, ++children, [])

            self.vars[parentId][8].push(variable)
            self.walkTree(visit, varRefIndex, depth + 1)
            return ''
        });
    }
    visit(parentId, parts)
}
//test if this is quicker than indexing, and recreate FFL
//scorecardTool is using this, internally
FFLFormatter.prototype.prettyFormatFFL = function(depth, index) {
    var self = this;
    const indent = this.indents[depth];
    const variable = this.vars[index][0].trim()
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
var formulaMapping = {inputRequired: 'required'}
FFLFormatter.prototype.lookupConstant = function(index) {
    return this.constants[parseInt(index.substring(2))].replace(/'/g, "\\'").replace(/(?:\\r\\n|\\r|\\n)/g, "[br]")
}
FFLFormatter.prototype.parseProperties = function() {
    const register = this.register;
    const index = register.getIndex('i');
    const formatter = this;
    this.walk(function(v, raw_properties) {
            for (let i = 0; i < raw_properties.length; i++) {
                const p = raw_properties[i];
                const p_seperator_index = p.indexOf(':');//can't use split. some properties use multiple :
                let key = p.substring(0, p_seperator_index).trim();
                key = formulaMapping[key] || key
                register.addColumn(key)
                let value = p.substring(p_seperator_index + 1).trim();
                //TODO: internationalization should not happen here:
                //TODO: But to introduce Internationalization will take a day.
                //TODO: So thats why we are injecting constant Strings here.
                //TODO: making the model one language only for now
                if (value.startsWith('__')) value = formatter.lookupConstant(value)
                register.value(v, key, value)
            }
        }
    )
}

function Factory() {
    this.on = false;
}

//TODO: remove this factory.
Factory.prototype.create = function(register, input) {
    const lexialParser = new FFLFormatter(register, input);
    return {
        indexProperties: function() {
            lexialParser.parseProperties()
        },
        visit: function(visitor) {
            return lexialParser.walk(visitor)
        },
        lookupConstant: function(index) {
            return lexialParser.constants[parseInt(index.substring(2))].replace(/'/g, "\\'").replace(/(?:\\r\\n|\\r|\\n)/g, "[br]");
        },
        //optional
        modelName: function() {
            return lexialParser.name;
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
        },
        toString: function() {
            lexialParser.buildTree();
            return lexialParser.header + '{\n' + lexialParser.reassembled + '\n}';
        }
    }
}
exports.Formatter = FFLFormatter;
exports.FFLFormatter = new Factory();
