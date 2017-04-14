var madge = require('madge');
graphviz = require('graphviz');
/*var graph = require('ngraph.graph')();
 graph.beginUpdate();*/

var graph = graphviz.digraph("G");
// Add node (ID: Hello)
madge('../../restapi/ff-fes-app.js').then(function (res) {
    var dependencyInfo = res.obj();
    console.log(dependencyInfo);
    for (var key in dependencyInfo) {
        var start = graph.addNode(key)
        for (var dep in dependencyInfo[key]) {
            graph.addEdge(start, dependencyInfo[key][dep])
        }
    }
    console.log(graph.to_dot());
});

/*graph.endUpdate();*/
module.exports = graph