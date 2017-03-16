var Promise = require('promise')
var log = require('ff-log')
var DBConn;
var apiimpl = function (DBConnarg) {
    DBConn = DBConnarg;
}
var fesjsApi = require('../ff-fes/ff-fes').fesjs;
//add excel functions, PPMT, IGG etc...
fesjsApi.addFunctions(require('../ff-formulajs/ff-formulajs').formulajs);
//add excel-lookup, MatrixLookup
fesjsApi.addFunctions(require('../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup);

var fs = require('fs');
var modelName = 'KSP'
var data = fs.readFileSync('./resources/' + modelName + '.ffl', 'utf8');
fesjsApi.init(data);

apiimpl.prototype.value = function (contextKey, variable, columncontext, value) {
    var context = DBConn.getContext(contextKey);
    var result = fesjsApi.value(context, modelName + '_' + variable, columncontext, value);
    return result;
}
apiimpl.prototype.context = function (contextKey, variable, columncontext, value) {
    var context = DBConn.getContext(contextKey);
    if (variable) {
        context[variable] = value
    }
    return context;
}
apiimpl.prototype.loadModel = function (contextKey) {
    return new Promise(function (success, err) {
        DBConn('SELECT * FROM fes_values').then(function (result) {
            //result.entry = data;
            success({
                entry: contextKey,
                data: result.data
            })
        }).catch(function (err) {
            log.error("ERROR", err);
        })
    })
}
apiimpl.prototype.getFFl = function (data) {
    return new Promise(function (success, err) {
        DBConn('SELECT property,content FROM k3_files where type = "ffl" order by modified limit 1').then(function (result) {
            var bufferBase64 = new Buffer(result.data[0].content, 'binary').toString('utf-8');
            //result.data = undefined;
            //result.entry = bufferBase64;
            success({
                entry: data,
                data: bufferBase64
            })
        }).catch(function (err) {
            info.error("ERROR", err);
        });
    })
}
module.exports = apiimpl;