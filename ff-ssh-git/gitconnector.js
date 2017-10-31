var glob = require('glob')
var log = require('ff-log')
var fs = require('fs');

function ModelListener() {
}
ModelListener.prototype.initializeModels = function() {
    var modelListener = this;
    var ffls = [];
    var fetFileNames = function(src, callback) {
        glob(src + '**/FFL/**', callback);
    };
    var modelCallback = function(err, res) {
        if (err) {
            console.log('Error', err);
        } else {
            res.forEach(function(file) {
                if (file.toLowerCase().endsWith('.ffl')) {
                    //these models are not supported for unknown reasons, most involve case-sensitive constructions
                    if (file.toLowerCase().endsWith('vbi.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('aabpricing.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('ingverslag.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('revisie.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('revisiegbi.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('revisiemkb.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('revisiemkb2.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('ingscg3.ffl')) {
                        return;
                    }
                    //manually fixed case-sensitive models
                    /*      if (file.toLowerCase().endsWith('ingscg3rev.ffl')) {
                     return;
                     }*/
                    fs.readFile(file, function read(err, data) {
                        if (err) {
                            throw err;
                        }
                        var modelData = new Buffer(data, 'binary').toString('utf-8');
                        ffls.push("" + modelData);
                        modelListener.onNewModel(modelData)
                    });
                }
            })
        }
    };
    //  fetFileNames(__dirname + '\\finanfinancial\\', modelCallback);
    fetFileNames(__dirname + '/resources/', modelCallback);
}
ModelListener.prototype.onNewModel = function(modeldata) {
    log.info(modeldata)
}
exports.ModelListener = ModelListener;