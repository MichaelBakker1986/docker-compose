var madge = require('madge');
var graphviz = require('graphviz');
var log = require('ff-log')
var path = require('path')
var walkAst = require('../../ast-node-utils').astWalk
var fs = require('fs');
var esprima = require('esprima');
/**
 * creation parameters
 */
var includemethodcalls = true;
var moduleName = 'ff-fes';

var graph = graphviz.digraph("G ");
graph.set("rankdir", "LR");
madge('../../' + moduleName + '/ff-fes.js', {
    excludeRegExp: ['Tree$', 'Node$', 'JSVisitor$', 'CustomImport'],
    fileExtensions: ['js']
}).then(function (res) {
    var dot = res.obj();
    for (var key in dot) {
        try {
            var start = graph.addNode(key)
            var source = fs.readFileSync('../../' + moduleName + '/' + key + '.js', 'utf-8')
            var ast = esprima.parse(source)
            for (var dep in dot[key]) {
                var metaData = {
                    callees: {},
                    servicename: path.basename(dot[key][dep], '.js'),
                    name: key
                };
                walkAst(function (info, node) {
                    if (node && node.type === 'MemberExpression') {
                        if (node.object.name === info.servicename) {
                            info.callees[node.property.name] = true
                            log.info(info.name + ':' + node.object.name + '.' + node.property.name)
                        }
                    }
                }, metaData, undefined, ast)
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
    fs.writeFile('../resources/' + moduleName + '.txt', toDot, function (res) {
        log.info('done')
    })
}).catch(function (err) {
    log.error(err)
});