require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const LME = require('../../lme-model-api/src/lme');
const Context = require('../../lme-core/src/Context');
const ValueFacade = require('../../lme-core/src/ValueFacade');
const log = require('log6');
const fs = require('fs');
const assert = require('assert');
const yax = require('../../lme-core/src/YAxis');
const TUPLETEST = new LME();
const context = new Context();
context.columnSize = 1;
context.columns = ['value']
TUPLETEST.lme.context = context
const workbook = TUPLETEST.lme;

TUPLETEST.importFFL(fs.readFileSync(__dirname + '/TupleTest.ffl', 'utf8'));
//we going to use,
//

function TupleProto() {
    const all = {
        hash: 0,
        index: 0,
        depth: 0,
        deeper: []
    }
    all.base = all;
    for (var i = 0; i < 8; i++) {
        all.deeper[i] = {
            base: all,
            depth: 0,
            index: i,
            hash: (32768 * i),
            deeper: []
        }
        if (i > 0) all.deeper[i].previous = all.deeper[i - 1]
        if (i > 0) all.deeper[i - 1].next = all.deeper[i]

        for (var j = 0; j < 8; j++) {
            all.deeper[i].deeper[j] = {
                base: all,
                index: j,
                depth: 1,
                hash: (i * 1) + (j * 64),
                deeper: []
            }
            if (j > 0) all.deeper[i].deeper[j].previous = all.deeper[i].deeper[j - 1]
            if (j > 0) all.deeper[i].deeper[j - 1].next = all.deeper[i].deeper[j]

            for (var k = 0; k < 8; k++) {
                all.deeper[i].deeper[j].deeper[k] = {
                    base: all,
                    depth: 2,
                    index: k,
                    hash: (i * 1) + (j * 64) + (k * (64 * 8))
                }
                if (k > 0) all.deeper[i].deeper[j].deeper[k].previous = all.deeper[i].deeper[j].deeper[k - 1]
                if (k > 0) all.deeper[i].deeper[j].deeper[k - 1].next = all.deeper[i].deeper[j].deeper[k]
            }
        }
    }
    this.all = all;
}

const rootVariable = workbook.getRootSolutionProperty()
workbook.set('TupleVar1', 'test', 'value', 0, 1)
const YAxis = new TupleProto().all;
workbook.set('TupleVar1', 'test', 'value', 0, YAxis.deeper[1])
workbook.walkProperties(rootVariable, function(node, yax, treeDepth, y) {
    console.info(" ".repeat(treeDepth) + y.hash + "_" + y.index + "_" + node.name)
}, YAxis, null, 0)

const val = workbook.export('webexport')
val.nodes.Tuple.add()



