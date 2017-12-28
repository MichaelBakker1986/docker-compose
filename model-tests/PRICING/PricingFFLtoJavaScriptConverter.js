var modelName = 'PRICING'
require('../../lme-core/exchange_modules/lme/javascript');
const modelAPI = require('../../lme-model-api/src/lme');
const log = require('log6');
const fs = require('fs');
const newModel = new modelAPI();
const assert = require('assert');
const escodegen = require('escodegen');
var formulaA = require('excel-formula');
Matrixlookup = function() {
    return 1;
}

function correctFileName(name) {
    return name.replace(/^[^_]+_([\w]*_\w+)$/gmi, '$1');
}

function regenerate(body) {
    return escodegen.generate(body, escodegenOptions);
}

var escodegenOptions = {
    format: {
        renumber: true,
        hexadecimal: true,
        escapeless: true,
        compact: true,
        semicolons: false,
        parentheses: false
    }
};
newModel.importFFL(fs.readFileSync(__dirname + '/' + modelName + '.ffl', 'utf8'));
let exportJavascript = newModel.exportJavaScript();
var javascript = '';
String.prototype.replaceAll = function(or, alt) {
    return this.replace(new RegExp(or, 'gmi'), alt)
}
exportJavascript.formulas.forEach((f) => {
    let functionScript = regenerate(f.body);
    javascript += '\n/* ' + f.name + ':' + f.original + ' */';
    javascript += '\nfunction a' + f.id + '(f,x,y,z,v)\n{\n\treturn ' + formulaA.formatFormula(functionScript) + ';\n}';
})
var jsMathA = require('../../math/jsMath.json');

exportJavascript.formulas.forEach((f) => {
    javascript = javascript.replaceAll('a' + f.id, correctFileName(f.name))
})
javascript = javascript.replace(/=\s*\n\s*=/gmi, '==')
javascript = javascript.replace(/=\s*\n\s*=/gmi, '==')
javascript = javascript.replace(/&\s*\n\s*&/gmi, '&&')
javascript = javascript.replace(/\! =/gmi, '!=')
javascript = javascript.replace(/ 1e4 /gmi, parseFloat("1"))
javascript = javascript.replace(/ 1e /gmi, parseFloat("1"))

for (var key in jsMathA) {
    var f = jsMathA[key];
    let functionScript = f.body
    javascript += '\n/* ' + key + ':' + (functionScript || f) + ' */';
    let javascript2;
    if (f.body) {
        javascript2 = '\nfunction ' + key + '(' + f.args + ')\n{\n\t' + (functionScript.replace(/^{/, '').replace(/\}$/, '')) + ';\n}';
    } else {
        javascript2 = '\n' + key + '=' + f + '\n';
    }
    javascript += javascript2;
}
fs.writeFileSync(__dirname + '/' + modelName + '_EXE.js', javascript);

