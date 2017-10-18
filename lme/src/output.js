process.loglevel = "info";
global.loglevel = "info";
require('../../ff-fes/exchange_modules/presentation/presentation');
var model = require('./lme')
LME = new model()
LME.importLME(JSON_MODEL);