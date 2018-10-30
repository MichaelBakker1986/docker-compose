import EconomicEditorView from '../../lme-model-api/src/EconomicEditorView'
import { readFileSync }   from 'fs'

const mvoFLLFile = readFileSync(__dirname + '/KSP.ffl', 'utf8')
EconomicEditorView.parse(mvoFLLFile)



