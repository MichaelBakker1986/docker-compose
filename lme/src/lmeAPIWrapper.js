require('../../ff-fes/exchange_modules/presentation/webexport');
var model = require('./lme')
LMEMETA = new model()
LMEMETA.importLME(JSON_MODEL);//JSON_MODEL is injected by browserify
LME = LMEMETA.exportWebModel();