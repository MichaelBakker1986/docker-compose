/**
 * Bridge between excel files and LME
 * The MatrixLookup function is found in math
 */
import fs                     from 'fs'
import { DEBUG, debug, warn } from 'log6'
import * as Excel             from 'exceljs'
import Promise                from 'promise'
import path                   from 'path'

const default_resources_map = path.join(__dirname, process.env.RESOURCES_PATH || '../git-connect/resources/')

/**
 * Result after excel parsing.
 * rangenaam: {
 *   var1: {
 *      0 : value
 *      1 : value
 *   }
 *   var2:{
 *      0 : value
 *      1 : value
 *   }
 * }
 */
const findStart = (range) => {
	let yStart = -1
	let xStart = -1
	for (let y = 0; y < range.ranges.length; y++) {
		if (range.ranges[y]) {
			yStart = y
			for (let x = 0; x < range.ranges[y].length; x++) {
				if (range.ranges[y][x]) {
					xStart = x
					break
				}
			}
			break
		}
	}
	return { xStart, yStart }
}
const getCellValueFromRangeCell = (range, rangeCell) => {
	return range.sheet.getCell(rangeCell.address).value
}

const findYasNames = (range, bounds) => {
	const yAsNames = {}
	for (let y = bounds.yStart; y < range.ranges.length; y++) {
		yAsNames[getCellValueFromRangeCell(range, range.ranges[y][bounds.xStart])] = range.ranges[y][bounds.xStart]
	}
	return yAsNames
}

const findXasValues = (range, yasNames, bounds) => {
	const xAsValues = {}
	for (let y = bounds.yStart; y < range.ranges.length; y++) {
		const currentXAs = {}
		xAsValues[getCellValueFromRangeCell(range, range.ranges[y][bounds.xStart])] = currentXAs
		for (let x = bounds.xStart; x < range.ranges[y].length; x++) {
			const cellAddress = range.ranges[y][x]
			currentXAs[x - bounds.xStart] = getCellValueFromRangeCell(range, cellAddress)
		}
	}
	return xAsValues
}

const getDefinedNames = (wb) => {
	const names = {}
	const matrixMap = wb._definedNames.matrixMap
	Object.keys(matrixMap).forEach(name => {
		//checks concerning assumptions made during creating code.
		const matrixMapDefinedName = matrixMap[name]
		if (!matrixMapDefinedName) {
			warn(`invalid named range [${name}]`)
			return
		}
		if (!matrixMapDefinedName.sheets) {
			warn(`invalid named range sheets [${name}]`)
			return
		}
		const matrixMapDefinedNamesSheetKeys = Object.keys(matrixMapDefinedName.sheets)
		if (matrixMapDefinedNamesSheetKeys.length > 1) {
			warn(`invalid named range sheet count [${name}]`)
			return
		}
		const sheetName = matrixMapDefinedNamesSheetKeys[0]
		names[name] = {
			name,
			sheet : wb.getWorksheet(sheetName),
			ranges: matrixMapDefinedName.sheets[sheetName]
		}
	})
	return names
}

const readFunction = (wb) => {
	const matrix = {}
	const definedNames = getDefinedNames(wb)
	Object.keys(definedNames).forEach(definedName => {
		const range = definedNames[definedName]
		const bounds = findStart(range)
		const yasNames = findYasNames(range, bounds)
		const xasValues = findXasValues(range, yasNames, bounds)
		const sorted = []
		Object.keys(xasValues).forEach(key => sorted.push(key))
		matrix[definedName] = {
			name                    : range.name,
			table                   : {},
			bounds, yasNames, x_sort: sorted, xasValues
		}
		Object.keys(xasValues).forEach(xas_key => {
			matrix[definedName].x = []
			Object.keys(xasValues[xas_key]).forEach(keyX => matrix[definedName].x.push(keyX))
		})
	})
	// use workbook
	// This variable should be available in the client.
	return matrix
}

class ExcelConnect {
	constructor() {
		this.name = 'xlsx-lookup'
		this.entries = {}
	}

	loadExcelFile(excelFileName, folder = default_resources_map) {
		return new Promise((success, fail) => {
			//check if an file exists
			const files = fs.readdirSync(folder)
			const fileNames = []
			files.forEach(file => {
				const full_path = path.resolve(path.join(folder, file))
				const filename = full_path.replace(/\(\w+\)/gmi, '')
				const file_information = path.parse(filename)
				if (file_information.ext === '.xlsx' && file_information.name === excelFileName) {
					fileNames.push(full_path)
					if (DEBUG) debug('Found excel file: ', full_path)
				}
			})
			Promise.all(fileNames.map(function(filename) {
				return new Promise(function(success, fail) {
					new Excel.Workbook().xlsx.readFile(filename).then((data) => {
						success(readFunction(data))
					}).catch(err => fail(`Error reading XLSX ${filename} for ${excelFileName}`, err.toString()))
				})
			})).then(excel_files => {
				const totalMatrix = {}
				excel_files.forEach(excel_file => Object.keys(excel_file).forEach(tableName => {
					if (totalMatrix[tableName] != null) debug(`Duplicate table '${tableName}' found while accumulating excel-sheets into one, last found named table will be used.`)
					totalMatrix[tableName] = excel_file[tableName]
				}))
				success(totalMatrix)
			}).catch(err => fail(err))
		})
	}
}

export default new ExcelConnect()