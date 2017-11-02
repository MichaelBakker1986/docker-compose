//especially functions about the rootnode
//-- add Solution1
//-visit it
//-- add Solution2
//-visit it
//-- switch back to Solution1
//-- visit it again
//-- add node
//-- remove node
require('../exchange_modules/ffl/fflparser');
require('../exchange_modules/screendefinition/screendefparser');//just let it inject into the FESFacade
require('../exchange_modules/presentation/presentation');//just let it inject into the FESFacade
var assert = require('assert');
var JUNIT = require('./JUNIT.js');
var JSWorkBook = require('../fesjs/JSWorkBook');
var FESFacade = require('../fesjs/FESFacade');
var data = JUNIT.getFile('hierarchyTest.ffl');
var FESContext = require('../fesjs/fescontext')
var log = require('ff-log')
var wb = new JSWorkBook(new FESContext());
wb.importSolution(data, 'ffl');
wb.fixProblemsInImportedSolution();
var presentation = wb.export('presentation');

var uitree = presentation.tree;
var navigator = presentation.navigator;
uitree.update({title: true, value: true, required: true, visible: true, locked: true, valid: true, choices: true})

console.time('start')
uitree.update({title: true, value: true, required: true, visible: true, locked: true, valid: true, choices: true})
console.timeEnd('start')

log.trace(navigator)
navigator.move('Q_MAP01');
log.trace(navigator)
var next = navigator.next();
log.trace(navigator)

JUNIT.print(uitree)
var node = uitree.getNode('Q_ROOT');
uitree.update({title: true, value: true, required: true, visible: true, locked: true})
JUNIT.print(JSON.stringify(uitree, null, 2))
log.info('Test Presentation success')
node.update({title: true})

//filter for requested variables, so al already has to know which variables we want to scan
var names = new Set();
//get all recursive childnames
names.add(uitree.rowId);
uitree.visit(function(child, depth) {
    names.add(child.rowId);
})

function correctName(name) {
    return names.has(name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1'));
}

/*          var data2 = {
 packageNames: ['Main', 'A', 'B'],
 matrix: [[1, 1, 1], // Main depends on A and B
 [1, 1, 1], // A depends on B
 [1, 1, 1]] // B doesn't depend on A or Main
 };*/

//Helper, to clone tree's and replace members from map
function cloneTree(obj, map) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    var temp = Array.isArray(obj) ? [] : {};    //obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        if (key.startsWith('_') || ((typeof obj[key] === 'function'))) {
            continue;
        }
        temp[map[key] || key] = cloneTree(obj[key], map);
    }
    return temp;
}

var other = cloneTree(uitree, {nodes: 'children', rowId: 'name', count: 'size'})
log.trace(other)
assert.ok(other.children)
assert.ok(other.name)

uitree.getNode('Q_MAP01').duplicate();