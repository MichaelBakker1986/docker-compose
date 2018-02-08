const log = require('log6')
const assert = require('assert')

const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
const DeltaCompareRegister = require('../../lme-core/exchange_modules/ffl/DeltaCompareRegister').DeltaCompareRegister
const FFLFormatter = require('../../lme-core/exchange_modules/ffl/FFLFormatter').Formatter


const modelRegister = new Register();
var fflformat = new FFLFormatter(modelRegister, require('fs').readFileSync(__dirname + '/../../model-tests/LGD/LGD.ffl', 'utf8'))
fflformat.parseProperties()
const otherModelRegister = new Register();
const otherFFLFormat = new FFLFormatter(otherModelRegister, require('fs').readFileSync(__dirname + '/../../model-tests/LGD/LGD_v2.ffl', 'utf8'))
otherFFLFormat.parseProperties()

const dcompare = new DeltaCompareRegister(modelRegister, otherModelRegister)
const compareResults = dcompare.compare();

log.info(compareResults.toString());
/*assert(compareResults.inserts.length == 1)
assert(compareResults.inserts.length == 1)*/
