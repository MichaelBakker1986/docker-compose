/**
 * All indexed will be linked to a array of values,
 * @constructor
 */
function Register() {
    this.schema = []
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
exports.Register = Register