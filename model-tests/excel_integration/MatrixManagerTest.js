import { DEBUG, debug, error } from 'log6'
import * as fflMath            from '../../math/ffl-math'
import LMEFacade               from '../../lme-core/index'
import ExcelApi                from '../excel-api'
import MatrixManager           from '../../excel-connect/MatrixManager'

LMEFacade.addFunctions(fflMath)

ExcelApi.loadExcelFile('SampleExcelSheet.xlsx', __dirname).then(async matrix => {
	const matrixManager = new MatrixManager
	matrixManager.setMatrices(matrix)
	if (DEBUG) debug(matrixManager.toFatrix())
}).catch(err => error(`Error while reading excel-file ${err.stack}`))