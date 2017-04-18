//TODO: Its possible to create recursive structures, avoid this from happening.
//This File should be merged with Node.js,SolutionService.js and not be needed, keep this in mind.
function UIService() {
}
var UIModel = {
    NEW_root_value: {
        rowId: 'root'
    }
};
var rootNodes = {
    NEW: UIModel.NEW_root_value
};
var rows = new Set();

UIService.prototype.contains = function (name) {
    return rows.has(name);
};
//Don't call this method directly, business logic is within the Solution and JSWorkBook object
//NULL is not valid, nor empty string
UIService.prototype.createRootNode = function (modelName) {
    //when calling with undefined just return a Solution with current modelName
    var newModelName = modelName.toUpperCase();
    //create a root node if not exists
    //Better to keep a list of existing Solution instead of writing over them
    var newRootNodeName = newModelName + '_root_value';
    if (UIModel[newRootNodeName] === undefined) {
        UIModel[newRootNodeName] = {
            name: newRootNodeName,
            rowId: 'root',
            colId: 'value',
            solutionName: newModelName,
            displayAs: 'SectionAnswerType',
            nodes: []
        };
        rootNodes[newModelName] = UIModel[newRootNodeName]
    }
    return rootNodes[newModelName];
}
//getOrCreate
function getOrCreate(groupName, row, col) {

    var rowId = groupName + '_' + row;
    var name = rowId + "_" + col;
    var node = UIModel[name];
    if (node == undefined) {
        node = {
            rowId: row,
            solutionName: groupName,
            colId: col,
            name: name,
            nodes: []
        }
        UIModel[name] = node;
        rows.add(row);
    }
    return node;
}
UIService.prototype.getOrCreateUI = getOrCreate;
function hasChild(children, name) {
    for (var i = 0; i < children.nodes.length; i++) {
        if (children.nodes[i].name === name) {
            return true;
        }
    }
    return false;
}
//add element to Solution
function addUi(groupName, row, col, item, parentId) {
    //add to map
    var ui = getOrCreate(groupName, row, col);

    //inherit all properties But new allow extended Objects.
    //Only copy primitive members, and the delegate Object.
    for (key in item) {
        if (ui[key] === undefined && (key === 'delegate' || typeof item[key] !== 'object' )) {
            ui[key] = item[key];
        }
    }
    //add to root if no parent
    if (parentId !== undefined) {
        //else add to UIModel
        var parentUiModel = UIModel[groupName + '_' + parentId];
        if (!hasChild(parentUiModel, ui.name)) {
            parentUiModel.nodes.push({
                name: ui.name,
                rowId: ui.rowId,
                colId: ui.colId,
                identifier: groupName + '_' + parentId
            })
        }
    }
}
UIService.prototype.addUi = addUi;
//add elements to
UIService.prototype.bulkInsert = function (solution) {
    var solutionName = solution.name.toUpperCase();
    //fix for appending values, instead of overwriting them
    //Should be more clean
    if (UIModel[solutionName + '_root_value'] === undefined) {
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
            if (!obj.parentName || UIModel[solutionName + '_' + obj.parentName] !== undefined) {
                obj.ref = obj.formulaId === null || obj.formulaId === undefined ? obj.ref : obj.formulaId;
                addUi(solutionName, obj.rowId, obj.colId, obj, obj.parentName === null ? undefined : obj.parentName);
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
UIService.prototype.getRootNode = getRootNode;
UIService.prototype.findAllInSolution = function (nodeId) {
    var result = {
        name: nodeId,
        nodes: []
    }
    for (var key in UIModel) {
        var uiModel = UIModel[key];
        if (uiModel.displayAs !== undefined && uiModel.solutionName === nodeId) {
            result.nodes.push(uiModel);
        }
    }
    return result;
};
//fetchByName (can return null)
UIService.prototype.fetch = function fetch(name) {
    return UIModel[name];
};
/**
 * Visitor walk the tree
 * if node is null we use root node
 * function is not thread safe, add parent and depth to function call instead of altering UINode
 */
UIService.prototype.visit = function (node, func) {
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
            var childNode = UIModel[_childNode.name];
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
module.exports = UIService.prototype;