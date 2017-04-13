var dependencyInfo = require('./KSP_dependencies.json');
var graph = require('ngraph.graph')();
graph.beginUpdate();
function modelVariableName(name) {
    return name;// name.replace(/(^KSP_)/gmi, '').replace(/(_value$|_locked$|_visible$|_title$|_choices$)/gmi, '');
}
for (var key in dependencyInfo) {
    var formula = dependencyInfo[key];
    if (Object.keys(formula.deps).length > 0) {
        if (key.endsWith('_value')) {
            graph.addNode(modelVariableName(key), formula)
        }
    }
}
for (var key in dependencyInfo) {
    var formula = dependencyInfo[key];
    // if (Object.keys(formula.deps).length > ew) {
    if (Object.keys(formula.deps).length > 0) {
        //if (key.endsWith('_value')) {
        for (var dep in formula.deps) {
            graph.addLink(modelVariableName(key), modelVariableName(dep))
        }
        //}
    }
}
graph.endUpdate();
module.exports = graph