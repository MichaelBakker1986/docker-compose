require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const LME = require('../../lme-model-api/src/lme');
const assert = require('assert');
const Context  = require('../../lme-core/src/Context'),
      Register = require('../../lme-core/exchange_modules/ffl/Register').Register;
const context = new Context({ columnSize: 1, columns: ['value', 'visible'] });
const wb = new LME(null, context)
const register = new Register();
wb.importFFL({
    register: register,
    raw     : require('fs').readFileSync(__dirname + '/FyndooCreditRating.ffl', 'utf8')
});
const workbook = wb.lme;

const jbehaveTemplateInput = [];
const jbehaveTemplateOutput = [];
for (var i = 0; i < register.i.length; i++) {
    var variable = register.i[i];
    const variable_name = variable[register.schemaIndexes.name];
    const node = workbook.getNode(variable_name)
    const defaultValue = node.datatype == 'number' ? 1 : ('TestValue' + i);
    if (workbook.get(variable_name, 'locked')) {
        jbehaveTemplateOutput.push(["Then", variable_name, 'should be', null])
    } else {
        jbehaveTemplateInput.push(['When', variable_name, 'is set to', defaultValue])
        workbook.set(variable_name, defaultValue)
    }
}
for (var i = 0; i < jbehaveTemplateOutput.length; i++) {
    var variable = jbehaveTemplateOutput[i];
    variable[3] = workbook.get(variable[1]);
}
//When Vraag11 is set to 1
console.info(jbehaveTemplateInput.map(function(el) {
    return el.join(' ')
}).join('\n'))
//And Q_MAP04_SCORE01 should be 47
console.info(jbehaveTemplateOutput.map(function(el) {
    return el.join(' ')
}).join('\n'))