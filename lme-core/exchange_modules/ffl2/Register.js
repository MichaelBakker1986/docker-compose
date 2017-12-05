/**
 * All indexed will be linked to a array of values,
 * @constructor
 */
function Register() {
    this.schema = []
    this.i = []
    this.schemaIndexes = {}
}

Register.prototype.setSchema = function(columns) {
}
Register.prototype.getIndex = function(name) {
    return this[name]
}
Register.prototype.addColumn = function(name) {
    this.schemaIndexes[name] = this.schema.length
    this.schema.push(name)
    const a = this.i
    for (var i = 0; i < a.length; i++) a[i].length++
}
//can only be unique indexes, string based.
Register.prototype.addIndex = function(name) {
    const index = {}
    const sindex = this.schemaIndexes[name]
    const a = this.i
    for (var i = 0; i < a.length; i++) index[a[i][sindex]] = a[i]
    this[name] = index
}
Register.prototype.addrow = function(row) {
    this.i.push(row)
    return this.i.length - 1
}
/*const register = new Register();
register.addColumn('name')
register.addColumn('visible')
register.addColumn('locked')
register.addColumn('required')
let idx = register.addrow(['test0', 1, 2, 3])
register.addrow(['test1', 1, 2, 3])
register.addrow(['test2', 1, 2, 3])
console.info(register.getIndex('i')[idx])

register.addIndex('name')
register.addColumn('testC')
register.getIndex('name').test0.push([1, 2, 3]);
console.info(register.getIndex('name').test0)*/
exports.Register = Register