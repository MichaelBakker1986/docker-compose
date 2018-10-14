import { debug, DEBUG }                    from 'log6'
import { Context, ENCODING, VALUE, YAxis } from '../../lme-core/index'
import { LmeAPI }                          from '../../lme-model-api/src/lme'
import { readFileSync }                    from 'fs'
import { equal }                           from 'assert'
//We add custom TimeAxis because we are going to extend columns here to the max to test the 10bit into tuple range
import defaultImport                       from '../../lme-core/resources/CustomImport.json'

const TUPLE_TEST = new LmeAPI(defaultImport, new Context({ columnSize: 1, columns: [VALUE] }))
const wb = TUPLE_TEST.lme
TUPLE_TEST.importFFL(readFileSync(`${__dirname}/TupleTest.ffl`, ENCODING))
const rootVariable = wb.getRootSolutionProperty()
wb.set('Tuple', '123', VALUE, 0, YAxis[1])
equal(wb.maxTupleCountForRow(wb.findNode('Tuple'), YAxis[0].parent), 1)
wb.set('NestedTuple', '123', VALUE, 0, YAxis[1].deeper[0])
equal(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), YAxis[0].deeper[0]), -1, 'There is a Tuple instance on 1,0 but not on 0,0')
equal(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), YAxis[1].deeper[0]), 0, ' We just added a nested tuple instance here')
equal(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), YAxis[2].deeper[0]), -1, 'No instance here')
equal(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), YAxis[3].deeper[0]), -1)
equal(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), YAxis[4].deeper[0]), -1)
equal(wb.maxTupleCountForRow(wb.findNode('Tuple'), YAxis[0].deeper[0]), -1, 'No Instance here')
equal(wb.maxTupleCountForRow(wb.findNode('Tuple'), YAxis[1].deeper[0]), 0, 'there is an instance here')
wb.set('Tuple', '123', VALUE, 0, YAxis[1].deeper[0])
equal(wb.maxTupleCountForRow(wb.findNode('Tuple'), YAxis[1]), 0)
equal(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), YAxis[2].deeper[2]), -1)
//its strange to see why the first tuple shows 3nested instances also
wb.walkProperties(rootVariable, (node, yax, treeDepth, y) => {
	if (DEBUG) debug(y.display + ' '.repeat(treeDepth) + node.rowId)
}, YAxis[0].parent, null, 0)
