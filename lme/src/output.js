process.loglevel = "info";
global.loglevel = "info";
require('../../ff-fes/exchange_modules/presentation/presentation');
require('../../ff-fes/exchange_modules/presentation/webexport');
var model = require('./lme')
LME = new model()
LME.importLME(JSON_MODEL);