//this class can hold multiple Solutions, but there can only be one current Solution (State)
//its getting a bit ugly, with teh currentSolution.name
//Clean up, move functions like bulkinsert to workbook or Solution
//TODO: Its possible to create recursive structures, avoid this from happening.
//This File should be merged with Node.js,SolutionService.js and not be needed, keep this in mind.
//introduces a strange level of complexity in the code.
//rows
var Solution = require('./Solution');
var indexByRow = {};
var UIModel = {
    NEW_root_value: {
        rowId: 'root'
    }
};
var rows = new Set();
var rowsAsArray = [];
var DEFAULT_UNDEFINED_SOLUTION_NAME = 'NEW';
var currentSolution = {
    name: DEFAULT_UNDEFINED_SOLUTION_NAME
};
function contains(name)
{
    return rows.has(name);
}
//modelName is allowed to be undefined
//Don't call this method directly, business logic is within the Solution and JSWorkBook object
//NULL is not valid, nor empty string
function create(modelName)
{
    //when calling with undefined just return a Solution with current modelName
    if (modelName !== undefined)
    {
        currentSolution.name = modelName.toUpperCase();
        //create a root node if not exists
        //Better to keep a list of existing Solution instead of writing over them
        if (UIModel[currentSolution.name + '_root_value'] === undefined)
        {
            UIModel[currentSolution.name + '_root_value'] = {
                name: currentSolution.name + '_root_value',
                rowId: 'root',
                colId: 'value',
                solutionName: currentSolution.name,
                displayAs: 'SectionAnswerType',
                nodes: []
            };
        }
        if (UIModel[currentSolution.name + '_unmapped'] === undefined)
        {
            UIModel[currentSolution.name + '_unmapped'] = {
                name: currentSolution.name + '_unmapped',
                solutionName: currentSolution.name,
                nodes: []
            };
        }
        UIModel[currentSolution.name + '_root_value'].nodes = [];
        UIModel[currentSolution.name + '_unmapped'].nodes = [];
    }
    return new Solution(currentSolution.name);
}
function find(uilem)
{
    return getUI(uilem.rowId, uilem.colId);
}
function remove(parent, child)
{
    //  uimodel.getCurrentModelName() + '_' + node.rowId + '_value'

    var elem = fetch(getCurrentModelName() + '_' + parent + '_value');
    var childId = fetch(getCurrentModelName() + '_' + child + '_value');
    if (childId === undefined)
    {
        //nothing to delete
        return;
    }
    for (var i = 0; i < elem.nodes.length; i++)
    {
        var current = elem.nodes[i];
        if (current.name === childId.name)
        {
            elem.nodes.splice(i, 1);
            break;
        }
    }
}
function exist(rowId, colId)
{
    var rowId = currentSolution.name + '_' + rowId;
    var name = rowId + "_" + colId;
    return UIModel[name] !== undefined;
}
function getRowById(row)
{
    return indexByRow[row];
}
function getUI(row, col, inherited)
{
    rows.add(row);
    var rowId = currentSolution.name + '_' + row;
    var name = rowId + "_" + col;
    var node = UIModel[name];
    if (node == undefined)
    {
        node = (inherited || {
            rowId: row,
            solutionName: currentSolution.name,
            colId: col,
            name: name
        })
        UIModel[name] = node;
    }
    return node;
}
function hasChild(children, name)
{
    var found = false;
    if (children.nodes === undefined)
    {
        children.nodes = []
    }
    for (var i = 0; i < children.nodes.length; i++)
    {
        if (children.nodes[i].name === name)
        {
            found = true;
            break;
        }
    }
    return found;
}
function addUi(row, col, item, parentId)
{
    //add to map
    var ui = getUI(row, col);

    //inherit all properties But new allow extended Objects.
    //Only copy primitive members, and the delegate Object.
    for (key in item)
    {
        if (ui[key] === undefined && (key === 'delegate' || typeof item[key] !== 'object' ))
        {
            ui[key] = item[key];
        }
    }

    //add to root if no parent
    if (parentId === undefined)
    {
        if (col !== 'root' && col === 'value')
        {
            UIModel[currentSolution.name + '_unmapped'].nodes.push({name: ui.name, rowId: ui.rowId, colId: ui.colId});
        }
    }
    else
    {
        //else add to UIModel
        if (!hasChild(UIModel[currentSolution.name + '_' + parentId], ui.name))
        {
            UIModel[currentSolution.name + '_' + parentId].nodes.push({name: ui.name, rowId: ui.rowId, colId: ui.colId})
        }
    }
}
//Solution has a Name
function bulkInsert(solution)
{
    var solutionName = solution.name.toUpperCase();
    //fix for appending values, instead of overwriting them
    //Should be more clean
    if (UIModel[solutionName + '_root_value'] === undefined)
    {
        create(solutionName);
    }
    else
    {
        currentSolution.name = solutionName;
    }
    var nodes = solution.nodes;
    var leftOver = [];
    var iteration = 0;

    //inserting Nodes requires a couple of iterations, parents first
    //fail for recursive structures
    while (iteration < 8)
    {
        for (var i = 0; i < nodes.length; i++)
        {
            var obj = nodes[i];
            if (!obj.parentName || UIModel[currentSolution.name + '_' + obj.parentName] !== undefined)
            {
                obj.ref = obj.formulaId === null || obj.formulaId === undefined ? obj.ref : obj.formulaId;
                addUi(obj.rowId, obj.colId, obj, obj.parentName === null ? undefined : obj.parentName);
            }
            else
            {
                leftOver.push(obj);
            }
        }
        if (leftOver.length == 0)
        {
            nodes = leftOver;
            break;
        }
        nodes = leftOver;
        leftOver = [];
        iteration++;
    }
    if (nodes.length !== 0)
    {
        throw Error('after ' + iteration + ' still items left, maybe too deeply nested or resursive.');
    }
}
function getRootNode()
{
    return UIModel[currentSolution.name + '_root_value'];
}
function findAll()
{
    return {
        name: currentSolution.name,
        nodes: Object.keys(UIModel).reduce(function (result, element)
        {
            var uiModel = UIModel[element];
            if (uiModel.displayAs !== undefined && uiModel.solutionName === currentSolution.name)
            {
                result.push(uiModel);
            }
            return result;
        }, [])
    };
}
function fetch(name)
{
    return UIModel[name];
}
function getRowIds(node)
{
    var returnValue = [];
    var regexp = new RegExp(node, "i");

    rows.forEach(function (el)
    {
        if (regexp.test(el))
        {
            var uiModel = UIModel[currentSolution.name + "_" + el + "_value"];
            //skip empty nodes, u cannot navigate there
            if (uiModel && uiModel.nodes)
            {
                returnValue.push(uiModel);
            }
        }
    });
    return returnValue;
}
function getCurrentModelName()
{
    return currentSolution.name;
}
/**
 * Visitor walk the tree
 * if node is null we use root node
 */
function visit(node, func)
{
    var startingNode = node || getRootNode();
    if (startingNode !== undefined)
    {

        startingNode._index = 0;
        startingNode._depth = 0;
        visitInternal(startingNode, func, 0)
        startingNode._index = undefined;
        startingNode._depth = undefined;
        startingNode.parentrowId = undefined;
    }
}
function visitInternal(node, func, depth)
{
    func(node);
    if (node.nodes)
    {
        for (var i = 0; i < node.nodes.length; i++)
        {
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
module.exports =
{
    getRowIds: getRowIds,
    getCurrentModelName: getCurrentModelName,

    addUi: addUi,//add element to Solution
    create: create,//create Solution
    bulkInsert: bulkInsert,//add elements to the Solution

    remove: remove,
    //will be encapsulated later,
    //for now we can directly inject the UIModel
    getRootNode: getRootNode,
    getUI: getUI,//getOrCreate
    find: find,//findByUIElement
    fetch: fetch,//fetchByName (can return null)
    findAll: findAll,
    contains: contains,
    exist: exist,
    visit: visit
};