/**
 * Parsers/Exchange modules create Solution objects filled with generic metadata (formula's,properties concerning a variable)
 *
 */
//This class also has functions for Property types.
//No instances of Property are made since there will be made a lot of those. (1.000.000) easy
//So we keep them plain.
//Don't allow dependencies to Services occur here
//TODO: we should not twice hold the 'nodes' object.
function Solution(solutionName) {
    this.name = solutionName;
    this.displayTypes = {};
    this.type = solutionName;
    this.properties = {};
    this.nodes = [];
    this.addedRowIds = new Set();
    this.formulas = new Set();
    this.root = {};
}

Solution.prototype.preparser = function(input) {
    return input;
}
Solution.prototype.getFormulas = function(iterator) {
    return this.formulas.forEach(iterator);
}
Solution.prototype.hasNode = function(rowId) {
    var has = this.addedRowIds.has(rowId);
    this.addedRowIds.add(rowId);
    return has;
}
Solution.prototype.setParentName = function(uiNode, parentId) {
    uiNode.parentName = (parentId === undefined ? 'root_value' : parentId + '_value');
}
//just be able to retrieve all data of the original
//delegate can be anything, only the one who created it knows it
Solution.prototype.setDelegate = function(uiNode, node) {
    var originalproperties = {};
    for (var key in node) {
        var property = node[key];
        if (typeof property !== 'object' && key.charAt(0) !== '_') {
            this.properties[key] = this.properties[key] || {};
            this.properties[key][property] = this.properties[key][property] || 0;
            this.properties[key][property] += 1;
            originalproperties[key] = property;
        }
    }
    node.originalproperties = originalproperties;
    uiNode.delegate = node;
}
Solution.prototype.getName = function() {
    return this.name;
}
//should not allow duplicates.
//Save UI- names only
Solution.prototype.createNode = function(rowId, colId, formulaId, displayAs) {
    var uiNode = {
        name: this.name + "_" + rowId + "_" + colId,
        rowId: rowId,
        colId: colId,
        refId: formulaId,
        displayAs: displayAs || 'string'
    };
    if (formulaId !== undefined) {
        uiNode.ref = formulaId;
        this.formulas.add(formulaId);
    }
    this.displayTypes[uiNode.displayAs] = true;
    this.nodes.push(uiNode);
    return uiNode;
}

Solution.prototype.addDisplayType = function(displayType) {
    if (displayType === undefined) {
        throw new Error('undefined displaytype, make sure to use valid displayTypes');
    }
    this.displayTypes[displayType] = true;
}
Solution.prototype.getDisplayTypes = function(displayType) {
    return this.displayTypes;
}
Solution.prototype.stringify = function() {
    return this.preparser(JSON.stringify(this.root, function(key, val) {
            if (key === 'originalproperties') {
                return undefined;
            }
            return val;
        }, 2
    ));
}
//add to global list of found variables
Solution.prototype.addNode = function(rowId, node) {
    this.nodes[rowId] = node
}
Solution.prototype.setPreparser = function(parser) {
    this.preparser = parser;
}
//'uielem' the Object of which the properties need to be set
//'elem' the Object of which the properties can be found
//set all properties of the elem in uielem
Solution.prototype.restoreDelegateProperties = function(newObject, orginalObject) {
    var delegate = orginalObject.delegate;
    if (delegate !== undefined && delegate.originalproperties !== undefined) {
        for (var key in delegate.originalproperties) {
            if (newObject[key] === undefined || newObject[key] === null) {
                if (delegate.originalproperties[key] !== undefined && delegate.originalproperties[key] !== null && delegate.originalproperties[key] !== '') {
                    newObject[key] = delegate.originalproperties[key];
                }
            }
        }
    }
}
//add node to root node if it has no parent
//else add the node to the children of is parent
Solution.prototype.addNodeToCorrespondingPlaceInHierarchie = function(parentrowId, rowId, node) {
    if (parentrowId === undefined) {
        this.root = node;
    }
    else {
        //create children array if it did not exist yet.
        var foundVariable = this.nodes[parentrowId];
        if (foundVariable.children === undefined) {
            foundVariable.children = [];
        }
        foundVariable.children.push(node);
    }
}
Solution.prototype.size = function() {
    return this.nodes.length;
}
module.exports = Solution;