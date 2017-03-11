/**
 * it is getting annoying to have such large set of dependencies to make a simple test.
 * @type {ok|exports|module.exports}
 */
var assert = require('assert');
var Node = require('../archive/exchange_modules/presentation/Node.js');
var Tree = require('../archive/exchange_modules/presentation/Tree.js');
require('../archive/exchange_modules/presentation/presentation.js');//just let it inject into the GenericModelFile
require('../archive/ffl/fflparser.js');
var JSWorkBook = require('../archive/fesjs/JSWorkBook.js');
var JUNIT = require('./JUNIT.js');
var info = JUNIT.printPretty;
var data = JUNIT.getFile('highcharttest.ffl');
var GenericModelFile = require('../archive/fesjs/GenericModelFile.js');
GenericModelFile.addConverter(require('../archive/highchartadapter/highchartadapter'));
var wb = new JSWorkBook();
var presentation = wb.export('presentation');
wb.doImport(data, 'ffl');

var uitree = presentation.tree;
uitree.update(GenericModelFile.updateAll);
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
function offender()
{
    tree.addChild('tree_child1', tree.createNode('tree_child1'));
}
assert.throws(offender, /one parent/gmi, 'fail');
treeNode.remove();

child1.remove();
assert.ok(root.getNode('child1') === undefined);
assert.ok(root.getNode('child1_child1') === undefined);
