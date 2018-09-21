/**
 * TODO: This is very important for the UI and took a long time to make it work.
 * Therefore instead of logging the stuff, make unit-tests to ensure its working like it is supposed to be
 */

import api, { Context, ENCODING, PropertiesAssembler, VALUE, WebExportParser, YAxis } from '../../lme-core/index'
import { LmeAPI }                                                                     from '../../lme-model-api/index'
import { debug, DEBUG }                                                               from 'log6'
import { readFileSync }                                                               from 'fs'
import { equal }                                                                      from 'assert'
/*
 * We add custom TimeAxis because we are going to extend columns
 * here to the max to test the 10bit into tuple range
 */
import defaultImport
                                                                                      from '../../lme-core/resources/CustomImport.json'

api.registerParser(WebExportParser)
const TUPLE_TEST = new LmeAPI(defaultImport, new Context({ columnSize: 1, columns: [VALUE] }))
const workbook = TUPLE_TEST.lme
TUPLE_TEST.importFFL(readFileSync(`${__dirname}/TupleTest.ffl`, ENCODING))
const rootVariable = workbook.getRootSolutionProperty()
const yAxis = YAxis[0].parent
const val = workbook.export('webexport')
let called_times = 0
workbook.walkProperties(rootVariable, () => {
	called_times++
}, yAxis, null, 0)
equal(called_times, 3, `Should be called for root_value and Tuple_value and RootVariable_value ${called_times}`)

let tupleCountForMainTuple = workbook.maxTupleCountForRow(workbook.findNode('Tuple'))
let tupleCountForNestedTuple = workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'))
equal(tupleCountForMainTuple, -1, 'A Tuple without instances should return -1')
equal(tupleCountForNestedTuple, -1, 'A nested Tuple without instances should return -1 for now.')

val.nodes['0000__Tuple'].add()
tupleCountForMainTuple = workbook.maxTupleCountForRow(workbook.findNode('Tuple'))
equal(tupleCountForMainTuple, 0, 'The main tuple should return 0, since one tuple is created.')
equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), yAxis), -1, 'No nested tuple instance should be returned. Even while the TupleDefinition does has an instance')
//test if we look in the tuple itself. It will also be unable to return an instance.
equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), yAxis.deeper[0]), -1, 'No nested tuple instance should be returned. Even while the TupleDefinition does has an instance')
val.nodes['0000__Tuple'].add()
//Now we will add a value for a nested - tuple
workbook.set('NestedTuple', 'test234', VALUE, 0, yAxis.deeper[0])

equal(workbook.maxTupleCountForRow(workbook.findNode('Tuple'), yAxis), 1, `The main tuple should return 1, since two tuples are created.${workbook.maxTupleCountForRow(workbook.findNode('Tuple'), yAxis)}`)
//Now we will add a value for a nested - tuple
workbook.set('NestedTuple', 'test234', VALUE, 0, yAxis.deeper[0])

//
val.nodes['0000__Tuple'].add()
workbook.set('Tuple', 'test234', VALUE, 0, yAxis.deeper[2])
equal(workbook.maxTupleCountForRow(workbook.findNode('Tuple'), yAxis), 2, 'The main tuple should return 2, since two tuples are created.')
val.nodes['0000__Tuple'].add()
equal(workbook.maxTupleCountForRow(workbook.findNode('Tuple'), yAxis), 3, 'The main tuple should return 3, since two tuples are created.')
const allNodesAsArray = []
Object.keys(val.nodes).forEach(key => allNodesAsArray.push(val.nodes[key]))
allNodesAsArray.sort((a, b) => {
	return a.order_id === b.order_id ? 0 : a.order_id < b.order_id ? -1 : 1
})
debug('--- start sort')
for (let i = 0; i < allNodesAsArray.length; i++) {
	const node = allNodesAsArray[i]
	if (DEBUG) debug(' '.repeat(node.depth) + node.id + ':' + node.order_id)
}
debug('--- done ')
PropertiesAssembler.indexProperties('TUPLETEST')
//Here we can adept the front-end to not show the
workbook.walkProperties(rootVariable, function(node, typle, treeDepth, y) {
	called_times++
	if (DEBUG) debug(' '.repeat(treeDepth) + node.id + ':' + y.display + '_' + node.rowId + '(' + typle + ')')
}, yAxis, null, 0)

