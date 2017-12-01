/**
 * Used in front-end to reassemble the FFL file when needed.
 */
var StringBuffer = function() {
    this.buffer = [];
    this.index = 0;
};

StringBuffer.prototype = {
    append: function(s) {
        this.buffer[this.index] = s;
        this.index += 1;
        return this;
    },

    toString: function() {
        return this.buffer.join("");
    }
}

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
    let output = new StringBuffer();
    this.walk('root', 0, function(variable, depth) {
        output += " ".repeat(depth) + variable.join(',') + "\n";
    })
    this.output = output.toString();
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