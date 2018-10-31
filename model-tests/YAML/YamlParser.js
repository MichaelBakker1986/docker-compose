/**
 * Use yamljs to parse-modify docker-compose files
 * Experimental YML format of FFL
 */
import YAML                                               from 'yamljs'
import { RegisterPlainFFLDecorator, RegisterToFFL }       from '../../ffl/index'
import { debug, info }                                    from 'log6'
import 'assert'
import { LmeAPI }                                         from '../../lme-model-api/src/lme'
import api, { Context, NUMBER, Register, VALUE, VISIBLE } from '../../lme-core/index'
import { readModelAsString }                              from '../../git-connect/ResourceManager'

const context  = new Context({ columnSize: 1, columns: [VALUE, VISIBLE] }),
      wb       = new LmeAPI(null, context),
      register = new Register()

debug(
	JSON.stringify(
		YAML.load('./yamlTestFile.yml'),
		null, 2)
)
api.registerParser(RegisterPlainFFLDecorator)
wb.importFFL({ register, raw: readModelAsString({ model_name: 'MVO' }) })
const workbook = wb.lme
const root = register.getIndex('name')['root']
const yawmfll = {}

const registerToFFL = new RegisterToFFL(register)
RegisterToFFL.prototype.toGeneratedYaml = function(rootVariableName, modelName) {
	const constants = this.constants
	const formattedFFL = []
	const midx = this.modifierIndex
	const nidx = this.nameIndex
	const ridx = this.referstoIndex
	const rname = ' refers to '
	const indents = this.indents
	const tidx = this.tupleIndex
	const tuple = 'tuple '
	const parentNameIndex = this.parentNameIndex
	const variable = 'variable '
	//define shiftindent relevant indexes;
	const schema = this.schema
	const relevant = this.relevant
	const shiftindent = this.shiftindent
	const names = this.vars
	let cdept = 0
	const yawmlOut = {}
	yawmlOut['root'] = yawmlOut
	const rootNode = this.vars[rootVariableName || 'root']
	this.walk(rootNode, 1, function(node, depth) {

		const yawmlNode = {}
		yawmlOut[node[nidx]] = yawmlNode
		if (node[parentNameIndex]) yawmlOut[register.i[node[parentNameIndex]][nidx]][node[nidx]] = yawmlNode
		const items = []

		items.push(node[tidx] ? tuple : variable)
		items.push(node[midx] || '')
		items.push(node[nidx])
		if (ridx !== -1 && node[ridx]) {
			items.push(rname)
			items.push(node[ridx])
		}
		for (var i = 0; i < relevant.length; i++) {
			const real = relevant[i]
			if (schema[real] === 'valid') continue
			if (node[real] === NUMBER) continue
			if (node[real]) {
				yawmlNode[schema[real]] = node[real]
			}
		}
		cdept = depth
	})
	for (let i = 0; i < formattedFFL.length; i++) {
		const obj = formattedFFL[i]
		formattedFFL[i] = obj.replace(/__(\d+)/gm, function($1, $2) {
			return constants[parseInt($1.substring(2))]
		})
	}
	return yawmlOut
}
info(YAML.stringify(registerToFFL.toGeneratedYaml(null, null)['root'], 6))