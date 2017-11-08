/**
 * Test LOAD and SAVE to storage
 */
XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var modelAPI = require('../src/lme')
var newModel = new modelAPI();
newModel.importLME(require('./TESTMODEL.json'));
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

    testLoad() {
       var all =  newModel.loadData();
    }
}
let lmeApiTester = new LmeApiTester();
lmeApiTester.testLoad()