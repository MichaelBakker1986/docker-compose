/**
 * Test LOAD and SAVE to storage
 */

XMLHttpRequest = require("xhr2").XMLHttpRequest;
var assert = require('assert')
var modelAPI = require('../src/lme')
var log = require('log6')
require('../../lme-core/exchange_modules/presentation/webexport');
var rp = require('request-promise');
var newModel = new modelAPI();
newModel.importLME(require('./TESTMODEL.json'));
LME = newModel.exportWebModel()
var uuid = require('uuid')
var saveToken = uuid();
var [VariableOne, VariableTwo, TestNULL] = [LME.nodes.VariableOne, LME.nodes.VariableTwo, LME.nodes.TotalConfusedMore]

window = {
    location: {
        href: "http://10.0.75.1:8083/id/DEMO/grid_example.html#MVO&" + saveToken
    }
}
newModel.lme.context.saveToken = saveToken;

class LmeApiTester {
    constructor() {
        newModel.urlPrefix = 'http://127.0.0.1:8085'
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
        TestNULL.value = 100;
        assert.ok(VariableOne.value == 1000)
        assert.ok(VariableTwo.value == 2000)
        assert.ok(TestNULL.value == 100)
        let allChangedValues = newModel.lme.getAllChangedValues();
        newModel.persistData(function(responseText) {
            VariableOne.value = null;
            VariableTwo.value = null;
            let allChangedValues = newModel.lme.getAllChangedValues();
            newModel.loadData(function() {
                assert.ok(VariableOne.value == 1000)
                assert.ok(VariableTwo.value == 2000)
                assert.ok(TestNULL.value == 100)
                let data = JSON.parse(responseText);
                VariableTwo.value = 3000;
                TestNULL.value = null;
                let allChangedValues = newModel.lme.getAllChangedValues();
                newModel.persistData(function(responseText) {
                    VariableOne.value = null;
                    VariableTwo.value = null;
                    let data = JSON.parse(responseText);
                    VariableTwo.value = 8000;
                    self.testReceive(data.saveToken)
                    let allChangedValues = newModel.lme.getAllChangedValues();
                    newModel.loadData(function() {
                        assert.ok(TestNULL.value == 101)
                        assert.ok(VariableOne.value == 1000)
                        assert.ok(VariableTwo.value == 3000)
                        let allChangedValues = newModel.lme.getAllChangedValues();
                    });
                });
            });
        });
    }

    testLoad() {
        newModel.loadData(function() {
            log.info("model log: " + JSON.parse(this.responseText))
        });
    }
}

let lmeApiTester = new LmeApiTester();
lmeApiTester.testSave()
//lmeApiTester.testReceive('TEST');
//lmeApiTester.testLoad()
