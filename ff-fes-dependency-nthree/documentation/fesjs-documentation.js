var madge = require('madge');
var graphviz = require('graphviz');
var log = require('ff-log')
var path = require('path')
/*var graph = require('ngraph.graph')();
 graph.beginUpdate();*/
var fs = require('fs');
function Documentation() {
}
var esprima = require('esprima');
var fs = require('fs');
function walkAst(info, parent, node) {
    if (node && node.type === 'MemberExpression') {
        if (node.object.name === info.servicename) {
            info.callees[node.property.name] = true
            log.info(info.name + ':' + node.object.name + '.' + node.property.name)
        }
    }
    for (var key in node) {
        if (node[key]) {
            var child = node[key];
            if (typeof child === 'object') {
                if (Array.isArray(child)) {
                    for (var i = 0, len = child.length; i < len; i++) {
                        walkAst(info, node, child[i]);
                    }
                }
                else {
                    walkAst(info, node, child);
                }
            }
        }
    }
}
var includemethodcalls = true;
var moduleName = 'ff-fes';
Documentation.prototype.createGraph = function () {
    var graph = graphviz.digraph("G ");
    graph.set("rankdir", "LR");
// Add node (ID: Hello)
    return madge('../../' + moduleName + '/ff-fes.js', {
        excludeRegExp: ['Tree$', 'Node$', 'JSVisitor$'],
        fileExtensions: ['js']
    }).then(function (res) {
        var dot = res.obj();
        for (var key in dot) {
            try {
                var start = graph.addNode(key)
                // log.info('../../restapi/' + key + '.js', 'utf-8')
                var source = fs.readFileSync('../../' + moduleName + '/' + key + '.js', 'utf-8')
                var ast = esprima.parse(source)

                for (var dep in dot[key]) {

                    var metaData = {
                        callees: {},
                        servicename: path.basename(dot[key][dep], '.js'),
                        name: key
                    };

                    walkAst(metaData, undefined, ast)
                    var edge = graph.addEdge(start, dot[key][dep])
                    if (includemethodcalls) {
                        edge.set('label', Object.keys(metaData.callees).toString().replace(/,/gmi, '\\n'));
                    }
                }

            } catch (err) {
                log.warn(err)
            }
        }
        var toDot = graph.to_dot();
        fs.writeFile('./' + moduleName + '.txt', toDot, function (res) {
            log.info('done')
        })
        return result;
    }).catch(function (err) {
        log.error(err)
    });
}
/*graph.endUpdate();*/
Documentation.prototype.createGraph()
module.exports = Documentation.prototype;