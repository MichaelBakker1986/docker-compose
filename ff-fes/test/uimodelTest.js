//especially functions about the rootnode
//-- add Solution1
//-visit it
//-- add Solution2
//-visit it
//-- switch back to Solution1
//-- visit it again
//-- add node
//-- remove node
require('../exchange_modules/screendefinition/screendefparser');//just let it inject into the GenericModelFile
require('../exchange_modules/presentation/presentation');//just let it inject into the GenericModelFile
var assert = require('assert');
var JUNIT = require('./JUNIT');
var JSWorkBook = require('../fesjs/JSWorkBook');
var FESContext = require('../fesjs/fescontext')
//find: find,//findByUIElement
var wb = new JSWorkBook(new FESContext());

var importTree = {
    "viewType": "GROUP",
    "variableName": "root",
    "children": [
        {
            "viewType": "CONTAINER",
            "name": "Balans",
            "description": "balance"
        },
        {
            "viewType": "CONTAINER",
            "name": "BalanceTwo",
            "description": "balance"
        }
    ]
};
wb.doImport(JSON.stringify(importTree), 'screendefinition');
var uitree = wb.export('presentation').tree;

JUNIT.validateTree(importTree, uitree, 'children', 'nodes', function (expected, actual) {
        return (expected.variableName || expected.name) === actual.rowId;
    }
)

//after structural test, test "description" is mapped to title function
/*var rootNode = wb.getRootNode();
 assert.equal(rootNode.displayAs, 'SectionAnswerType');
 assert.equal(rootNode.nodes.length, 1);*/
//JUNIT.print(JSON.stringify(uitree, null, 2))
console.info('Test UIModel success')

