import { XSDConverter } from '../XSDToFFLConverterv2'
import jsonFile         from './InputContianer.json'

function testCaseOne() {
	const xsdConvert = new XSDConverter()
	xsdConvert.loadXSD('\.xsd$')
	xsdConvert.start()
	xsdConvert.print()
}

function testCaseTwo() {
	const xsdConvert = new XSDConverter()
	xsdConvert.loadJSON(jsonFile)
	xsdConvert.start()
	xsdConvert.print()
}

testCaseOne()