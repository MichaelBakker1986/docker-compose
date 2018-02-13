const glob = require('glob')
const log = require('log6')
const fs = require('fs');
const fileSystemFFLModelsSearchPath = __dirname + '/resources/**';
const enabledModels = (process.env.ENABLED_MODELS || '.*').split(',')

/**
 * Find FFL models from filesystem and load them.
 * Filtered by {@enabledModels}
 */
function ModelListener() {
    this.listeners = []
}

function enabledModel(caseInsensitiveFileName) {
    for (var i = 0; i < enabledModels.length; i++) {
        const enabledModelName = "/" + enabledModels[i] + "\\.";
        if (caseInsensitiveFileName.match(new RegExp(enabledModelName, 'i'))) {
            return true;
        }
    }
    return false;
}

ModelListener.prototype.loadModel = function(file) {
    const self = this;
    return function(err, data) {
        if (err) throw err;
        var modelData = data;
        /**
         * Windows client is case insensitive.
         * To load the models directly into linux some case-fixes are required.
         */
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
            self.onNewModel(modelData, file.toString())
        } catch (err) {
            log.warn("Failed to load model on path [%s] \nSee DEBUG logging to see why it has failed to load the model.", file.toString());
            if (log.DEBUG) log.error(err)
        }
    }
}
ModelListener.prototype.initializeModels = function() {
    const self = this;
    const fileLookupCallback = function(err, files) {
        if (err) log.warn('Error', err);
        else {
            files.forEach(function(file) {
                const caseInsensitiveFileName = file.toLowerCase()
                //filter files other than *.ffl or containing _tmp_
                if (caseInsensitiveFileName.endsWith('.ffl') && caseInsensitiveFileName.indexOf('_tmp_') == -1) {
                    if (enabledModel(caseInsensitiveFileName)) {
                        fs.readFile(file, 'utf8', self.loadModel(file));
                    }
                }
            })
        }
    };
    glob(fileSystemFFLModelsSearchPath, fileLookupCallback);
}
ModelListener.prototype.addListener = function(listener) {
    this.listeners.push(listener)
}
ModelListener.prototype.onNewModel = function(modeldata, path) {
    if (log.TRACE) log.trace(modeldata)
    for (var i = 0; i < this.listeners.length; i++) {
        this.listeners[i](modeldata, path)
    }
}
exports.ModelListener = ModelListener;