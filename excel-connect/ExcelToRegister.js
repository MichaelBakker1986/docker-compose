const Excel                = require('exceljs'),
      Promise              = require('promise'),
      log                  = require('log6'),
      moment               = require('moment'),
      Register             = require('../lme-core/exchange_modules/ffl/Register').Register,
      RegisterToFFL        = require('../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL,
      default_resouces_map = __dirname + '/resources/'

const variable_name_index = 3
const excel_title_index = 1
const depth_index = 2;
const map = function(value) {
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

function ExcelToFFLStream(stream, opts) {
    return new Promise(function(succes, fail) {
        new Excel.Workbook().xlsx.readFile(stream).then((data) => {
            succes(data)
        }).catch((err) => {
            console.info(err)
            fail('Error reading XLSX ' + JSON.stringify(opts), err.toString())
        })
    }).then(function(data) {
        const register = new Register();
        register.addColumn('title')
        const valid_excel_row = (row) => {
            if (row.length <= 2) return false;
            let variable_name = row[variable_name_index];
            if (!variable_name) return false
            variable_name = variable_name.replace(/ /gmi, '')
            return variable_name.length > 2
        }
        register.addRowSave([0, 1, '', opts.presentation_sheet_name, 0, null, null, false, false, false, [], null, '"Presentation root variable"'])
        const worksheet = data.getWorksheet(opts.presentation_sheet_name)
        const children_index = register.schemaIndexes.children
        const parent_index = register.schemaIndexes.parentId

        const matrix = []
        if (worksheet) {
            worksheet.eachRow((row, rowNumber) => {
                const values = row.values;
                values.shift();
                if (rowNumber == 1) log.info('header:' + values.map(map).join('|'))
                else {
                    if (valid_excel_row(values)) matrix.push(values.map(map));
                    else log.info('Invalid row ' + rowNumber + ": " + values.map(map).join('|'))
                }
            });
        }

        const parents = []

        for (var i = 0; i < matrix.length; i++) {
            const excel_row = matrix[i];

            const variable_name = "P_" + excel_row[variable_name_index].replace(/ /gmi, '');
            const refer_variable_name = excel_row[variable_name_index].replace(/ /gmi, '');
            const current_depth = excel_row[depth_index]
            parents[current_depth] = variable_name
            const parent_name = parents[current_depth - 1]
            register.addRowSave([0, 1, '', variable_name, i + 1, null, parent_name, false, refer_variable_name, false, [], null, '"' + excel_row[excel_title_index] + '"'])
        }
        const names = register.getIndex('name')
        const root = names[opts.presentation_sheet_name]
        for (var i = 1; i < register.i.length; i++) {
            var n = register.i[i]
            const pp = names[n[parent_index]] || root;
            pp[children_index].push(n)
        }

        return new RegisterToFFL(register).toGeneratedFFL(opts.presentation_sheet_name, null)

    }).catch(function(err) {
        log.error(err.toString())
    })
}

/*ExcelToFFLStream(__dirname + '/resources/VASTGOED12b2.xlsx', {
    name                   : 'VASTGOED',
    presentation_sheet_name: 'Presentation',
    columns                : ["rownumber", "description", "level", "name", "name controle", "type", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "Imporance"]
}).then(matrix => console.info(matrix.join('\n')))*/

exports.parse = ExcelToFFLStream
module.exports = ExcelToFFLStream