var Node = require('./Node.js');
Node.prototype.update = function (properties)
{
    this._tree.update(this, properties);
}
Node.prototype.getRowList = function ()
{
    return this._tree.nodelist;
}
function Tree(rootRowId)
{
    var node = new Node(rootRowId);
    node._tree = this;
    this.root = node;
    this.nodes = {};
    this.nodes[rootRowId] = node;
    this.nodelist = [];//hold state of current viewpoint in the tree
}
Tree.prototype.clearRowState = function ()
{
    this.nodelist.length = 0;
}
Tree.prototype.remove = function (rowId)
{
    this.nodes[rowId] = undefined;
}
Tree.prototype.getRoot = function ()
{
    return this.root;
}
Tree.prototype.addChild = function (parentId, node)
{
    if (node._tree === undefined)
    {
        // throw Error('not expecting this yet, node not yet to the tree.');
        return this.nodes[rowId];
    }
    //node is unique by rowId
    node._tree = this;
    this.nodes[parentId].addChild(node);
}
Tree.prototype.move = function (node, newParent)
{
    this.addChild(newParent, node);
}
Tree.prototype.createNode = function (rowId)
{
    if (this.nodes[rowId] !== undefined)
    {
        var foundNode = this.nodes[rowId].getPath();
        throw new Error('A node can only have one parent.\n  Node "' + rowId + '" already found at "' + foundNode + '".\n  Unable to insert node "' + rowId + '" at: "');
        //return this.nodes[rowId];
    }
    var node = new Node(rowId);
    node._tree = this;

    this.nodes[rowId] = node;
    return node;
}
Tree.prototype.toJSON = function ()
{
    //avoid circular structures  [Tree]
    var returnValue = {};
    for (var key in this)
    {
        if (key.startsWith('_'))
        {
            continue;
        }
        returnValue[key] = this[key];
    }
    return returnValue;
}
module.exports = Tree;