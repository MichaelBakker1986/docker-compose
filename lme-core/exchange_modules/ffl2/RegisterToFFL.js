/**
 * Used in front-end to reassemble the FFL file when needed.
 */
const StringBuffer = require('../../../model-tests/StringUtils').StringBuffer
//extract underlying data-model
//make an register, schema - indexed with array values
//Can expand while adding more properties and keeps its integrity
//schema and nodes
//re-use over implementations

function RegisterToFFL(register) {
    this.schema = register.schema;
    register.createIndex('name')
    //this.nodes = register.getIndex('name');
    this.vars = register.getIndex('name');
    this.child = {}
    this.nameIndex = register.schemaIndexes.name;
    this.descIndex = register.schemaIndexes.desc;
    this.treeIndex = register.schemaIndexes.treeindex;
    this.parentNameIndex = register.schemaIndexes.parentId;
    this.stringIndex = register.schemaIndexes.index;
    this.modifierIndex = register.schemaIndexes.modifier;
    this.referstoIndex = register.schemaIndexes.refersto;
    this.tupleIndex = register.schemaIndexes.tuple;
    this.displaytypeIndex = register.schemaIndexes.displaytype;
    this.visibleIndex = register.schemaIndexes.visible;
    this.decimalsIndex = register.schemaIndexes.fixed_decimals;
    this.datatypeIndex = register.schemaIndexes.datatype;
    this.frequencyIndex = register.schemaIndexes.frequency;
    this.formulaindex = register.schemaIndexes.formula;
    this.lockedIndex = register.schemaIndexes.locked;
    this.requiredIndex = register.schemaIndexes.required;
    this.childIndex = register.schemaIndexes.children;
    this.output = "";
    this.delimiter = ';'
    this.line_delimiter = '\n'
    //some properties are generated for the tree structure, and cannot be changes manually
    this.variableProperties = [this.nameIndex, this.modifierIndex, this.referstoIndex, this.tupleIndex]
    this.hiddenProperties = [this.treeIndex, this.stringIndex, this.schema.indexOf('version'), this.parentNameIndex, this.childIndex, this.descIndex]
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

    this.shiftindent = shiftindent;
    this.formulaIndexes = []
    var formulas = ['valid', 'title', 'hint', 'locked', 'visible', 'required', 'choices']
    for (var i = 0; i < formulas.length; i++) {
        this.formulaIndexes.push(register.schemaIndexes[formulas[i]])
    }
    this.defaultValues = [];
    this.defaultValues[this.visibleIndex] = {
        undefined: true,
        null: true,
        '1.0': true,
        '1': true,
        'true': true,
        'On': true
    }
    this.defaultValues[this.lockedIndex] = {
        undefined: true,
        null: true,
        '0.0': true,
        '0': true,
        'false': true,
        'Off': true,
        'No': true
    }
    this.defaultValues[this.requiredIndex] = {
        undefined: true,
        null: true,
        '0.0': true,
        '0': true,
        'false': true,
        'No': true,
        'Off': true
    }
}

RegisterToFFL.prototype.toGeneratedCommaSeperated = function(rooNodeName) {
    const delimiter = this.delimiter;
    const hidden = this.hiddenProperties;
    const lines = []
    const rootNode = this.vars[rooNodeName || 'root']
    this.walk(rootNode, 0, function(variable, depth) {
        lines.push(new StringBuffer().append(" ".repeat(depth)).append(variable.filter(function(value, index) {
            return hidden.indexOf(index) == -1;
        }).join(delimiter)).toString());
    })
    this.output = lines.join(this.line_delimiter);
    return this.output;
}
RegisterToFFL.prototype.walk = function(node, depth, visitor) {
    visitor(node, depth)
    const childs = node[this.childIndex];
    for (var i = 0; i < childs.length; i++) {
        this.walk(childs[i], depth + 1, visitor)
    }
}
RegisterToFFL.prototype.validate = function(line) {
    return (this.schema.length - this.hiddenProperties.length) == ((line.match(/;/g) || []).length + 1)
}

/**
 * TODO: internationalization should happen here, inject constants on placeholders
 */
RegisterToFFL.prototype.toGeneratedFFL = function(rootVariableName, modelName) {
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
    const rootNode = this.vars[rootVariableName || 'root'];
    this.walk(rootNode, 1, function(node, depth) {
        const items = [];
        if (cdept >= depth) items.push(shiftindent[cdept][(cdept - depth)])
        items.push(indents[depth])
        items.push(node[tidx] ? tuple : variable)
        items.push(node[midx] || "")
        items.push(node[nidx])
        if (ridx != -1 && node[ridx]) {
            items.push(rname);
            items.push(node[ridx])
        }
        items.push("\n")
        items.push(indents[depth])

        const props = []
        for (var i = 0; i < relevant.length; i++) {
            const real = relevant[i]
            if (node[real]) {
                props.push([indents[depth + 1], schema[real], ": ", node[real], ";"].join(""))
            }
        }
        if (props.length > 0) {
            items.push("{\n")
            items.push(props.join("\n"))
        } else {
            items.push("{")
        }
        cdept = depth;
        formattedFFL.push(items.join(""));
    })
    formattedFFL.push(shiftindent[cdept][cdept - 1]);
    if (!rootVariableName) {
        //formattedFFL.shift()
        formattedFFL[1] = " root\n {"
        //formattedFFL[0] = "model " + (modelName || "NEW") + " uses BaseModel\n{"
        formattedFFL.shift()
    }
    return formattedFFL;
}
exports.RegisterToFFL = RegisterToFFL;