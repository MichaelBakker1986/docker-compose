Error.prototype.stack = Error.prototype.stack || "";
MatrixLookup = function() {
    return 1;
}
require('../../ff-fes/exchange_modules/lme/lmeparser');
require('../../ff-fes/exchange_modules/jsonvalues/jsonvalues');
require('../../ff-math');

var fesjsApi = require('../../ff-fes').fesjs;
fesjsApi.addFunctions(require("../../ff-formulajs/ff-formulajs").formulajs);

function LME() {
    let FESContext = require('../../ff-fes/fesjs/fescontext');
    let WorkBook = require('../../ff-fes/fesjs/JSWorkBook');
    this.lme = new WorkBook(new FESContext());
    this.saveToken = undefined;
    this.modelName = undefined;
}

LME.prototype.addFunctions = fesjsApi.addFunctions;
LME.prototype.exportLME = function() {
    return this.lme.export('lme')
}
LME.prototype.importLME = function(json) {
    this.lme.importSolution(json, 'lme')
}
LME.prototype.exportJavaScript = function() {
    return this.lme.export('js')
}
LME.prototype.importFFL = function(ffl) {
    this.lme.importSolution(ffl, 'ffl')
}
LME.prototype.exportFFL = function() {
    return this.lme.export('ffl')
}
LME.prototype.exportPresentation = function() {
    return this.lme.export('presentation')
}
LME.prototype.exportWebModel = function() {
    return this.lme.export('webexport')
}
LME.prototype.exportData = function() {
    return this.lme.export('jsonvalues')
}
LME.prototype.importData = function(valueAsJSON) {
    this.lme.importSolution(valueAsJSON, 'jsonvalues')
}

function correctFileName(name) {
    return name.replace(/^[^_]+_*([\w]*_\w+)$/gmi, '$1');
}

/**
 * TODO: refactor, its not that pretty.
 * use modelName from this.lme.modelName
 * use token form this.lme.context.uuid
 */
LME.prototype.loadData = function() {
    var self = this;
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#MVO&DEMO'
    var params = window.location.href.split('#')[1].split('&')
    self.modelName = params[0] || 'MVO';
    let userID = params[1] || 'DEMO'
    self.saveToken = userID;
    var http = new XMLHttpRequest();
    var url = '/id/' + self.saveToken + '/data';
    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            let returnData = JSON.parse(http.responseText);
            self.saveToken = returnData.id;

            for (var key in returnData.values) {
                let dataObject = returnData.values[key];
                //TODO: duplicate LME variable
                window.LME.nodes[correctFileName(key)].cols[parseInt(dataObject.colId) - 2].value = dataObject.value
            }
            window.location.href = '#' + self.modelName + '&' + self.saveToken
        }
    }
    http.send();
}
LME.prototype.persistData = function() {
    var self = this;
    //send data to server to store
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#MVO&DEMO'
    var params = window.location.href.split('#')[1].split('&')
    self.modelName = params[0] || 'MVO';
    let userID = params[1] || 'DEMO'
    let liveUrl = 'transformFFL_LME/' + self.modelName + '.js'
    self.saveToken = userID;
    var http = new XMLHttpRequest();
    var url = '/id/' + self.saveToken + '/data';
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            let returnData = JSON.parse(http.responseText);
            alert(http.responseText);
            self.saveToken = returnData.saveToken;
            window.location.href = '#' + self.modelName + '&' + self.saveToken
        }
    }
    var data = JSON.stringify({data: this.exportData()});
    http.send(data);
}
module.exports = LME;