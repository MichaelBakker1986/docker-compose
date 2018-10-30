/**
 * Just test for exceptions
 */
import EconomicEditorView from '../../lme-model-api/src/EconomicEditorView'
import { readFileSync }   from 'fs'

EconomicEditorView.parse(readFileSync(__dirname + '/../KSP/KSP2.ffl', 'utf8'))