/*
 Will return an bound Object with the engine
 Importing a presentation will be like JSON import,

 Default tree export

 - getParent()
 - next()
 - previous()
 - getRoot()
 - addChild(node)
 - remove()

 while creating new TreeNodes, an converter will be added if found to the Node.
 when updating the Node, the converter is called.
 */
var uimodel = require('../../fesjs/uimodel')
var Node = require('./Node.js')
var Tree = require('./Tree.js')
var Solution = require('../../fesjs/Solution');
var GenericModelFile = require('../../fesjs/GenericModelFile');
var FunctionMap = require('../../fesjs/FunctionMap');
var bootstrap = require('../../fesjs/formula-bootstrap');
var AST = require('../../fesjs/AST');
var converters = GenericModelFile.converters;
Node.prototype.delete = function () {
    uimodel.remove(this.parent().rowId, this.rowId);
    this._tree.remove(this.rowId);
    this.remove();
}
//unique ID to avoid duplicates.
var UUID = 0;
Node.prototype.duplicate = function () {
    //This part does not belong here, just to test behavior
    var rowId = this.rowId + '_copy';
    var appendix = '';
    while (uimodel.contains(rowId + appendix)) {
        appendix = '(' + UUID++ + ')';
    }
    rowId += appendix;

    uimodel.addUi(rowId, 'value', this, this.parent().rowId + '_value');
    var solution = uimodel.create();
    var uiNode = GenericModelFile.addSimpleLink(solution, rowId, 'value', AST.UNDEFINED(), 'AmountAnswerType');
    solution.setParentName(uiNode, this.parent().rowId);
    GenericModelFile.addSimpleLink(solution, rowId, 'title', AST.STRING(this.title))
    uimodel.bulkInsert(solution);
    GenericModelFile.gatherFormulas(solution);
    FunctionMap.init(bootstrap.parseAsFormula, solution.formulas, false);
    GenericModelFile.updateValueMap(GenericModelFile.docValues);
    this.parent().update({title: true});
}

Tree.prototype.update = function (node, properties) {
    var fetch = uimodel.fetch(uimodel.getCurrentModelName() + '_' + node.rowId + '_value')
    if (fetch === undefined) {
        node.delete();
    }
    var uiTreeNodes = {};
    var actualNodes = {};
    //get list of uiTreeNodes we gonna check
    var tree = this;
    node.visit(function (subNode) {
        uiTreeNodes[subNode.rowId] = subNode;
    });
    //so we know what number it is in the tree, we will never show more than 200 rows in a page.
    var count = 0;
    fetch.parentrowId = node._parent === undefined ? undefined : node._parent.rowId;
    uimodel.visit(fetch, function (subNode) {
        actualNodes[subNode.rowId] = subNode;
        var uiTreeNode = uiTreeNodes[subNode.rowId];
        if (uiTreeNode === undefined) {
            uiTreeNode = createNode(tree, subNode.rowId, subNode.displayAs)
            uiTreeNodes[subNode.rowId] = uiTreeNode;
        }
        //some variables reset, its the wrong way dependent
        /*uiTreeNode._Tcollapsed = undefined;*/
        uiTreeNode._Fcollapsed = undefined;
        uiTreeNode._loaded = undefined;
        //
        uiTreeNode.displayAs = subNode.displayAs;
        uiTreeNode.count = count++;
        uiTreeNode.tuple = subNode.tuple;
        uiTreeNode._seen = true;
        uiTreeNode.depth = subNode._depth;
        uiTreeNode._index = subNode._index;
        uiTreeNode._actualParent = subNode.parentrowId;
    });
//remainder/total / parent.childSize
    var tobeupdated = [];
    //so we have both lists, including themselves
    for (var key in uiTreeNodes) {
        var uiTreeNode = uiTreeNodes[key];
        if (uiTreeNode._seen === undefined) {
            uiTreeNode.delete();
            delete uiTreeNodes[key];
        }
        else {
            var uiParentRowId = uiTreeNode._parent === undefined ? undefined : uiTreeNode._parent.rowId;
            if (uiParentRowId !== uiTreeNode._actualParent) {
                //attach it on the corresponding place
                this.move(uiTreeNode, uiTreeNode._actualParent)
            }
            tobeupdated.push(uiTreeNode);
        }
        delete uiTreeNode._seen;
        //uiTreeNode._index;
        //uiTreeNode._actualParent;
    }
    node.visitTraverse(function (subNode) {
        subNode._update(properties);
    });
    this.clearRowState();
    var nodelist = this.nodelist;
    //expand own children when own childrensize <  MAX viewtotal
    node.visitTraverse(function (subNode) {
        nodelist.push(subNode);
        //parent.totalChild
        if (subNode.nodes) {
            var count = 0;
            for (var i = 0; i < subNode.nodes.length; i++) {
                var obj = subNode.nodes[i];
                count += subNode._total;
            }
            subNode._total = count;
        }
        else {
            subNode._total = 0;
        }
    });

}
Node.prototype._update = function (properties) {
    var fetch = uimodel.fetch(uimodel.getCurrentModelName() + '_' + this.rowId + '_value')
    //should also be a property given from outside...
    this.tuple = fetch.tuple;
    this.displayAs = fetch.displayAs;
    var wb = this._tree.workbook;
    for (var property in properties) {
        var value, dirty = false;

        var newValue = wb.statelessGetValue(this._tree.workbook.context, uimodel.getCurrentModelName() + "_" + this.rowId, property);
        //TODO: will fail for Object types, first we will meet is Date
        //we will use a object validator combined with the datatype to check it
        //
        if (typeof newValue === 'object') {
            if (this[property] === undefined) {
                value = newValue;
                dirty = true;
            }
        }
        else {
            var oldValue = this[property];
            if (newValue !== oldValue) {
                this.oldValue = oldValue;
                value = newValue;
                dirty = true;
            }
        }
        if (dirty) {
            if (property === 'value') {
                var converter = this._converter;
                if (converter) {
                    value = converter.convert(value);
                }
            }
            this[property] = value;
        }
    }
}

