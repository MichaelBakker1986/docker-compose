/**
 * All indexed will be linked to a array of values, like a DB structure
 * Lightweigt data-model
 * Creating a simple-typed DB is easy. When this functionality in growing exponentially introduce in memory-db..
 * For now this is a easy data-structure for many problems. very close to JS/NodeJS
 * @constructor
 */
function Register(schema_defualts) {
    this.schema = []
    this.createdIndexes = []
    this.schema_defaults = schema_defualts || ['desc', 'start', 'end', 'name', 'index', 'modifier', 'parentId', 'tuple', 'refersto', 'treeindex', 'children', 'valid']//expect 'valid' to exist
    this.clean()
    this.changes = []
}

Register.prototype.setFormatters = function(formatters) {
    for (var i = 0; i < formatters.length; i++) {
        this.formatters[i] = formatters[i];
    }
}
Register.prototype.clean = function() {
    this.header = null;
    this.constants = []
    this.formatters = []
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
Register.prototype.addIndex = function(name) {
    this.createIndex(name)
    return this[name]
}
//can only be unique indexes, string based.
Register.prototype.createIndex = function(name) {
    if (!this[name]) {
        this.createdIndexes.push(name)
        const index = {}, i = this.i, ni = this.schemaIndexes[name];
        for (var c = 0; c < i.length; c++) index[i[c][ni]] = i[c]
        this[name] = index
    }
}
//this will also update indexes...
Register.prototype.addRowSave = function(row) {
    this.i.push(row)
    for (var i = 0; i < this.createdIndexes.length; i++) {
        const index = this.createdIndexes[i];
        this[index][row[this.schemaIndexes[index]]] = row
    }
    return this.i.length - 1
}
//insert (quick)
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
Register.prototype.print = function(idxMap, start, filter) {
    return this.printArr(this.i, idxMap, this.mark || start, filter)
}
Register.prototype.printArr = function(arr, idxMap, start, filter) {
    const tout = []
    const self = this;
    const filtermap = []
    for (var i = 0; i < filter.length; i++) filtermap[this.schemaIndexes[filter[i]]] = true
    const f = function(el, idx) {
        return filtermap[idx]
    }
    for (var i = (start || 0); i < arr.length; i++) {
        const el = arr[i];
        tout.push((filter ? el.filter(f) : el).map(function(innerEl, idx) {
            const v = self.formatters[idx] ? self.formatters[idx](innerEl) : innerEl
            const prefix = [];
            prefix.length = Math.max(idxMap[idx] - String(v).length, 0);
            return String(v).slice(0, idxMap[idx] - 1) + prefix.join(' ')
        }).join("|"))
    }
    return tout
}
/** * mark current moment as last checkpoint */
Register.prototype.markNow = function() {
    this.mark = this.i.length;
}
Register.prototype.toString = function() {
    return "variables:[" + this.i.length + "]\n" + this.i.join('\n')
}
exports.Register = Register