//the indexer should be a member of FFLFormatter, not the way around
const FFLFormatter = require('./FFLFormatter').FFLFormatter
const Register = require('./Register').Register

function PropertiesModuleFFLFormat(register) {
    this.register = register;
    this.vars = {};
    this.child = {}
    this.name = undefined;
}

PropertiesModuleFFLFormat.prototype.addNode = function(name, index, node, parentName) {
    this.vars[name] = node;
    this.child[parentName] = this.child[parentName] || []
    this.child[parentName][index] = name
}
PropertiesModuleFFLFormat.prototype.find = function(key, value) {
    if (!this[key] || !this[key][value]) return []
    return this[key][value];
}
PropertiesModuleFFLFormat.prototype.index = function(key, value, index) {
    if (key == '') throw Error('Invalid FFL. [' + value + ']');
    if (!this[key]) this[key] = {}
    if (!this[key][value]) this[key][value] = []
    this[key][value].push(index)
}
var formulaMapping = {inputRequired: 'required'}

PropertiesModuleFFLFormat.prototype.parse = function(input) {
    const indexer = this;
    var model = FFLFormatter.create(this.register, input);
    model.visit(function(v, raw_properties, children) {
        const treeIndex = v[7];
        const parentid = v[3];
        const properties = {
            name: v[0],
            index: v[1],
            modifier: v[2],
            parentId: parentid,
            tuple: v[4],
            refersto: v[5],
            treeindex: treeIndex
        }
        indexer.addNode(v[1], treeIndex, properties, parentid);
        for (let i = 0; i < raw_properties.length; i++) {
            const p = raw_properties[i];
            const p_seperator_index = p.indexOf(':');//can't use split. some properties use multiple :
            let key = p.substring(0, p_seperator_index).trim();
            key = formulaMapping[key] || key
            let value = p.substring(p_seperator_index + 1).trim();
            //TODO: internationalization should not happen here:
            //TODO: But to introduce Internationalization will take a day.
            //TODO: So thats why we are injecting constant Strings here.
            //TODO: making the model one language only for now
            if (value.startsWith('__')) value = model.lookupConstant(value)
            properties[key] = value
            indexer.index(key, value, v[1])
        }
    })
    indexer.name = model.modelName();
    return indexer;
}
exports.PropertiesModuleFFLFormat = PropertiesModuleFFLFormat;