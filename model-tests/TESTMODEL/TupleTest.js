require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const PropertiesAssembler = require('../../lme-core/src/PropertiesAssembler');
const LME = require('../../lme-model-api/src/lme');
const Context = require('../../lme-core/src/Context');
const log = require('log6');
const fs = require('fs');
const assert = require('assert');
const YAxis = require('../../lme-core/src/YAxis');
//We add custom TimeAxis because we are going to extend columns here to the max to test the 10bit into tuple range
const defaultImport = require('../../lme-core/resources/CustomImport.json')
const TUPLETEST = new LME(defaultImport, new Context({columnSize: 1, columns: ['value']}));
const workbook = TUPLETEST.lme;
TUPLETEST.importFFL(fs.readFileSync(__dirname + '/TupleTest.ffl', 'utf8'));
const rootVariable = workbook.getRootSolutionProperty()
const yAxis = YAxis[0].parent;
const val = workbook.export('webexport')
let called = 0;
workbook.walkProperties(rootVariable, function(node, yax, treeDepth, y) {
    called++;
    //console.info(" ".repeat(treeDepth) + y.hash + "_" + y.index + "_" + node.name + ": " + yax)
}, yAxis, null, 0)
assert(called == 3, 'Should be called for root_value and Tuple_value and RootVariable_value')


let tupleCountForMainTuple = workbook.maxTupleCountForRow(workbook.findNode('Tuple'))
let tupleCountForNestedTuple = workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'))
assert.equal(tupleCountForMainTuple, -1, 'A Tuple without instances should return -1')
assert.equal(tupleCountForNestedTuple, -1, 'A nested Tuple without instances should return -1 for now.')

val.nodes.Tuple.add()
tupleCountForMainTuple = workbook.maxTupleCountForRow(workbook.findNode('Tuple'))
assert.equal(tupleCountForMainTuple, 0, 'The main tuple should return 0, since one tuple is created.')
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), yAxis), -1, 'No nested tuple instance should be returned. Even while the TupleDefinition does has an instance')
//test if we look in the tuple itself. It will also be unable to return an instance.
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), yAxis.deeper[0]), -1, 'No nested tuple instance should be returned. Even while the TupleDefinition does has an instance')
val.nodes.Tuple.add()
//Now we will add a value for a nested - tuple
workbook.set('NestedTuple', 'test234', 'value', 0, yAxis.deeper[0])

assert.equal(workbook.maxTupleCountForRow(workbook.findNode('Tuple'), yAxis), 1, 'The main tuple should return 1, since two tuples are created.')
//Now we will add a value for a nested - tuple
workbook.set('NestedTuple', 'test234', 'value', 0, yAxis.deeper[0])

//
val.nodes.Tuple.add()
workbook.set('Tuple', 'test234', 'value', 0, yAxis.deeper[2])
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('Tuple'), yAxis), 2, 'The main tuple should return 2, since two tuples are created.')
val.nodes.Tuple.add()
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('Tuple'), yAxis), 3, 'The main tuple should return 3, since two tuples are created.')
const allNodesAsArray = []
for (var key in val.nodes) {
    allNodesAsArray.push(val.nodes[key]);
}
allNodesAsArray.sort((a, b) => {
    return a.order_id == b.order_id ? 0 : a.order_id < b.order_id ? -1 : 1
})
console.info('--- start ')
for (var i = 0; i < allNodesAsArray.length; i++) {
    const node = allNodesAsArray[i]
    log.info(" ".repeat(node.depth) + node.id + ":" + node.order_id)
}
log.info('--- done ')
const TupleDefinition = {
    tupleProperty: {}
}
TupleDefinition.tupleProperty.TupleDefinition = TupleDefinition;
TupleDefinition.tupleProperty.tupleProperty = TupleDefinition.tupleProperty;

//Here we can adept the front-end to not show the
workbook.walkProperties(rootVariable, function(node, yax, treeDepth, y) {
    called++;
    log.info(" ".repeat(treeDepth) + y.hash + "_" + y.index + "_" + node.rowId + ": " + yax)
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
PropertiesAssembler.visitModel('TUPLETEST', function(a, b) {
    a.order_id = a.hash.join('');
    arranged.push(a)
})
arranged.sort((a, b) => {
    return a.order_id == b.order_id ? 0 : a.order_id < b.order_id ? -1 : 1
})
for (var i = 0; i < arranged.length; i++) {
    var obj = arranged[i];
    log.info(obj.order_id + obj.rowId)
}
log.info(' END ')
arranged = []
val.nodes.Tuple.add()
val.nodes.Tuple.add()


function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

workbook.walkProperties(rootVariable, function(node, yax, treeDepth, y) {
    var newArray = node.hash.slice();
    //y should contain this information
    if (y.depth == 0) {
        newArray[3] = pad(yax == 'new' ? 999 : y.index, 3)
    } else if (y.depth == 1) {
        newArray[3] = pad(y.index, 3)
        newArray[5] = pad(yax == 'new' ? 999 : y.parent.index, 3)
    }
    arranged.push({
        order_id: newArray.join(''),
        node: node
    })
}, yAxis, null, 0)
arranged.sort((a, b) => {
    return a.order_id == b.order_id ? 0 : a.order_id < b.order_id ? -1 : 1
})
for (var i = 0; i < arranged.length; i++) {
    var obj = arranged[i];
    log.info(obj.order_id + obj.node.rowId)
}
val.nodes.Tuple.add()
log.info(workbook.maxTupleCountForRow(workbook.findNode('Tuple')))
workbook.set('NestedTuple', '123', 'value', 0, YAxis[4].deeper[2])
console.info(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[4].deeper[0]))
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[4].deeper[0]), -1)
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[5].deeper[2]), -1)
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[4].deeper[2]), 0)

console.info('--')
workbook.walkProperties(rootVariable, function(node, yax, treeDepth, y) {
    console.info(y.display + " ".repeat(treeDepth) + node.rowId)
}, YAxis[0].parent, null, 0)