//create an index

const LME = require('../lme-model-api/src/lme')
const Register = require('../lme-core/exchange_modules/ffl2/Register').Register
const modelRegister = new Register();

const RegisterToFFL = require('../lme-core/exchange_modules/ffl2/RegisterToFFL').RegisterToFFL
require('../lme-core/exchange_modules/ffl2/RegisterToLMEParser')//should not be impressive at all..

const ScorecardTool = require('../lme-core/exchange_modules/ffl2/ScorecardTool').ScorecardTool
const FFLFormatter = require('../lme-core/exchange_modules/ffl2/FFLFormatter').FFLFormatter
const ffl = require('fs').readFileSync(__dirname + '/MVO/MVO.ffl', 'utf-8')
//const fllToIndex = new PropertiesModuleFFLFormat(modelRegister).parse(ffl);

var now = require('performance-now')

var fflformat = FFLFormatter.create(modelRegister, ffl)
fflformat.indexProperties()
let start = now()
//place the index in the FFl2Indexer and print the result
const data = new RegisterToFFL(modelRegister).toGeneratedFFL("Q_ROOT", 'MVO').join('\n');
const indexer = new ScorecardTool().parse(ffl)
const scorecarddata = new RegisterToFFL(indexer).toGeneratedFFL(undefined, 'MVO').join('\n');
const lme = new LME();
lme.lme.modelName = "MVO"
lme.importFFL2(indexer)
//new RegisterLMEParser(modelRegister)
console.info(scorecarddata);
console.info((now() - start).toFixed(3))
