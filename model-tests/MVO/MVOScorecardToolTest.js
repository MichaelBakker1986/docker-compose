import assert from 'assert'
import { readFileSync } from 'fs'
import { ScorecardTool } from '../../lme-core/exchange_modules/ffl/ScorecardTool'
import { RegisterToFFL } from '../../lme-core/exchange_modules/ffl/RegisterToFFL'

const mvoFLLFile = readFileSync(__dirname + '/MVO.ffl', 'utf8')
const parsedMVOFFL = new RegisterToFFL(new ScorecardTool().parse(mvoFLLFile)).toGeneratedFFL({ rootVariableName: undefined }).join('\n')
assert.ok(parsedMVOFFL.length > 100)
assert.ok(new RegisterToFFL(new ScorecardTool().parse(mvoFLLFile)).toGeneratedCommaSeperated().length > 100)
