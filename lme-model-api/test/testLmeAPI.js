/**
 * Test LOAD and SAVE to storage
 */

XMLHttpRequest = require("xhr2").XMLHttpRequest;

var modelAPI = require('../src/lme')
require('../../ff-fes/exchange_modules/presentation/webexport');
var rp = require('request-promise');
var newModel = new modelAPI();
newModel.importLME(require('./TESTMODEL.json'));
LME = newModel.exportWebModel()
var [VariableOne, VariableTwo] = [LME.nodes.VariableOne, LME.nodes.VariableTwo]
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

    testReceive(id) {
        rp({
            uri: newModel.urlPrefix + '/id/' + id + '/data',
            json: true // Automatically parses the JSON string in the response
        }).then(function(data) {
            console.log(JSON.stringify(data, null, 2));
        }).catch(function(err) {
            console.error('Failed to complete ', err);
        });
    }

    testSave() {
        var self = this;
        VariableOne.value = 1000;
        VariableTwo.value = 2000;
        newModel.persistData(function(responseText) {
            let data = JSON.parse(responseText);
            VariableTwo.value = 3000;
            newModel.persistData(function(responseText) {
                let data = JSON.parse(responseText);
                self.testReceive(data.saveToken)
                newModel.loadData(function() {
                    console.info('DONE')
                    console.info(VariableOne.value)
                    console.info(VariableTwo.value)
                });
            });
            self.testReceive(data.saveToken)
        });
    }

    testLoad() {
        newModel.loadData().onload = function() {
            console.info(JSON.parse(this.responseText))
        };
    }
}

let lmeApiTester = new LmeApiTester();
lmeApiTester.testSave()
//lmeApiTester.testReceive('TEST');
//lmeApiTester.testLoad()
