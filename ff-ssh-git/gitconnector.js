var glob = require('glob')
var log = require('ff-log')
var fs = require('fs');

/**
 * Prefer parsed JSON file above FFL.
 * TODO: change into canvas_json files which is way faster to parse.
 */
function ModelListener() {
}

ModelListener.prototype.initializeModels = function() {
    var modelListener = this;
    var ffls = [];
    var fetFileNames = function(src, callback) {
        glob(src + '**/json/**', callback);
    };
    var modelCallback = function(err, res) {
        if (err) {
            log.warn('Error', err);
        } else {
            res.forEach(function(file) {
                if (file.toLowerCase().endsWith('.ffl')) {
                    fs.readFile(file, function read(err, data) {
                        if (err) {
                            throw err;
                        }
                        var modelData = "" + new Buffer(data, 'binary').toString('utf-8');
                        modelData = modelData.replace(/amount/gmi, 'Amount');
                        modelData = modelData.replace(/GoodWill/gmi, 'GoodWill');
                        modelData = modelData.replace(/Bookvalue/gmi, 'BookValue');
                        modelData = modelData.replace(/LiquidVATonCashExpenses/gmi, 'LiquidVATOnCashExpenses');
                        modelData = modelData.replace(/DiscountRateTaxShieldBasis/gmi, 'DiscountRateTaxShieldBasis')
                        modelData = modelData.replace(/krWirtschaftlichesEigenKapitalRating/gmi, 'krWirtschaftlichesEigenKapitalRating')
                        modelData = modelData.replace(/OtherTransitionalAssets/gmi, 'OtherTransitionalAssets')
                        modelData = modelData.replace(/LiquidVATonCashExpenses/gmi, 'LiquidVATOnCashExpenses')
                        ffls.push(modelData);
                        modelListener.onNewModel(modelData)
                    });
                }
            })
        }
    };
    fetFileNames(__dirname + '/../lme/public/', modelCallback);
}
ModelListener.prototype.onNewModel = function(modeldata) {
    log.info(modeldata)
}
exports.ModelListener = ModelListener;