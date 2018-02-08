const assert = require('assert')
const mvoFLLFile = require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8');
const ScorecardTool = require('../../lme-core/exchange_modules/ffl/ScorecardTool').ScorecardTool;
const RegisterToFFL = require('../../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL;
const parsedMVOFFL = new RegisterToFFL(new ScorecardTool().parse(mvoFLLFile)).toGeneratedFFL(null, null).join('\n')
assert.ok(parsedMVOFFL.length > 100)