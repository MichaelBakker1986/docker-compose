//most Basic tree structure,
//There is not one available for public
//Its not very performant iterating entire tree while adding a child node, but ensures integrity
//should be used for 10.000 nodes max.
//Could also introduce a Tree Object
//Its just a replica of DefaultMutableTreeNode
function Node(rowId)
{
    this.rowId = rowId;
    this.nodes = [];
}
Node.prototype.childCount = function ()
{
    return this.nodes.length;
}
Node.prototype.hasChildren = function ()
{
    return !this.isLeaf();
}
Node.prototype.treeSize = function ()
{
    var count = 0;
    for (var i = 0; i < this.nodes.length; i++)
    {
        count += this.nodes[i].treeSize();
    }
    return count;
}
Node.prototype.getRoot = function ()
{
    var parent = this;
    var current = parent;
    while ((parent = parent._parent) !== undefined)
    {
        current = parent;
    }
    return current;
}
Node.prototype.getNode = function (rowId)
{
    if (this.rowId === rowId)
    {
        return this;
    }
    for (var i = 0; i < this.nodes.length; i++)
    {
        var current = this.nodes[i].getNode(rowId);
        if (current !== undefined)
        {
            return current;
        }
    }
    return undefined;
}
Node.prototype.remove = function ()
{
    if (this._parent !== undefined)
    {
        this._parent.nodes.splice(this._parent.indexAt(this), 1);
    }
    //else its already detached from parent, nothing to do..
}
Node.prototype.parent = function ()
{
    if (this._parent === undefined)
    {
        return undefined;
    }
    return this._parent;
}
Node.prototype.getPath = function ()
{
    if (this._parent === undefined)
    {
        return this.rowId;
    }
    return this._parent.getPath() + ' > ' + this.rowId;
}
Node.prototype.addChild = function (node)
{
    node._parent = this;
    this.nodes.push(node);
}
Node.prototype.next = function ()
{
    if (this._parent === undefined)
    {
        return undefined;
    }
    return this._parent.getChild(this._parent.indexAt(this) + 1);
}
Node.prototype.getAllChildren = function ()
{
    var children = []
    this.visit(function (child)
    {
        children.push(child);
    });
    return children;
}
Node.prototype.visit = function (func)
{
    func(this);
    for (var i = 0; i < this.nodes.length; i++)
    {
        this.nodes[i].visit(func);
    }
}
Node.prototype.visitChildren = function (func)
{
    for (var i = 0; i < this.nodes.length; i++)
    {
        var childNode = this.nodes[i];
        func(childNode);
        childNode.visit(func);
    }
}
Node.prototype.visitTraverse = function (func)
{
    for (var i = 0; i < this.nodes.length; i++)
    {
        this.nodes[i].visitTraverse(func);
    }
    func(this);
}
Node.prototype.previous = function ()
{
    if (this._parent === undefined)
    {
        return undefined;
    }
    return this._parent.getChild(this._parent.indexAt(this) - 1);
}
Node.prototype.isLeaf = function ()
{
    return this.nodes.length === 0;
}
Node.prototype.firstChild = function ()
{
    return this.getChild(0);
}
Node.prototype.getChild = function (index)
{
    return ((index < 0) || ((this.nodes.length - 1) < index)) ? undefined : this.nodes[index];
}
Node.prototype.indexAt = function (node)
{
    for (var i = 0; i < this.nodes.length; i++)
    {
        if (this.nodes[i].rowId === node.rowId)
        {
            return i;
        }
    }
    return -1;
}
Node.prototype.toJSON = function ()
{
    //avoid circular Node structures
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
module.exports = Node;