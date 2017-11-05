require('../../ff-fes/exchange_modules/presentation/webexport');
var excelPlugin = require('../../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
const LME = require('../../lme/src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
/* FFL->LME->WebExport */
MVO.importFFL("" + fs.readFileSync(__dirname + '/MVO.ffl'));
fs.writeFileSync(__dirname + '/MVO.json', MVO.exportLME());
const nodes = MVO.exportWebModel().nodes;

const [Q_MAP01_VRAAG01_MEMO, FES_LAYOUTNR, RootSub1, FES_COLUMN_VISIBLE] = [nodes.Q_MAP01_VRAAG01_MEMO, nodes.FES_LAYOUTNR, nodes.RootSub1, nodes.FES_COLUMN_VISIBLE];
const [Q_MAP01, Q_MAP01_ENTEREDREQUIREDVARS, Q_MAP01_REQUIREDVARS, Q_MAP01_PARAGRAAF00, Q_MAP01_VRAAG01] = [nodes.Q_MAP01, nodes.Q_MAP01_ENTEREDREQUIREDVARS, nodes.Q_MAP01_REQUIREDVARS, nodes.Q_MAP01_PARAGRAAF00, nodes.Q_MAP01_VRAAG01];

assert(Q_MAP01.value)
assert(Q_MAP01_ENTEREDREQUIREDVARS.value == 0)
assert(Q_MAP01_REQUIREDVARS.value == 0)
Q_MAP01_ENTEREDREQUIREDVARS.value = 1
assert(!Q_MAP01.value)
//basic model tests.
assert(FES_COLUMN_VISIBLE.value == 1)
FES_COLUMN_VISIBLE.value = 20
assert(FES_COLUMN_VISIBLE.value == 20)
assert(Array.isArray(FES_LAYOUTNR.choices));
assert(Array.isArray(FES_LAYOUTNR.choices));
assert(RootSub1.locked == 1)
assert(RootSub1.title == "General variables for webclient")
assert(RootSub1.visible == 0)
assert(Q_MAP01_PARAGRAAF00.hint == "Op https, //www.iso.org/iso-26000-social-responsibility.html vindt u meer informatie over deze ISO richtlijn. En op https, //www.iso.org/obp/ui/iso, std, iso, 26000, ed-1, v1, en vindt u de openbare inhoud (uit 2010) van deze richtlijn. Deze stap van de MVO Scan betreft hoofdstuk 4 van de ISO 26000 richtlijn. Het MVO-beleid van de organisatie is gebaseerd op onder andere deze zeven principes.")
var x = FES_LAYOUTNR;

assert(!Q_MAP01_VRAAG01_MEMO.visible)
Q_MAP01_VRAAG01.value = 1
assert(Q_MAP01_VRAAG01_MEMO.visible)
MVO.lme.fixProblemsInImportedSolution()

