Error.prototype.stack = Error.prototype.stack || "";

require('../../lme-core/exchange_modules/lme/lmeparser');
require('../../formulajs-connect');
require('../../lme-core/exchange_modules/jsonvalues/jsonvalues');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../../math');
const DEFAULT_MODELNAME = "SCORECARDTESTMODEL";
const LMEFacade = require('../../lme-core').LMEFacade;
LMEFacade.addFunctions(require("../../formulajs-connect").formulajs);

function LmeAPI(TimeModel, Ctx, interval, optsArg) {
    const Context = require('../../lme-core/src/Context');
    const WorkBook = require('../../lme-core/src/JSWorkBook');
    //TODO: the TimeModel is part of the Context object.

    if (TimeModel) {
        const CTimeModel = require('../../lme-core/src/TimeAxis')
        this.lme = new WorkBook(Ctx || new Context(), new CTimeModel(TimeModel), interval);

    } else {
        const BkyearTimeModel = require('../../lme-core/src/XAxis');
        this.lme = new WorkBook(Ctx || new Context(), new BkyearTimeModel(), interval);
    }

    this.modelName = undefined;
    this.urlPrefix = '';
}

LmeAPI.prototype.hasChanges = function() {
    return this.lme.context.hasChanges();
}
//*QUICK-FIX*//
LmeAPI.prototype.cleanValues = function() {
    return this.lme.clearValues();
}
LmeAPI.prototype.getTimeViews = function() {
    return this.lme.getTimeViews();
}
LmeAPI.prototype.addFunctions = LMEFacade.addFunctions;
LmeAPI.prototype.exportLME = function() {
    return this.lme.export('lme')
}
LmeAPI.prototype.importLME = function(json) {
    this.lme.importSolution(json, 'lme')
}
LmeAPI.prototype.exportJavaScript = function() {
    return this.lme.export('js')
}
/**
 * Not used in Client UI input rendering
 */
LmeAPI.prototype.importFFL = function(ffl) {
    this.lme.importFFL(ffl)
}
LmeAPI.prototype.setColumnOffset = function(delta) {
    this.lme.setColumnOffset(delta)
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
LmeAPI.prototype.exportScreenDefinition = function(nodeId) {
    const rootNode = this.lme.getRootSolutionProperty()
    return this.lme.export('screendefinition', rootNode)
}
LmeAPI.prototype.importData = function(valueAsJSON) {
    this.lme.importSolution(valueAsJSON, 'jsonvalues')
}
/**
 * use modelName from this.lme.modelName
 * use token form this.lme.context.uuid
 */
LmeAPI.prototype.loadData = function(callBack, id) {
    var self = this;
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#' + DEFAULT_MODELNAME + '&DEMO&6'
    var params = window.location.href.split('#')[1].split('&')
    var columnSize = parseInt(params.length > 2 ? (params[2] || '6') : '6')
    self.modelName = params[0] || DEFAULT_MODELNAME;
    var userID = (params[1] || 'DEMO')

    self.lme.context.saveToken = userID;
    var http = new XMLHttpRequest();
    var url = self.urlPrefix + 'data/' + (id || userID);
    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var returnData = JSON.parse(http.responseText);
            self.lme.context.saveToken = returnData.id.indexOf(',') > 0 ? userID : returnData.id;
            self.importData(returnData)
            window.location.href = '#' + self.modelName + '&' + self.lme.context.saveToken + "&" + columnSize
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
    const self = this;
    //send data to server to store
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#' + DEFAULT_MODELNAME + '&DEMO&6'
    var params = window.location.href.split('#')[1].split('&')
    self.modelName = params[0] || DEFAULT_MODELNAME;
    var userID = params[1] || 'DEMO'
    var columnSize = parseInt(params.length > 1 ? (params[2] || '6') : '6')
    self.lme.context.saveToken = userID;
    var http = new XMLHttpRequest();
    http.open("POST", 'saveUserData/' + self.lme.context.saveToken, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            const returnData = JSON.parse(http.responseText);
            self.lme.context.saveToken = returnData.saveToken;
            window.location.href = '#' + self.modelName + '&' + self.lme.context.saveToken + '&' + columnSize
        }
    };
    http.onload = function() {
        self.lme.context.audit = []
        self.lme.context.calc_count++;
        callBack(http.responseText)
    };

    http.send(JSON.stringify({
        data: self.exportData()
    }));
    return http;
}
module.exports = LmeAPI;