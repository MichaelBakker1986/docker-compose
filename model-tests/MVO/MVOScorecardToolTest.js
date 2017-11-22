const mvoFLLFile = require('fs').readFileSync(__dirname + '/../../ff-ssh-git/resources/MVO.ffl', 'utf8');
/*let scorecardTool = new ScorecardTool().parse(require('fs').readFileSync(__dirname + '/MVO/MVO.ffl', 'utf8'));
console.info(scorecardTool)*/
const scorecardTool = require('../ScorecardTool').ScorecardTool;
const parsedMVOFFL = scorecardTool.parse(mvoFLLFile)
console.info(parsedMVOFFL)