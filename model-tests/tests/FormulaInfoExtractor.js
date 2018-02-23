const fs       = require('fs'),
      file     = fs.readFileSync(__dirname + '/translations.finanfinancials.csv', 'utf8'),
      lines    = file.split('\r\n'),
      Register = require('../../lme-core/exchange_modules/ffl/Register').Register,
      register = new Register(lines[0].split(';')),
      log      = require('log6')

for (var i = 0; i < lines.length; i++) register.addRow(lines[i].split(';'));

const formula_infos = register.find('COMPONENT', 'js');
for (var i = 0; i < formula_infos.length; i++) {
    const formulaInfo = formula_infos[i];
    const key = formulaInfo[1].replace(/formula-viewer_functionexplanation_/, '')
    console.info('"' + key + '" :' + '"' + formulaInfo[2].replace(/"/gm, "'") + '",')
    // HSUM              : "HSUM(variable_name,start,end)\n Time SUM of values",
}
//log.info(register.printArr(formula_info, [10, 30, 10, 10, 10, 10, 10, 10, 10]).join('\r\n'))
