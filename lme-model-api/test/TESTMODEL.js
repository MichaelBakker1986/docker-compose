import LMEApi                   from '../src/lme'
import api, { WebExportParser } from '../../lme-core/index'
import log                      from 'log6'
import { readFileSync }         from 'fs'
import { equal, ok }            from 'assert'

api.registerParser(WebExportParser)

const newModel = new LMEApi()
ok((1 || false))
ok(!(null == 'true'))
Number.prototype.countDecimals = function() {
	if (Math.floor(this.valueOf()) === this.valueOf()) return 0
	return this.toString().split('.')[1].length || 0
}
/**
 * FFL->LME->WebExport
 */
newModel.importFFL(readFileSync(__dirname + '/TESTMODEL.ffl', 'utf8'))
const nodes = newModel.exportWebModel().no
/**
 * Declare variables
 */
const [VariableOne, VariableTwo, Total, OneFixedDecimal, ZeroFixedDecimal, EvaluateStringTitle] = [nodes.VariableOne, nodes.VariableTwo, nodes.Total, nodes.OneFixedDecimal, nodes.ZeroFixedDecimal, nodes.EvaluateStringTitle]

function disabled_test() {
	equal(VariableOne.value, 101, `default value is 101. Found [${VariableOne.value}]`)
	equal(VariableTwo.value, 102, 'default value is 102')
//101+102=203
	equal(Total.value, 203, `default value is 102. but is [${Total.value}][${VariableOne.parsed}]`)
	VariableOne.value = 200
//200+102=302
	equal(Total.value, 302)
//200+200=400
	VariableTwo.value = 200
	equal(Total.value, 400)
	equal(VariableTwo.visible, true, 'visible: VariableOne <> 100')
	VariableOne.value = 100
	equal(VariableTwo.visible, false, 'visible: VariableOne <> 100')
	equal(VariableOne.required, true, 'inputRequired: 1')
//Total now is 400
	equal(VariableTwo.required, false, 'inputRequired: Total > 1000;')
	Total.value = 1001
	equal(VariableTwo.required, true, 'inputRequired: Total > 1000;')
	Total.value = null
//Total now is 400
	equal(VariableTwo.required, false, 'inputRequired: Total > 1000;')
	VariableOne.value = 900
	equal(VariableTwo.required, true, 'inputRequired: Total > 1000;' + Total.value)
	equal(OneFixedDecimal.value.countDecimals(), 1)
	equal(ZeroFixedDecimal.value.countDecimals(), 0)
	equal(EvaluateStringTitle.title, Total.title, `Testing EvaluateStringTitle.title failed. ["${EvaluateStringTitle.title}"], it should be the same as Total.title ["${Total.title}"] ["${EvaluateStringTitle.title} == ${Total.title}"]`)
	ok(VariableOne.entered)
	ok(!Total.entered)
	let exportData = newModel.exportData()
	log.debug(exportData)
	newModel.importData([{
		'varName'  : 'TESTMODEL_VariableOne',
		'colId'    : '2',
		'value'    : 1000,
		'formulaId': '100004'
	}])
	newModel.exportData()
	log.debug('Tests passed')
}