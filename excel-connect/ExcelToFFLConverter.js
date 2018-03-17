const Excel                = require('exceljs'),
      Promise              = require('promise'),
      log                  = require('log6'),
      moment               = require('moment'),
      Register             = require('../lme-core/exchange_modules/ffl/Register').Register,
      RegisterToFFL        = require('../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL,
      default_resouces_map = __dirname + '/resources/'

const filename = default_resouces_map + "VASTGOED12b2.xlsx"
const excelFileName = filename

var map = function(value) {
    if (value) {
        if (value.text || value.hyperlink) return value.hyperlink || value.text || '';
        if (value.formula || value.result) return value.result || '';
        if (value instanceof Date) return dateFormat ? moment(value).format(dateFormat) : moment(value).format();
        if (value.error) return value.error;
        if ((typeof value === 'undefined' ? 'undefined' : typeof(value)) === 'object') {
            return JSON.stringify(value);
        }
    }
    return value;
};

return new Promise(function(succes, fail) {
    new Excel.Workbook().xlsx.readFile(filename).then(function(data) {
        succes(data)
    }).catch(function(err) {
        fail('Error reading XLSX ' + filename + ' for ' + excelFileName, err.toString())
    })
}).then(function(data) {
    const register = new Register();
    register.addRowSave([0, 1, '', 'root', 0, null, null, false, false, false, []])
    const worksheet = data.getWorksheet('Presentation')
    const matrix = []
    if (worksheet) {
        worksheet.eachRow(function(row, rowNumber) {
            var values = row.values;
            values.shift();
            matrix.push(values.map(map));
        });
    }
    const split = matrix;
    for (var i = 0; i < split.length; i++) {
        var line = split[i];
        const properties = line;
        if (properties.length > 2) {
            // console.info(properties)
            let warname = properties[3];
            if (warname && warname.length > 2) {
                warname = warname.replace(/ /gmi, '')
                register.addRowSave([0, 1, '', "P_" + warname, i + 1, null, 'root', false, warname, false, []])
            }
        }
    }
    for (var i = 1; i < register.i.length; i++) {
        const n = register.i[i]
        register.i[0][10].push(n)
    }

    console.info(new RegisterToFFL(register).toGeneratedFFL('root', null).join('\n'))

    //'desc', 'start', 'end', 'name', 'index', 'modifier', 'parentId', 'tuple', 'refersto', 'treeindex', 'children', 'valid'
}).catch(function(err) {
    log.error(err.toString())
})
