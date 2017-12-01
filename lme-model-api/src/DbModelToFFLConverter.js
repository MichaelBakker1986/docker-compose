/**
 * Used in front-end to reassemble the FFL file when needed.
 */
function DbToFFLIndexer(model) {
    this.schema = model.schema;
    this.nodes = model.nodes;
    this.vars = {};
    this.child = {}
    this.nameIndex = this.schema.indexOf('name');
    this.treeIndex = this.schema.indexOf('treeindex');
    this.parentNameIndex = this.schema.indexOf('parentId');
    this.output = "";
}

DbToFFLIndexer.prototype.addNode = function(name, index, node, parentName) {
    this.vars[name] = node;
    this.child[parentName] = this.child[parentName] || []
    this.child[parentName][index] = name
}
DbToFFLIndexer.prototype.toGeneratedCommaSeperated = function() {
    let output = "";//reset output
    this.walk('root', 0, function(variable, depth) {
        output += " ".repeat(depth) + variable.join(',') + "\n";
    })
    this.output = output;
    return output;
}
DbToFFLIndexer.prototype.walk = function(variableName, depth, visitor) {
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
DbToFFLIndexer.prototype.indexProperties = function() {
    for (var i = 0; i < this.nodes.length; i++) {
        var node = this.nodes[i];
        this.addNode(node[this.nameIndex], node[this.treeIndex], node, node[this.parentNameIndex])
    }
}
exports.DbToFFLIndexer = DbToFFLIndexer;