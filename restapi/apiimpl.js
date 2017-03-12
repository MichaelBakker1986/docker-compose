var Promise = require('promise')
var log = require('ff-log')
var DBConn;
var apiimpl = function (DBConnarg) {
    DBConn = DBConnarg;
}
var fesjsApi = require('ff-fes');
var fs = require('fs');
var data = fs.readFileSync('./resources/KSP.ffl', 'utf8');
fesjsApi.init(data);

apiimpl.prototype.value = fesjsApi.value;
apiimpl.prototype.loadModel = function (data) {
    return new Promise(function (success, err) {
        DBConn('SELECT * FROM fes_values').then(function (result) {
            //result.entry = data;
            success({
                entry: data,
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