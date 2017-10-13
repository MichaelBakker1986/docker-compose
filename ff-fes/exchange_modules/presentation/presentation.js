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
var Node = require('./Node.js')
var Tree = require('./Tree.js')
var SolutionFacade = require('../../fesjs/SolutionFacade');
var AST = require('../../../ast-node-utils/index').ast;
Node.prototype.delete = function() {
    throw Error('Remove not yet implemented')
    //PropertiesAssembler.remove(this.parent().rowId, this.rowId);
    this._tree.remove(this.rowId);
    this.remove();
}
//unique ID to avoid duplicates.
var UUID = 0;
/*
 * please refactor..
 */
Node.prototype.duplicate = function() {
    //
    /* var wb = this._tree.workbook
     //This part does not belong here, just to test behavior
     var rowId = this.rowId + '_copy';
     var appendix = '';
     while (wb.getNode(rowId + appendix)) {
     appendix = '(' + UUID++ + ')';
     }
     rowId += appendix;
     //JUST some quickfix from here,
     SolutionFacade.addProperty(rowId, 'value', this, this.parent().rowId + '_value');
     var solution = SolutionFacade.createSolution(wb.modelName);
     var uiNode = SolutionFacade.createUIFormulaLink(solution, rowId, 'value', AST.UNDEFINED(), 'AmountAnswerType');
     solution.setParentName(uiNode, this.parent().rowId);
     SolutionFacade.createUIFormulaLink(solution, rowId, 'title', AST.STRING(this.title))
     //JUST some quickfix from here,
     SolutionFacade.bulkInsert(solution);
     SolutionFacade.gatherFormulas(solution);
     //JUST some quickfix from here,
     SolutionFacade.initFormulaBootstrap(solution.formulas, false);
     wb.updateValueMap();
     this.parent().update({title: true});*/
}

Tree.prototype.update = function(node, properties) {
    var wb = this.workbook;
    var fetch = wb.getNode(node.rowId)
    if (fetch === undefined) {
        node.delete();
    }
    var uiTreeNodes = {};
    var actualNodes = {};
    //get list of uiTreeNodes we gonna check
    var tree = this;
    node.visit(function(subNode) {
        uiTreeNodes[subNode.rowId] = subNode;
    });
    //so we know what number it is in the tree, we will never show more than 200 rows in a page.
    var count = 0;
    fetch.parentrowId = node._parent === undefined ? undefined : node._parent.rowId;
    wb.visitProperties(fetch, function(subNode, yas) {
        actualNodes[subNode.rowId] = subNode;
        var uiTreeNode = uiTreeNodes[subNode.rowId];
        if (uiTreeNode === undefined) {
            uiTreeNode = createTreeNode(tree, subNode.rowId, subNode.displayAs)
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
        //uiTreeNode.depth = depth;
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
    node.visitTraverse(function(subNode) {
        subNode._update(properties);
    });
    this.clearRowState();
    var nodelist = this.nodelist;
    //expand own children when own childrensize <  MAX viewtotal
    node.visitTraverse(function(subNode) {
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
Node.prototype._update = function(properties) {
    var wb = this._tree.workbook;
    var fetch = wb.getNode(this.rowId)
    //should also be a property given from outside...
    this.tuple = fetch.tuple;
    this.displayAs = fetch.displayAs;
    var wb = this._tree.workbook;
    for (var property in properties) {
        var value, dirty = false;

        var newValue = wb.get(this.rowId, property);
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
function PresentationParser(){
}
var presentationConverter = {
    exportAsObject: true,
    hide: true,
    name: 'presentation',
    headername: 'Native Object Presentation',
    parse: function(json) {
        throw new Error('Not yet supported');
    },
    deParse: function(rowId, workbook) {
        var modelName = workbook.getSolutionName();
        var rootNode = workbook.getRootSolutionProperty(modelName);
        if (rootNode !== undefined) {
            var tree = new Tree(rootNode.rowId);
            tree.workbook = workbook;
            workbook.visitProperties(rootNode, function(node) {
                //skip the rootnode, we just used it
                if (node.rowId !== rootNode.rowId) {
                    //can only make nodes via a Tree.
                    //To enforce integrity
                    var newNode = createTreeNode(tree, node.rowId, node.displayAs);
                    if (node.parentrowId !== undefined) {
                        tree.addChild(node.parentrowId, newNode);
                    }
                }
            });
        }
        var exportValue = {
            tree: tree === undefined ? {
                getNode: function() {
                    return undefined
                }, visit: function() {
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
            move: function(rowId) {
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
                throw Error('Should not be possible WHY???');
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
function createTreeNode(tree, nodeId, displayAs) {
    return tree.createNode(nodeId);
}
SolutionFacade.addParser(presentationConverter)