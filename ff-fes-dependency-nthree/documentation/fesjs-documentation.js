var madge = require('madge');
graphviz = require('graphviz');
var log = require('ff-log')
/*var graph = require('ngraph.graph')();
 graph.beginUpdate();*/

var graph = graphviz.digraph("G ");
graph.set("rankdir", "LR");
// Add node (ID: Hello)
madge('../../restapi/ff-fes-app.js').then(function (res) {
    var dot = res.obj();
    for (var key in dot) {
        var start = graph.addNode(key)
        for (var dep in dot[key]) {
            graph.addEdge(start, dot[key][dep])
        }
    }
    log.info(graph.to_dot());
});
/*graph.endUpdate();*/
module.exports = graph