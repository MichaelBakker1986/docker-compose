const mvoFLLFile = require('fs').readFileSync(__dirname + '/../../git-connect/resources/MVO.ffl', 'utf8');
const scorecardTool = require('../../lme-core/exchange_modules/ffl2/ScorecardTool').ScorecardTool;
const parsedMVOFFL = scorecardTool.parse(mvoFLLFile)
console.info(parsedMVOFFL)