var presentationConverter = {
    exportAsObject: true,
    hide: true,
    name: 'presentation',
    headername: 'Native Object Presentation',
    parse: function (json) {
        throw new Error('Not yet supported');
    },
    deParse: function (rowId, workbook) {
        //strange I have to build this, Solution Object should be able to do this.
        var rootNode = uimodel.getRootNode();
        if (rootNode !== undefined) {
            var tree = new Tree(rootNode.rowId);
            tree.workbook = workbook;
            uimodel.visit(rootNode, function (node) {
                //skip the rootnode, we just used it
                if (node.rowId !== rootNode.rowId) {
                    //can only make nodes via a Tree.
                    //To enforce integrity
                    var newNode = createNode(tree, node.rowId, node.displayAs);
                    if (node.parentrowId !== undefined) {
                        tree.addChild(node.parentrowId, newNode);
                    }
                }
            });
        }
        var exportValue = {
            tree: tree === undefined ? {
                getNode: function () {
                    return undefined
                }, visit: function () {
                }
            } : tree.getRoot(),
            navigator: undefined
        };
        var navigator = {
            _current: exportValue.tree,
            _next: undefined,
            _up: undefined,
            _previous: undefined,
            _in: undefined,
            move: function (rowId) {
                var newCurrent = exportValue.tree.getNode(rowId);
                if (newCurrent) {
                    _moveViewPoint(newCurrent)
                }
            }
        };


        function _moveViewPoint(node) {
            navigator._current = node;
            navigator._next = node.next();
            navigator._previous = node.previous();
            navigator._up = node.parent();
            navigator._in = node.firstChild();
        }

        function navRelative() {
            if (navigator[this] === undefined) {
                throw Error('Should not be possible');
            }
            navigator.move(navigator[this].rowId)
        }

        navigator.next = navRelative.bind('_next');
        navigator.up = navRelative.bind('_up');
        navigator.previous = navRelative.bind('_previous');
        navigator.in = navRelative.bind('_in');

        exportValue.navigator = navigator;
        return exportValue
    }
};
function createNode(tree, nodeId, displayAs) {
    var node = tree.createNode(nodeId);
    var converter = converters[displayAs];
    if (converter) {
        node._converter = new converter.converter(node);
        node._converter.init();
    }
    return node;
}
GenericModelFile.addParser(presentationConverter)