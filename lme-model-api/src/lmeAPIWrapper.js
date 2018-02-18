const model = require('./lme')
window.log = {}
const LMEMETA = new model()
LMEMETA.importLME(JSON_MODEL);//JSON_MODEL is injected by browserify
window.LME = LMEMETA.exportWebModel();
window.LMEMETA = LMEMETA