//especially functions about the rootnode
//-- add Solution1
//-visit it
//-- add Solution2
//-visit it
//-- switch back to Solution1
//-- visit it again
//-- add node
//-- remove node
global.loglevel = 'debug'
require('../exchange_modules/ffl/fflparser');
require('../exchange_modules/screendefinition/screendefparser');//just let it inject into the GenericModelFile
require('../exchange_modules/presentation/presentation');//just let it inject into the GenericModelFile
var assert = require('assert');
var JUNIT = require('./JUNIT.js');
var JSWorkBook = require('../fesjs/JSWorkBook');
var GenericModelFile = require('../fesjs/GenericModelFile');
var data = JUNIT.getFile('hierarchyTest.ffl');
var FESContext = require('../fesjs/fescontext')
var wb = new JSWorkBook(new FESContext());
wb.doImport(data, 'ffl');
wb.fixAll();
var info = JUNIT.print;
var presentation = wb.export('presentation');

var uitree = presentation.tree;
var navigator = presentation.navigator;
uitree.update({title: true, value: true, required: true, visible: true, locked: true, valid: true, choices: true})

console.time('start')
uitree.update({title: true, value: true, required: true, visible: true, locked: true, valid: true, choices: true})
console.timeEnd('start')

info(navigator)
navigator.move('Q_MAP01');
info(navigator)
var next = navigator.next();
info(navigator)

JUNIT.print(uitree)
var node = uitree.getNode('Q_ROOT');
uitree.update({title: true, value: true, required: true, visible: true, locked: true})
JUNIT.print(JSON.stringify(uitree, null, 2))
console.info('Test Presentation success')
node.update({title: true})

//filter for requested variables, so al already has to know which variables we want to scan
var names = new Set();
//get all recursive childnames
names.add(uitree.rowId);
uitree.visit(function (child) {
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
JUNIT.print(other)
assert.ok(other.children)
assert.ok(other.name)

uitree.getNode('Q_MAP01').duplicate();