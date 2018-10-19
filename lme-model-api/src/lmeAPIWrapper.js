import { LmeAPI } from './lme'

window.log = {}
const LMEMETA = new LmeAPI(undefined, undefined, undefined, undefined)

LMEMETA.importLME(global.JSON_MODEL)//JSON_MODEL is injected by browserify
window.LME = LMEMETA.exportWebModel()
window['LMEMETA'] = LMEMETA
global['LMEMETA'] = LMEMETA