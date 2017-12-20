/**
 * Just test for exceptions
 */
const economicview = require('../EconomicEditorView').EconomicEditorView
economicview.parse(require('fs').readFileSync(__dirname + '/../KSP/KSP_experience.ffl', 'utf8'))
