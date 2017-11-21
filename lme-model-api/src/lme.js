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

LmeAPI.prototype.hasChanges = function() {
    return this.lme.context.hasChanges();
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
LmeAPI.prototype.exportWebModel = function(rootNode) {
    return this.lme.export('webexport', rootNode)
}
LmeAPI.prototype.importWebModel = function(webDesign) {
    return this.lme.importSolution(webDesign, 'webexport')
}
LmeAPI.prototype.exportData = function() {
    return this.lme.export('jsonvalues')
}
LmeAPI.prototype.importData = function(valueAsJSON) {
    this.lme.importSolution(valueAsJSON, 'jsonvalues')
}
/**
 * use modelName from this.lme.modelName
 * use token form this.lme.context.uuid
 */
LmeAPI.prototype.loadData = function(callBack) {
    var self = this;
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#MVO&DEMO'
    var params = window.location.href.split('#')[1].split('&')
    self.modelName = params[0] || 'MVO';
    let userID = params[1] || 'DEMO'
    //TODO: remove 'saveToken'
    self.saveToken = userID;
    self.lme.context.saveToken = userID;
    var http = new XMLHttpRequest();
    var url = self.urlPrefix + '/id/' + self.saveToken + '/data';
    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            let returnData = JSON.parse(http.responseText);
            self.saveToken = returnData.id;
            self.lme.context.saveToken = returnData.id;
            self.importData(returnData)
            window.location.href = '#' + self.modelName + '&' + self.saveToken
        }
    }
    http.onload = function() {
        self.lme.context.audit = []
        self.lme.context.calc_count++;
        callBack(http.responseText)
    };
    http.send();
    return http;
}
LmeAPI.prototype.persistData = function(callBack) {
    var self = this;
    //send data to server to store
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#MVO&DEMO'
    var params = window.location.href.split('#')[1].split('&')
    self.modelName = params[0] || 'MVO';
    let userID = params[1] || 'DEMO'
    let liveUrl = 'transformFFL_LME/' + self.modelName + '.js'
    //TODO: remove 'saveToken'
    self.saveToken = userID;
    self.lme.context.saveToken = userID;
    var http = new XMLHttpRequest();
    var url = self.urlPrefix + '/id/' + self.saveToken + '/data';
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            let returnData = JSON.parse(http.responseText);
            self.saveToken = returnData.saveToken;
            self.lme.context.saveToken = returnData.saveToken;
            window.location.href = '#' + self.modelName + '&' + self.saveToken
        }
    };
    http.onload = function() {
        self.lme.context.audit = []
        self.lme.context.calc_count++;
        callBack(http.responseText)
    };

    http.send(JSON.stringify({data: self.exportData()}));
    return http;
}
module.exports = LmeAPI;