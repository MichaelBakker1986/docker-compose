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
        glob(src + '**', callback);
    };
    var modelCallback = function(err, res) {
        if (err) {
            log.warn('Error', err);
        } else {
            res.forEach(function(file) {
                if (file.toLowerCase().endsWith('.ffl') && file.toLowerCase().indexOf('_tmp_') == -1) {
                    fs.readFile(file, 'utf8', function read(err, data) {
                        if (err) {
                            throw err;
                        }
                        var modelData = data;
                        modelData = modelData.replace(/amount/gmi, 'Amount');
                        modelData = modelData.replace(/GoodWill/gmi, 'GoodWill');
                        modelData = modelData.replace(/MatrixLookup/gmi, 'MatrixLookup');
                        modelData = modelData.replace(/Startdate/gmi, 'StartDate');
                        modelData = modelData.replace(/Bookvalue/gmi, 'BookValue');
                        modelData = modelData.replace(/LiquidVATonCashExpenses/gmi, 'LiquidVATOnCashExpenses');
                        modelData = modelData.replace(/DiscountRateTaxShieldBasis/gmi, 'DiscountRateTaxShieldBasis')
                        modelData = modelData.replace(/krWirtschaftlichesEigenKapitalRating/gmi, 'krWirtschaftlichesEigenKapitalRating')
                        modelData = modelData.replace(/OtherTransitionalAssets/gmi, 'OtherTransitionalAssets')
                        modelData = modelData.replace(/LiquidVATonCashExpenses/gmi, 'LiquidVATOnCashExpenses')
                        try {
                            ffls.push(modelData);
                            modelListener.onNewModel(modelData)
                        } catch (err) {
                            log.warn("Could not initalize model [path] \n", file.toLowerCase(), modelData);
                            log.error(err)
                            if (log.DEBUG) log.error(err)
                        }
                    });
                }
            })
        }
    };
    fetFileNames(__dirname + '/resources/', modelCallback);
}
ModelListener.prototype.onNewModel = function(modeldata) {
    log.info(modeldata)
}
exports.ModelListener = ModelListener;