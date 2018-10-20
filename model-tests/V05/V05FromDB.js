import fflMath                       from '../../math/ffl-math'
import api, { WebExportParser }      from '../../lme-core/index'
import { RegisterPlainFFLDecorator } from '../../ffl/index'
import excel_plugin                  from '../../excel-connect/excel-connect'
import assembler                     from '../../git-connect/ModelAssembler'
import ExcelApi                      from '../excel-api'
import { error, info }               from 'log6'

api.registerParser(WebExportParser, RegisterPlainFFLDecorator)
api.addFunctions(fflMath, excel_plugin)

Promise.all([assembler, ExcelApi.loadExcelFile('V05')]).then(([{ getModel }]) => {
	getModel('V05').then((modelData) => {
		info(modelData)
		process.exit(0)
	}).catch((err) => {
		error(err)
		process.exit(1)
	})
})