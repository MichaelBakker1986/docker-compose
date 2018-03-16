function PropertiesAssembler() {
}

const PropertiesModel = {
    NEW_root_value: {
        rowId       : 'root',
        solutionName: 'NEW'
    }
};
/**
 * Model root nodes
 */
const rootNodes = {
    NEW: PropertiesModel.NEW_root_value
};
const rows = new Set();

PropertiesAssembler.prototype.contains = function(name) {
    return rows.has(name);
};
//Don't call this method directly, business logic is within the Solution and JSWorkBook object
//NULL is not valid, nor empty string
function createRootnode(modelName) {
    //when calling with undefined just return a Solution with current modelName
    const newModelName = modelName.toUpperCase();
    //create a root node if not exists
    //Better to keep a list of existing Solution instead of writing over them
    const newRootNodeName = newModelName + '_root_value';
    if (!rootNodes[newModelName]) {
        PropertiesModel[newRootNodeName] = {
            name        : newRootNodeName,
            rowId       : 'root',
            colId       : 'value',
            solutionName: newModelName,
            frequency   : 'document',
            displayAs   : 'SectionAnswerType',
            nodes       : []
        };
        rootNodes[newModelName] = PropertiesModel[newRootNodeName]
    }
    return rootNodes[newModelName];
};
PropertiesAssembler.prototype.createRootNode = createRootnode

const getOrCreateProperty = function(groupName, row, col) {
    const rowId = groupName + '_' + row;
    const name = rowId + "_" + col;
    var node = PropertiesModel[name];
    if (node == undefined) {
        node = {
            rowId       : row,
            solutionName: groupName,
            colId       : col,
            name        : name,
            nodes       : []
        }
        PropertiesModel[name] = node;
        rows.add(row);
    }
    return node;
}

function hasChild(children, name) {
    for (var i = 0; i < children.nodes.length; i++)
        if (children.nodes[i].name === name) return true;
    return false;
}

//add element to Solution
function addProperty(groupName, row, col, item, parentId) {
    //add to map if it not exists, else re-use the entry
    const property = getOrCreateProperty(groupName, row, col);

    //inherit all properties But new allow extended Objects.
    //Only copy primitive members, and the delegate Object.
    for (var key in item)
        if (property[key] === undefined && (typeof item[key] !== 'object'))
            property[key] = item[key];

    //add to root if no parent
    if (parentId) {
        //else add to PropertiesModel
        const parentUiModel = PropertiesModel[groupName + '_' + parentId];
        if (!hasChild(parentUiModel, property.name)) {
            parentUiModel.nodes.push({
                name      : property.name,
                rowId     : property.rowId,
                colId     : property.colId,
                identifier: groupName + '_' + parentId
            })
        }
    }
}

//add elements from Solution into Map
PropertiesAssembler.prototype.bulkInsert = function(solution) {
    const solutionName = solution.name;
    if (!rootNodes[solutionName]) createRootnode(solutionName);

    var nodes = solution.nodes;
    var leftOver = [];
    var iteration = 0;

    //inserting Nodes requires a couple of iterations, parents first
    while (iteration < 8) {
        for (var i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (!node.parentName || PropertiesModel[solutionName + '_' + node.parentName]) {
                node.ref = node.formulaId || node.ref;
                addProperty(solutionName, node.rowId, node.colId, node, node.parentName);
            }
            else {
                leftOver.push(node);
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
    if (nodes.length !== 0) throw Error('after ' + iteration + ' still items left, maybe too deeply nested or resursive.');
}

function getRootNode(modelName) {
    return rootNodes[modelName];
}

PropertiesAssembler.prototype.findAllInSolution = function(modelName, visitArg) {
    for (var key in PropertiesModel) {
        const property = PropertiesModel[key];
        if (property.solutionName === modelName) {
            visitArg(property);
        }
    }
};
//fetchByName (can return undefined)
PropertiesAssembler.prototype.fetch = function fetch(name) {
    return PropertiesModel[name];
};
/**
 * Visitor walk the tree
 * if node is null we use root node
 * function is not thread safe, add parent and depth to function call instead of altering PropertyNode
 * As expected, problems while recursive calling this method.
 */
PropertiesAssembler.prototype.visitProperty = function(node, func, startDepth) {
    const startingNode = node || getRootNode('NEW');
    if (startingNode) visitInternal(startingNode, func, startDepth || 0)
}
PropertiesAssembler.prototype.visitModel = function(modelName, func, startDepth) {
    visitInternal(getRootNode(modelName), func, startDepth || 0)
}
/*
 * Complex to explain. See {@webexport.js}
 * Its used to provide a sortable id per row when combined with Tuples
 *  [((variableId|tupleDefinitionId),tupleIndex){maxTupleDepth}]
 */
PropertiesAssembler.prototype.indexProperties = function(modelName) {
    var counter = 0;
    const padder = pad;
    visitInternal(getRootNode(modelName), function(node, depth) {
        counter++;
        node.id = padder(counter, 5);
        if (node.tupleProperty) {
            const tupleDef = PropertiesModel[node.solutionName + "_" + node.tupleDefinitionName + "_value"]
            if (tupleDef.tupleProperty) {
                const nestedTupleDef = PropertiesModel[node.solutionName + "_" + tupleDef.tupleDefinitionName + "_value"]
                if (nestedTupleDef.tupleProperty) {
                    const douleNestedTupleDef = PropertiesModel[node.solutionName + "_" + nestedTupleDef.tupleDefinitionName + "_value"]
                    // if (douleNestedTupleDef.tupleProperty) throw Error('only 3levels nested tuples are allowed')
                    node.hash = [douleNestedTupleDef.id, '000', nestedTupleDef.id, '000', tupleDef.id, '000', node.id]
                } else node.hash = [nestedTupleDef.id, '000', tupleDef.id, '000', node.id, '000', node.id]
            } else node.hash = [tupleDef.id, '000', node.id, '000', node.id, '000', node.id]
        }
        else node.hash = [node.id, '000', node.id, '000', node.id, '000', node.id];
    }, 0)
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function visitInternal(node, func, depth) {
    func(node, depth);
    if (func.stop) return delete func.stop;
    if (node.nodes) {
        for (var i = 0; i < node.nodes.length; i++) {
            var childNode = PropertiesModel[node.nodes[i].name];
            childNode.parentrowId = node.rowId;//TODO: remove this (visitor should not modify state)
            visitInternal(childNode, func, depth + 1);
        }
    }
}

function visitChildren(node, func, depth) {
    if (node.nodes) {
        for (var i = 0; i < node.nodes.length; i++) {
            func(node, depth);
            visitChildren(PropertiesModel[node.nodes[i].name], func, depth + 1);
        }
    }
}

PropertiesAssembler.prototype.visitChildren = visitChildren;
PropertiesAssembler.prototype.getRootProperty = getRootNode;
PropertiesAssembler.prototype.getOrCreateProperty = getOrCreateProperty;
module.exports = PropertiesAssembler.prototype;