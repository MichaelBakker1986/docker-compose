Error.prototype.stack = Error.prototype.stack || "";
MatrixLookup = function() {
    return 1;
}
require('../../ff-fes/exchange_modules/lme/lmeparser');
require('../../ff-fes/exchange_modules/jsonvalues/jsonvalues');
require('../../ff-math');

var fesjsApi = require('../../ff-fes').fesjs;
fesjsApi.addFunctions(require("../../ff-formulajs/ff-formulajs").formulajs);

function LmeAPI() {
    let FESContext = require('../../ff-fes/fesjs/fescontext');
    let WorkBook = require('../../ff-fes/fesjs/JSWorkBook');
    this.lme = new WorkBook(new FESContext());
    this.saveToken = undefined;
    this.modelName = undefined;
    this.urlPrefix = '';
}

LmeAPI.prototype.addFunctions = fesjsApi.addFunctions;
LmeAPI.prototype.exportLME = function() {
    return this.lme.export('lme')
}
LmeAPI.prototype.importLME = function(json) {
    this.lme.importSolution(json, 'lme')
}
LmeAPI.prototype.exportJavaScript = function() {
    return this.lme.export('js')
}
LmeAPI.prototype.importFFL = function(ffl) {
    this.lme.importSolution(ffl, 'ffl')
}
LmeAPI.prototype.exportFFL = function() {
    return this.lme.export('ffl')
}
LmeAPI.prototype.exportPresentation = function() {
    return this.lme.export('presentation')
}
LmeAPI.prototype.exportWebModel = function() {
    return this.lme.export('webexport')
}
LmeAPI.prototype.exportData = function() {
    return this.lme.export('jsonvalues')
}
LmeAPI.prototype.importData = function(valueAsJSON) {
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
LmeAPI.prototype.loadData = function() {
    var self = this;
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#MVO&DEMO'
    var params = window.location.href.split('#')[1].split('&')
    self.modelName = params[0] || 'MVO';
    let userID = params[1] || 'DEMO'
    self.saveToken = userID;
    var http = new XMLHttpRequest();
    var url = self.urlPrefix + '/id/' + self.saveToken + '/data';
    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            let returnData = JSON.parse(http.responseText);
            self.saveToken = returnData.id;

            for (var key in returnData.values) {
                let dataObject = returnData.values[key];
                LME.nodes[correctFileName(key)].cols[parseInt(dataObject.colId) - 2].value = dataObject.value
            }
            window.location.href = '#' + self.modelName + '&' + self.saveToken
        } else if (http.status !== 0) {
            console.info('State changed:' + http.status + ':' + http.readyState)
        }
    }
    http.send();
}
LmeAPI.prototype.persistData = function() {
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
    var url = self.urlPrefix + '/id/' + self.saveToken + '/data';
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            let returnData = JSON.parse(http.responseText);
            self.saveToken = returnData.saveToken;
            window.location.href = '#' + self.modelName + '&' + self.saveToken
        }
    };
    http.send(JSON.stringify({data: self.exportData()}));
}
module.exports = LmeAPI;