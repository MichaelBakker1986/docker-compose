/**
 * All indexed will be linked to a array of values,
 * @constructor
 */
function Register() {
    this.schema = []
    this.createdIndexes = []
    this.clean()
    this.changes = []
}

Register.prototype.clean = function() {
    this.header = null;
    for (var j = 0; j < this.createdIndexes.length; j++) {
        delete this[this.createdIndexes[j]];
    }
    this.createdIndexes = []
    this.schema.length = 0
    this.i = []
    this.schemaIndexes = {}
    var schema = ['desc', 'name', 'index', 'modifier', 'parentId', 'tuple', 'refersto', 'treeindex', 'children']
    for (var j = 0; j < schema.length; j++) {
        this.addColumn(schema[j]);
    }
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
Register.prototype.find = function(key, value) {
    const idx = this.schemaIndexes[key]
    const result = []
    for (var i = 0; i < this.i.length; i++) {
        if (this.i[i][idx] === value) result.push(this.i[i])
    }
    return result;
}
//can only be unique indexes, string based.
Register.prototype.createIndex = function(name) {
    if (!this[name]) {
        this.createdIndexes.push(name)
        const index = {}
        const sindex = this.schemaIndexes[name]
        const a = this.i
        for (var i = 0; i < a.length; i++) index[a[i][sindex]] = a[i]
        this[name] = index
    }
}
Register.prototype.addRow = function(row) {
    this.i.push(row)
    return this.i.length - 1
}
Register.prototype.doProx = function doProx(name, metaData, paramIndex) {
    const register = this;
    const variable = this.getIndex('name')[name];
    Object.defineProperty(metaData, 'value', {
        set: function(value) {
            variable[paramIndex] = value;
            register.changes.push({
                name: name,
                param: paramIndex
            })
        },
        get: function() {
            return variable[paramIndex] || "";
        }
    });
}
Register.prototype.createInformationObject = function(name, hidden) {
    const variable = [];
    for (var paramIndex = 0; paramIndex < this.schema.length; paramIndex++) {
        var propertyName = this.schema[paramIndex];

        if (hidden.indexOf(paramIndex) != -1) continue
        const metaData = {name: propertyName};
        this.doProx(name, metaData, paramIndex)
        variable.push(metaData)
    }
    return variable;
}

exports.Register = Register