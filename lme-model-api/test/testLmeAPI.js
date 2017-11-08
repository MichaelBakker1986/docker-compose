/**
 * Test LOAD and SAVE to storage
 */

XMLHttpRequest = require("xhr2").XMLHttpRequest;
var modelAPI = require('../src/lme')
require('../../ff-fes/exchange_modules/presentation/webexport');
var newModel = new modelAPI();
newModel.importLME(require('./TESTMODEL.json'));
var webModel = newModel.exportWebModel()
var [VariableOne, VariableTwo] = [webModel.nodes.VariableOne, webModel.nodes.VariableTwo]
//console.info(newModel.exportLME())
window = {
    location: {
        href: "http://10.0.75.1:8083/id/DEMO/grid_example.html#MVO&DEMO"
    }
}

class LmeApiTester {
    constructor() {
        newModel.urlPrefix = 'http://localhost:8085'
    }

    testSave() {
        VariableOne.value = 1000;
        VariableTwo.value = 2000;
        newModel.persistData()
    }

    testLoad() {
        var all = newModel.loadData();
    }
}

let lmeApiTester = new LmeApiTester();
lmeApiTester.testSave()
//lmeApiTester.testLoad()
