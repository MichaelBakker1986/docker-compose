require('../../ff-fes/exchange_modules/presentation/webexport');
var modelAPI = require('../src/lme')
var newModel = new modelAPI();
newModel.importLME(require('../public/json/KSP_canvas.json'));
let exportWebModel = newModel.exportWebModel();
exportWebModel.nodes.forEach((node) => {
    console.info(node.rowId + ":" + node.value);
})

console.info(exportWebModel);

