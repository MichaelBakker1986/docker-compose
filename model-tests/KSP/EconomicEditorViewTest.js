const mvoFLLFile = require('fs').readFileSync(__dirname + '/KSP.ffl', 'utf8');
require('../EconomicEditorView').EconomicEditorView.parse(mvoFLLFile)



