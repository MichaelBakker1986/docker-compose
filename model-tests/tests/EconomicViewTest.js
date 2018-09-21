/**
 * Just test for exceptions
 */
import { EconomicEditorView } from '../EconomicEditorView'
import { readFileSync }       from 'fs'

EconomicEditorView.parse(readFileSync(__dirname + '/../KSP/KSP2.ffl', 'utf8'))