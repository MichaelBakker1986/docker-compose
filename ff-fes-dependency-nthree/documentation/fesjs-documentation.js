var madge = require('madge');
var graphviz = require('graphviz');
var log = require('ff-log')
var Viz = require('viz.js')
/*var graph = require('ngraph.graph')();
 graph.beginUpdate();*/

function Documentation() {
}
Documentation.prototype.createGraph = function () {
    var graph = graphviz.digraph("G ");
    graph.set("rankdir", "LR");
// Add node (ID: Hello)
    return madge('../../restapi/ff-fes-app.js').then(function (res) {
        var dot = res.obj();
        for (var key in dot) {
            var start = graph.addNode(key)
            for (var dep in dot[key]) {
                graph.addEdge(start, dot[key][dep])
            }
        }
        var toDot = graph.to_dot();
        var result = Viz(toDot);
        log.info(result);
        return  result;
    });
}
/*graph.endUpdate();*/
Documentation.prototype.createGraph()
module.exports = Documentation.prototype;