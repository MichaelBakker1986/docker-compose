//TODO: Its possible to create recursive structures, avoid this from happening.
//This File should be merged with Node.js,SolutionService.js and not be needed, keep this in mind.
//introduces a strange level of complexity in the code.
//rows
var Solution = require('./Solution');
var UIModel = {
    NEW_root_value: {
        rowId: 'root'
    }
};
var rootNodes = {
    NEW: UIModel.NEW_root_value
};
var rows = new Set();

function contains(name) {
    return rows.has(name);
}
//Don't call this method directly, business logic is within the Solution and JSWorkBook object
//NULL is not valid, nor empty string
function create(modelName) {
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
    return new Solution(newModelName);
}
function getUI(groupName, row, col) {

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
function hasChild(children, name) {
    for (var i = 0; i < children.nodes.length; i++) {
        if (children.nodes[i].name === name) {
            return true;
        }
    }
    return false;
}
function addUi(groupName, row, col, item, parentId) {
    //add to map
    var ui = getUI(groupName, row, col);

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
//Solution has a Name
function bulkInsert(solution) {
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
function findAll(nodeId) {
    return {
        name: nodeId,
        nodes: Object.keys(UIModel).reduce(function (result, element) {
            var uiModel = UIModel[element];
            if (uiModel.displayAs !== undefined) {
                result.push(uiModel);
            }
            return result;
        }, [])
    };
}
function fetch(name) {
    return UIModel[name];
}
/**
 * Visitor walk the tree
 * if node is null we use root node
 */
function visit(node, func) {
    var startingNode = node || getRootNode();
    if (startingNode !== undefined) {
        startingNode._index = 0;
        startingNode._depth = 0;
        visitInternal(startingNode, func, 0)
        startingNode._index = undefined;
        startingNode._depth = undefined;
        startingNode.parentrowId = undefined;
    }
}
function visitInternal(node, func, depth) {
    func(node);
    if (node.nodes) {
        for (var i = 0; i < node.nodes.length; i++) {
            var _childNode = node.nodes[i];
            var childNode = fetch(_childNode.name);
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
module.exports = {
    addUi: addUi,//add element to Solution
    create: create,//create Solution
    bulkInsert: bulkInsert,//add elements to the Solution

    //will be encapsulated later,
    //for now we can directly inject the UIModel
    getRootNode: getRootNode,
    getUI: getUI,//getOrCreate
    fetch: fetch,//fetchByName (can return null)
    findAll: findAll,
    contains: contains,
    visit: visit
};