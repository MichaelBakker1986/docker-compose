function PropertiesAssembler() {
}
var PropertiesModel = {
    NEW_root_value: {
        rowId: 'root'
    }
};
/**
 * Model root nodes
 */
var rootNodes = {
    NEW: PropertiesModel.NEW_root_value
};
var rows = new Set();

PropertiesAssembler.prototype.contains = function (name) {
    return rows.has(name);
};
//Don't call this method directly, business logic is within the Solution and JSWorkBook object
//NULL is not valid, nor empty string
PropertiesAssembler.prototype.createRootNode = function (modelName) {
    //when calling with undefined just return a Solution with current modelName
    var newModelName = modelName.toUpperCase();
    //create a root node if not exists
    //Better to keep a list of existing Solution instead of writing over them
    var newRootNodeName = newModelName + '_root_value';
    if (PropertiesModel[newRootNodeName] === undefined) {
        PropertiesModel[newRootNodeName] = {
            name: newRootNodeName,
            rowId: 'root',
            colId: 'value',
            solutionName: newModelName,
            displayAs: 'SectionAnswerType',
            nodes: []
        };
        rootNodes[newModelName] = PropertiesModel[newRootNodeName]
    }
    return rootNodes[newModelName];
}
function getOrCreateProperty(groupName, row, col) {
    var rowId = groupName + '_' + row;
    var name = rowId + "_" + col;
    var node = PropertiesModel[name];
    if (node == undefined) {
        node = {
            rowId: row,
            solutionName: groupName,
            colId: col,
            name: name,
            nodes: []
        }
        PropertiesModel[name] = node;
        rows.add(row);
    }
    return node;
}
function hasChild(children, name) {
    for (var i = 0; i < children.nodes.length; i++) {
        if (children.nodes[i].name === name) {
            return true;
        }
    }
    return false;
}
//add element to Solution
function addProperty(groupName, row, col, item, parentId) {
    //add to map
    var property = getOrCreateProperty(groupName, row, col);

    //inherit all properties But new allow extended Objects.
    //Only copy primitive members, and the delegate Object.
    for (key in item) {
        if (property[key] === undefined && (key === 'delegate' || typeof item[key] !== 'object' )) {
            property[key] = item[key];
        }
    }
    //add to root if no parent
    if (parentId !== undefined) {
        //else add to PropertiesModel
        var parentUiModel = PropertiesModel[groupName + '_' + parentId];
        if (!hasChild(parentUiModel, property.name)) {
            parentUiModel.nodes.push({
                name: property.name,
                rowId: property.rowId,
                colId: property.colId,
                identifier: groupName + '_' + parentId
            })
        }
    }
}
//add elements tos
PropertiesAssembler.prototype.bulkInsert = function (solution) {
    var solutionName = solution.name.toUpperCase();
    //fix for appending values, instead of overwriting them
    //Should be more clean
    if (PropertiesModel[solutionName + '_root_value'] === undefined) {
        create(solutionName);
    }
    var nodes = solution.nodes;
    var leftOver = [];
    var iteration = 0;

    //inserting Nodes requires a couple of iterations, parents first
    //fail for recursive structures
    while (iteration < 8) {
        for (var i = 0; i < nodes.length; i++) {
            var obj = nodes[i];
            if (!obj.parentName || PropertiesModel[solutionName + '_' + obj.parentName] !== undefined) {
                obj.ref = obj.formulaId === null || obj.formulaId === undefined ? obj.ref : obj.formulaId;
                addProperty(solutionName, obj.rowId, obj.colId, obj, obj.parentName === null ? undefined : obj.parentName);
            }
            else {
                leftOver.push(obj);
            }
        }
        if (leftOver.length == 0) {
            nodes = leftOver;
            break;
        }
        nodes = leftOver;
        leftOver = [];
        iteration++;
    }
    if (nodes.length !== 0) {
        throw Error('after ' + iteration + ' still items left, maybe too deeply nested or resursive.');
    }
}
function getRootNode(modelName) {
    return rootNodes[modelName];
}
PropertiesAssembler.prototype.getRootNode = getRootNode;
PropertiesAssembler.prototype.findAllInSolution = function (nodeId) {
    var result = {
        name: nodeId,
        nodes: []
    }
    for (var key in PropertiesModel) {
        var property = PropertiesModel[key];
        if (property.solutionName === nodeId) {
            result.nodes.push(property);
        }
    }
    return result;
};
//fetchByName (can return null)
PropertiesAssembler.prototype.fetch = function fetch(name) {
    return PropertiesModel[name];
};
/**
 * Visitor walk the tree
 * if node is null we use root node
 * function is not thread safe, add parent and depth to function call instead of altering UINode
 */
PropertiesAssembler.prototype.visit = function (node, func) {
    var startingNode = node || getRootNode('NEW');
    if (startingNode !== undefined) {
        startingNode._depth = 0;
        visitInternal(startingNode, func, 0, undefined)
        startingNode._depth = undefined;
        startingNode.parentrowId = undefined;
    }
}
function visitInternal(node, func, depth) {
    func(node);
    if (node.nodes) {
        for (var i = 0; i < node.nodes.length; i++) {
            var _childNode = node.nodes[i];
            var childNode = PropertiesModel[_childNode.name];
            childNode.parentrowId = node.rowId;
            childNode._index = i;
            childNode._depth = depth;
            visitInternal(childNode, func, depth + 1);
            childNode.parentrowId = undefined;
            childNode._index = undefined;
            childNode._depth = undefined;
        }
    }
}
PropertiesAssembler.prototype.getOrCreateProperty = getOrCreateProperty;
module.exports = PropertiesAssembler.prototype;