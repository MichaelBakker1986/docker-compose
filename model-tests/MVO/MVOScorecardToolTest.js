const mvoFLLFile = require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8');
const scorecardTool = require('../../lme-core/exchange_modules/ffl/ScorecardTool').ScorecardTool;
const parsedMVOFFL = scorecardTool.parse(mvoFLLFile)
console.info(parsedMVOFFL)