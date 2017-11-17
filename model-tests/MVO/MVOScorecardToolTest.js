const mvoFLLFile = require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8');
const scorecardTool = require('../ScorecardTool').ScorecardTool;
const parsedMVOFFL = scorecardTool.parse(mvoFLLFile)

const linesOriginalFFLFile = mvoFLLFile.split('\n')
const linesParsedMVOFFL = parsedMVOFFL.split('\n')

/**
 * initial check
 */
for (var index = 0; index < linesOriginalFFLFile.length; index++) {
    var lineOriginal = linesOriginalFFLFile[index];
    var lineParsed = linesParsedMVOFFL[index];
    if (lineOriginal !== lineParsed) {
        throw Error('not expected output')
    }
}

