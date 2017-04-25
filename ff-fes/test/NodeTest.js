/**
 * it is getting annoying to have such large set of dependencies to make a simple test.
 * @type {ok|exports|module.exports}
 */
var assert = require('assert');
var Node = require('../exchange_modules/presentation/Node');
var Tree = require('../exchange_modules/presentation/Tree');
require('../exchange_modules/presentation/presentation');//just let it inject into the FESFacade
require('../exchange_modules/ffl/fflparser');
var JSWorkBook = require('../fesjs/JSWorkBook');
var JUNIT = require('./JUNIT');
var info = JUNIT.printPretty;
var data = JUNIT.getFile('highcharttest.ffl');
var FESContext = require('../fesjs/fescontext')
var wb = new JSWorkBook(new FESContext());

var updateAll = {
    validation: true,
    title: true,
    value: true,
    required: true,
    visible: true,
    locked: true,
    choices: true
}
wb.importSolution(data, 'ffl');
var presentation = wb.export('presentation');
var uitree = presentation.tree;
uitree.update(updateAll);
info(uitree)

var root = new Node('root')

var tree = new Tree('root');

var child1 = new Node('child1');
root.addChild(child1);
var child2 = new Node('child2');
root.addChild(child2)
child1.addChild(new Node('child1_child1'))
assert(child1.next().rowId === 'child2');
assert(child1.next().previous().rowId === 'child1');
assert(child1.next().getRoot().rowId === 'root');
assert(root.getRoot().rowId === 'root');
assert(root.getNode('child1_child1').rowId === 'child1_child1')

var treeNode = tree.createNode('tree_child1');
tree.addChild('root', treeNode)
tree.addChild('tree_child1', tree.createNode('tree_child2'))
function offender() {
    tree.addChild('tree_child1', tree.createNode('tree_child1'));
}
assert.throws(offender, /one parent/gmi, 'fail');
treeNode.remove();

child1.remove();
assert.ok(root.getNode('child1') === undefined);
assert.ok(root.getNode('child1_child1') === undefined);
