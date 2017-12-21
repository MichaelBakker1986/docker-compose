const LME = require('../../lme-model-api/src/lme')
const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
const modelRegister = new Register();
const RegisterToFFL = require('../../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL
require('../../lme-core/exchange_modules/ffl/RegisterToLMEParser')
const ScorecardTool = require('../../lme-core/exchange_modules/ffl/ScorecardTool').ScorecardTool
const FFLFormatter = require('../../lme-core/exchange_modules/ffl/FFLFormatter').FFLFormatter
const ffl = require('fs').readFileSync(__dirname + '/../MVO/MVO.ffl', 'utf-8')
var now = require('performance-now')
var fflformat = FFLFormatter.create(modelRegister, ffl)
fflformat.indexProperties()
let start = now()
const data = new RegisterToFFL(modelRegister).toGeneratedFFL("Q_ROOT", 'MVO').join('\n');
const indexer = new ScorecardTool().parse(ffl)
const scorecarddata = new RegisterToFFL(indexer).toGeneratedFFL(undefined, 'MVO').join('\n');
const lme = new LME();
lme.lme.modelName = "MVO"
lme.importFFL2(scorecarddata)