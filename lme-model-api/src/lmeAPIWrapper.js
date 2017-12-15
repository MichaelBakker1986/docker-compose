var model = require('./lme')
log = {}
LMEMETA = new model()
LMEMETA.importLME(JSON_MODEL);//JSON_MODEL is injected by browserify
LME = LMEMETA.exportWebModel();