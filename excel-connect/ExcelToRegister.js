const Excel         = require('exceljs'),
      Promise       = require('promise'),
      Stream        = require('stream'),
      log           = require('log6'),
      moment        = require('moment'),
      Register      = require('../lme-core/exchange_modules/ffl/Register').Register,
      RegisterToFFL = require('../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL

const variable_name_index = 3
const excel_title_index = 1
const depth_index = 2;
const required_index = 6
const visible_index = 7

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
    const audit = []
    return new Promise(function(succes, fail) {
        new Excel.Workbook().xlsx.readFile(stream).then((data) => {
            succes(data)
        }).catch((err) => {
            console.info(err)
            fail('Error reading XLSX ' + JSON.stringify(opts), err.toString())
        })
    }).then(function(data) {
        const register = new Register();
        /*const csv = data.csv.writeFile('./raw_excel_data.csv', { delimiter: ";" })*/

        register.addColumn('title')
        register.addColumn('display_options')
        register.addColumn('required')
        register.addColumn('visible')
        const valid_excel_row = (row) => {
            if (row.length <= 2) return false;
            let variable_name = row[variable_name_index];
            if (!variable_name) return false
            variable_name = variable_name.replace(/ /gmi, '')
            return variable_name.length > 2
        }
        register.addRowSave([0, 1, '', opts.root_name, 0, null, null, false, false, false, [], null, '"Presentation root variable"', 'scorecard', false, null])
        const worksheet = data.getWorksheet(opts.presentation_sheet_name)
        const children_index = register.schemaIndexes.children
        const parent_index = register.schemaIndexes.parentId

        const matrix = []
        if (worksheet) {
            worksheet.eachRow((row, rowNumber) => {
                const values = row.values;
                values.shift();
                if (rowNumber == 1) audit.push('Header columns: ' + values.map(map).join('|'))
                else {
                    if (valid_excel_row(values)) matrix.push(values.map(map));
                    else audit.push('Invalid row ' + rowNumber + ": " + values.map(map).join('|'))
                }
            });
        }

        const parents = []
        let curr_depth = 1;
        for (var i = 0; i < matrix.length; i++) {
            const excel_row = matrix[i];

            const variable_name = "P" + i + "_" + excel_row[variable_name_index].replace(/ /gmi, '');
            const refer_variable_name = excel_row[variable_name_index].replace(/ /gmi, '');
            const current_depth = excel_row[depth_index]
            if (current_depth != curr_depth) {

                if (current_depth > curr_depth) {
                    if (current_depth != (curr_depth + 1)) {
                        log.info('r:' + i + ": " + curr_depth + " to " + current_depth)
                        audit.push('Invalid row ' + 'r:' + i + ": " + curr_depth + " to " + current_depth + excel_row.join('|'))
                    }
                }
                curr_depth = current_depth
            }
            parents[current_depth] = variable_name
            const parent_name = parents[current_depth - 1]
            const required = parseInt(excel_row[required_index]) == 1 ? 'On' : null
            const visible = parseInt(excel_row[visible_index]) == 0 ? 'Off' : null
            register.addRowSave([0, 1, '', variable_name, i + 1, null, parent_name, false, refer_variable_name, false, [], null, '"' + excel_row[excel_title_index] + '"', null, required, visible])
        }
        const names = register.getIndex('name')
        const root = names[opts.root_name]
        for (var i = 1; i < register.i.length; i++) {
            var n = register.i[i]
            const pp = names[n[parent_index]] || root;
            pp[children_index].push(n)
        }
        const sizes = register.i[0].map(el => 10)

        const child_index = register.schemaIndexes.children
        const filter = (f, i) => i > 2 && i != child_index

        return {
            ffl     : new RegisterToFFL(register).toGeneratedFFL(opts.root_name, null),
            register: register.print(sizes),
            audit   : audit
        }

    }).catch(function(err) {
        log.error(err)
        audit.push(err.toString())
        return { ffl: '', register: '', audit: audit }
    })
}

/* ExcelToFFLStream(__dirname + '/resources/t1.xlsx', {
    root_name              : 'Q_ROOT',
    name                   : 'VASTGOED',
    presentation_sheet_name: 'Presentation',
    columns                : ["rownumber", "description", "level", "name", "*", "*", "required", "visible"]
}).then(result => {

    console.info(result.ffl.join('\n'))
}).catch((err) => {
    console.error(err.toString())
})*/

exports.parse = ExcelToFFLStream
module.exports = ExcelToFFLStream