//ok so how to hash without knowing of the children
/*
 dus: (variableId*1000) + (variableId*(1000/(10^tdepth))) recursief
 dan is de formule: oid >> nTid^(6-depth)
 er zijn dus instanties en dieptes
 ik wil een combinatie vinden van variableId en tuplehash
 Omdat de sortering van variabelen nooit veranderd kunnen we de Variable_presentation_ID gebruiken als order in de laagste bits
 Na veel nadenken moet de VariableID ook de hoogste Tuple-Waarde bevatten.

 10000000000000000050
 10000000000000000051
 ...

 Omdat een Tuple gerepresenteerd word als een Child, heeft deze een exponentieel kleinere waarde
 Het sorteer algorithme is uitermate complex omdat data-structuur en weergave-mogelijkheden met elkaar kruisen.
 In het data-model hoeft men geen rekening te houden met de positionering in de boom van tuples, zolang de data maar aan elkaar te relateren is
 Een alphanumerieke oplossing van  variableid_index_variableid_index geef de absolute positie in de boom weer
 e.g.
 Kind (A)
 Leeftijd(B)

 A000B000 = 18
 A001B000 = 11

 Niet bang zijn voor alphanumerieke sorteerfuncties zolang het om menselijke getallen gaat. 2000ofzo is simpel voor de computer.
 Dus de hashes kunnen dan door een groot object uitgegeven worden

 20000*20000*20000*20000*999*999*999
 Dit zou een gigantische deuk opleveren in memory de combinaties exploreren gewoon

 Hier zeggen we wel dat alle ingeladen variabelen (20000 stuks) een tuple kunnen vormen van 20000 sub-variabellen wat compleet onrealistisch is
 Kunnen we een hash realizeren icm variablenaam/depth
 Moet er van tevoren een variable-hash opgesteld worden of kan dat runtime?
 Er zit een geweldige tegenslag predifined variable-order
 De complexiteit kan simpelweg niet anders uitgedrukt worden.
 Volgorde + Kardinaliteit + Collectie = niet in een integer te vatten
 Volgorde is exponentieel aan de grote van de collectie
 De giga-index ondersteund elke indeling van de sub-collectie terwijl dit nooit aan de hand is
 Maar wel de natuurlijke ordering van de collectie willen behouden in het eind resultaat
 Het is hierdoor waarschijnlijk mogelijk om met optimalizatie 15bits te winnen. Dat getal is niet voldoende om de optimalisatie verder te onderzoeken
 64/15 = 20%
 We kunnnen beter kijken naar zaken zoals
 */

PropertiesAssembler.indexProperties('TUPLETEST')
let arranged = []
PropertiesAssembler.visitModel('TUPLETEST', (a) => {
	a.order_id = a.hash.join('')
	arranged.push(a)
})
arranged.sort((a, b) => {
	return a.order_id === b.order_id ? 0 : a.order_id < b.order_id ? -1 : 1
})
for (let i = 0; i < arranged.length; i++) {
	const obj = arranged[i]
	if (DEBUG) debug(obj.order_id + obj.rowId)
}
debug(' END ')
arranged = []
val.nodes['3000__NestedTuple'].add()

function pad(n, width, z) {
	z = z || '0'
	n = n + ''
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

PropertiesAssembler.indexProperties('TUPLETEST')
workbook.walkProperties(rootVariable, function(node, yax, treeDepth, y) {
	const newArray = node.hash.slice()
	//y should contain this information
	if (y.depth === 0) {
		newArray[1] = yax === 'new' ? pad(999, 3) : y.uihash
	} else if (y.depth === 1) {
		newArray[1] = y.uihash
		newArray[3] = yax === 'new' ? pad(999, 3) : y.parent.uihash
	}
	arranged.push({
		depth   : treeDepth,
		order_id: newArray.join(''),
		node    : node
	})
}, yAxis, null, 0)
arranged.sort((a, b) => a.order_id === b.order_id ? 0 : a.order_id < b.order_id ? -1 : 1)
for (let i = 0; i < arranged.length; i++) {
	const obj = arranged[i]
	if (DEBUG) debug(obj.order_id + ' '.repeat(obj.depth) + obj.node.rowId)
}
val.nodes['0000__Tuple'].add()
debug(workbook.maxTupleCountForRow(workbook.findNode('Tuple')))
workbook.set('NestedTuple', '123', VALUE, 0, YAxis[4].deeper[2])
debug(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[4].deeper[0]))
equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[4].deeper[0]), -1)
equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[5].deeper[2]), -1)
equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[4].deeper[2]), 0)

debug('--')
PropertiesAssembler.indexProperties('TUPLETEST')
workbook.walkProperties(rootVariable, function(node, yax, treeDepth, y) {
	if (DEBUG) debug(y.display + ' '.repeat(treeDepth) + node.rowId)
}, YAxis[0].parent, null, 0)