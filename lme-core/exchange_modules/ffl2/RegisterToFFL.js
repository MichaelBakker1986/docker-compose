/**
 * Used in front-end to reassemble the FFL file when needed.
 */
const StringBuffer = require('../../../model-tests/StringUtils').StringBuffer
//extract underlying data-model
//make an register, schema - indexed with array values
//Can expand while adding more properties and keeps its integrity
//schema and nodes
//re-use over implementations

function RegisterToFFL(register, model) {
    this.schema = model.schema;
    this.nodes = model.nodes;
    this.vars = {};
    this.child = {}
    this.nameIndex = this.schema.indexOf('name');
    this.treeIndex = this.schema.indexOf('treeindex');
    this.parentNameIndex = this.schema.indexOf('parentId');
    this.stringIndex = this.schema.indexOf('index');
    this.modifierIndex = this.schema.indexOf('modifier');
    this.referstoIndex = this.schema.indexOf('refersto');
    this.tupleIndex = this.schema.indexOf('tuple');
    this.displaytypeIndex = this.schema.indexOf('displaytype');
    this.visibleIndex = this.schema.indexOf('visible');
    this.decimalsIndex = this.schema.indexOf('fixed_decimals');
    this.datatypeIndex = this.schema.indexOf('datatype');
    this.frequencyIndex = this.schema.indexOf('frequency');
    this.output = "";
    this.delimiter = ';'
    this.line_delimiter = '\n'
    //some properties are generated for the tree structure, and cannot be changes manually
    this.variableProperties = [this.nameIndex, this.modifierIndex, this.referstoIndex, this.tupleIndex]
    this.hiddenProperties = [this.treeIndex, this.stringIndex, this.schema.indexOf('version'), this.parentNameIndex]
    this.indents = [];
    const depth = 30
    for (var i = 0; i < depth; i++) {
        this.indents[i] = new Array(i).join(" ")
    }
    this.relevant = []
    for (var i = 0; i < this.schema.length; i++) {
        if ((this.hiddenProperties.indexOf(i) == -1) && (this.variableProperties.indexOf(i) == -1)) {
            this.relevant.push(i)
        }
    }
    //creating indents + brackets
    const shiftindent = [];
    for (var i = 0; i < depth; i++) {
        shiftindent[i] = []
        for (var j = 0; j <= i; j++) {
            var item = [];
            for (var k = 0; k <= j; k++) {
                item.push(new Array(i - k).join(" "))
                item.push("}\n")
            }
            shiftindent[i][j] = item.join("")
        }
    }
    this.formulaindex = this.schema.indexOf('formula');
    this.shiftindent = shiftindent;
    this.formulaIndexes = []
    var formulas = ['valid', 'title', 'hint', 'locked', 'visible', 'required', 'choices']
    for (var i = 0; i < formulas.length; i++) {
        this.formulaIndexes.push(this.schema.indexOf(formulas[i]))
    }
    this.defaultValues = [];
    this.defaultValues[this.schema.indexOf('visible')] = {
        undefined: true,
        null: true,
        '1.0': true,
        '1': true,
        'true': true,
        'On': true
    }
    this.defaultValues[this.schema.indexOf('locked')] = {
        undefined: true,
        null: true,
        '0.0': true,
        '0': true,
        'false': true,
        'Off': true,
        'No': true
    }
    this.defaultValues[this.schema.indexOf('required')] = {
        undefined: true,
        null: true,
        '0.0': true,
        '0': true,
        'false': true,
        'No': true,
        'Off': true
    }
}

RegisterToFFL.prototype.addNode = function(name, index, node, parentName) {
    this.vars[name] = node;
    this.child[parentName] = this.child[parentName] || []
    this.child[parentName][index] = name
}
RegisterToFFL.prototype.toGeneratedCommaSeperated = function(rooNodeName) {
    const delimiter = this.delimiter;
    const hidden = this.hiddenProperties;
    const lines = []
    this.walk(rooNodeName || 'root', 0, function(variable, depth) {
        lines.push(new StringBuffer().append(" ".repeat(depth)).append(variable.filter(function(value, index) {
            return hidden.indexOf(index) == -1;
        }).join(delimiter)).toString());
    })
    this.output = lines.join(this.line_delimiter);
    return this.output;
}
RegisterToFFL.prototype.walk = function(variableName, depth, visitor) {
    visitor(this.vars[variableName], depth)
    if (this.child[variableName]) {
        for (var i = 0; i < this.child[variableName].length; i++) {
            var childName = this.child[variableName][i];
            if (childName) {
                this.walk(childName, depth + 1, visitor)
            }
        }
    }
}
RegisterToFFL.prototype.indexProperties = function() {
    for (var i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        this.addNode(node[this.nameIndex], node[this.treeIndex], node, node[this.parentNameIndex])
    }
}
RegisterToFFL.prototype.validate = function(line) {
    return (this.schema.length - this.hiddenProperties.length) == ((line.match(/;/g) || []).length + 1)
}

RegisterToFFL.prototype.doProx = function doProx(name, metaData, paramIndex) {
    const variable = this.vars[name];
    Object.defineProperty(metaData, 'value', {
        set: function(value) {
            variable[paramIndex] = value;
        },
        get: function() {
            return variable[paramIndex] || "";
        }
    });
}
RegisterToFFL.prototype.createInformationObject = function(variableLine) {
    const variableName = variableLine.split(this.delimiter)[0].trim();
    const variable = [];
    for (var paramIndex = 0; paramIndex < this.schema.length; paramIndex++) {
        var propertyName = this.schema[paramIndex];

        if (this.hiddenProperties.indexOf(paramIndex) != -1) continue
        const metaData = {name: propertyName};
        this.doProx(variableName, metaData, paramIndex)
        variable.push(metaData)
    }
    return variable;
}
/**
 * TODO: internationalization should happen here, inject constants on placeholders
 */
RegisterToFFL.prototype.toGeneratedFFL = function(rootVariableName) {
    const formattedFFL = []
    const midx = this.modifierIndex;
    const nidx = this.nameIndex;
    const ridx = this.referstoIndex;
    const rname = " refers to "
    const indents = this.indents;
    const tidx = this.tupleIndex;
    const tuple = "tuple "
    const variable = "variable "
    //define shiftindent relevant indexes;
    const schema = this.schema;
    const relevant = this.relevant;
    const shiftindent = this.shiftindent;

    let cdept = 0;
    this.walk(rootVariableName || 'root', 3, function(node, depth) {
        const items = [];
        if (cdept >= depth) items.push(shiftindent[cdept][(cdept - depth)])
        items.push(indents[depth])
        items.push(node[tidx][0] == "f" ? variable : tuple)//TODO: make either integer or single char
        items.push(node[midx] || "")
        items.push(node[nidx])
        if (ridx != -1 && node[ridx]) {
            items.push(rname);
            items.push(node[ridx])
        }
        items.push("\n")
        items.push(indents[depth])
        items.push("{\n")
        const props = []
        for (var i = 0; i < relevant.length; i++) {
            const real = relevant[i]
            if (node[real]) {
                props.push([indents[depth + 1], schema[real], ": ", node[real], ";"].join(""))
            }
        }
        items.push(props.join("\n"))
        cdept = depth;
        formattedFFL.push(items.join(""));
    })
    formattedFFL.push(shiftindent[cdept][cdept - 1]);

    return formattedFFL;
}
exports.RegisterToFFL = RegisterToFFL;