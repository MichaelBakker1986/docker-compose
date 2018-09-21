import { LmeAPI }                                         from '../../lme-model-api/index'
import api, { Context, ENCODING, VALUE, WebExportParser } from '../../lme-core/index'
import { readFileSync }                                   from 'fs'
import { equal }                                          from 'assert'
import defaultImport                                      from '../../lme-core/resources/CustomImport.json'
import { join }                                           from 'path'

const NUMBER_OF_VARIABLES_IN_MODEL = 12

api.registerParser(WebExportParser)
const TUPLETEST = new LmeAPI(defaultImport, new Context({ columnSize: 1, columns: [VALUE] }))
const s = join(__dirname, 'TupleTest.ffl')
TUPLETEST.importFFL(readFileSync(s, ENCODING))
const webExport = TUPLETEST.exportWebModel()
//here we are going to add Tuples like its done in the JBehave stories.
equal(webExport.findWebNode('Tuple').add().display, '0000')
//TODO: webExport.nodes[Name].add(y) (Nodes should just represent the Blueprint then t(0,0,0) always
equal(webExport.findWebNode('Tuple').add().display, '1000')

webExport.sortRows()
const nTupleDef = webExport.findWebNode('NestedTuple')
let actual = nTupleDef.add()
equal(actual.display, '0000')
webExport.sortRows()
const findWebNode = nTupleDef.add()
equal(findWebNode.display, '0100')
webExport.sortRows()
equal(nTupleDef.add().display, '0200')
webExport.sortRows()

//reproduces same problem.
const rows = webExport.diagnose({ auto_join: false })

equal(rows.length, NUMBER_OF_VARIABLES_IN_MODEL, `There should be 13 rows but there are ${rows.length}`)