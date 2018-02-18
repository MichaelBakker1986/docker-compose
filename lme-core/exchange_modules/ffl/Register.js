/**
 * All indexed will be linked to a array of values, like a DB structure
 * Lightweigt data-model
 * @constructor
 */
function Register(schema_defualts) {
    this.schema = []
    this.createdIndexes = []
    this.schema_defaults = schema_defualts || ['desc', 'start', 'end', 'name', 'index', 'modifier', 'parentId', 'tuple', 'refersto', 'treeindex', 'children', 'valid']//expect 'valid' to exist
    this.clean()
    this.changes = []
}

Register.prototype.clean = function() {
    this.header = null;
    this.constants = []
    for (var j = 0; j < this.createdIndexes.length; j++) delete this[this.createdIndexes[j]];
    this.createdIndexes = []
    this.schema.length = 0
    this.i = []
    this.schemaIndexes = {}
    //somehow 'valid' is a real important property
    //{{MODEL_VARIABLENAME_undefined}} will exist when 'valid' is not added to the list here. (since valid is created on demand in RegisterToLMEParser
    //Something alike if (VARIABLENAME.pattern) VARIABLENAME.valid = if(VARIABLENAME.test(VARIABLENAME),'','Invalid Input')
    //therefore adding the property 'valid 'too late while parsing.
    for (var j = 0; j < this.schema_defaults.length; j++) this.addColumn(this.schema_defaults[j]);
}
Register.prototype.getNames = function() {
    return this.getIndex('name')
}
Register.prototype.getIndex = function(name) {
    if (!this[name]) this.createIndex(name)
    return this[name]
}
Register.prototype.lastRowIndex = function() {
    return this.i.length - 1
}
Register.prototype.addColumn = function(name) {
    if (this.schemaIndexes[name] == null) {
        this.schemaIndexes[name] = this.schema.length
        this.schema.push(name)
    }
}
Register.prototype.value = function(idx, key, value) {
    this.i[idx][this.schemaIndexes[key]] = value
}
Register.prototype.find = function(key, value, start) {
    const result = []
    for (var i = (start || 0); i < this.i.length; i++) if (this.i[i][this.schemaIndexes[key]] === value) result.push(this.i[i])
    return result;
}
Register.prototype.distinctArr = function(arr, schema, start) {
    const result = []
    const combi = {}
    const schemaIndexes = this.schemaIndexes;
    const distinctIndex = schema.map(function(el) {
        return schemaIndexes[el]
    })
    for (var i = (start || 0); i < arr.length; i++) {
        const row = arr[i]
        var key = ''
        for (var j = 0; j < distinctIndex.length; j++) key += '_' + row[distinctIndex[j]];
        if (!combi[key]) {
            result.push(row);
            combi[key] = true
        }
    }
    return result;
}
//can only be unique indexes, string based.
Register.prototype.createIndex = function(name) {
    if (!this[name]) {
        this.createdIndexes.push(name)
        const index = {}
        const a = this.i
        for (var i = 0; i < a.length; i++) index[a[i][this.schemaIndexes[name]]] = a[i]
        this[name] = index
    }
}
Register.prototype.addRow = function(row) {
    this.i.push(row)
    return this.i.length - 1
}
/*Inheritance belongs to the Register! this data-structure supports it. DB+Inheritance data-model */
Register.prototype.inheritProperty = function(name, paramIndex) {
    const variable = this.getIndex('name')[name]
    if (variable[paramIndex]) return variable[paramIndex]
    if (variable[this.schemaIndexes.refersto]) return this.inheritProperty(variable[this.schemaIndexes.refersto], paramIndex)
    return "";
}
Register.prototype.doProx = function doProx(name, metaData, paramIndex) {
    const register = this;
    const variable = this.getIndex('name')[name];
    Object.defineProperty(metaData, 'value', {
        set: function(value) {
            variable[paramIndex] = value;
            register.changes.push({
                name : name,
                param: paramIndex
            })
        },
        get: function() {
            return register.inheritProperty(name, paramIndex);
        }
    });
}
Register.prototype.createInformationObject = function(name, hidden) {
    const variable = [];
    for (var paramIndex = 0; paramIndex < this.schema.length; paramIndex++) {
        var propertyName = this.schema[paramIndex];

        if (hidden.indexOf(paramIndex) != -1) continue
        const metaData = { name: propertyName };
        this.doProx(name, metaData, paramIndex)
        variable.push(metaData)
    }
    return variable;
}
Register.prototype.getAll = function(name) {
    const r = [], index = this.i, indexpos = this.schemaIndexes[name];
    for (var i = 0; i < index.length; i++) r[i] = index[i][indexpos]
    return r;
}
Register.prototype.walk = function(node, depth, visitor) {
    visitor(node, depth)
    const childs = node[this.schemaIndexes.children];
    for (var i = 0; i < childs.length; i++) {
        this.walk(childs[i], depth + 1, visitor)
    }
}
Register.prototype.print = function(idxMap) {
    return this.printArr(this.i, idxMap)
}
Register.prototype.printArr = function(arr, idxMap) {
    const tout = []
    for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        tout.push(el.map(function(innerEl, idx) {
            const prefix = [];
            prefix.length = Math.max(idxMap[idx] - String(innerEl).length, 0);
            return String(innerEl).slice(0, idxMap[idx] - 1) + prefix.join(' ')
        }).join("|"))
    }
    return tout
}
Register.prototype.toString = function() {
    return "variables:[" + this.i.length + "]\n" + this.i.join('\n')
}
exports.Register = Register