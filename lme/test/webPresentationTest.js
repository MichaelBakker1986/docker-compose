require('../../ff-fes/exchange_modules/presentation/webexport');
var modelAPI = require('../src/lme')
var newModel = new modelAPI();
newModel.importLME(require('../public/json/KSP_canvas.json'));
let exportWebModel = newModel.exportWebModel();
for (var node in exportWebModel.nodes) {
    var n = exportWebModel.nodes[node];
    console.info(n.rowId + ":" + n.value);
}
console.info(exportWebModel.nodes);

