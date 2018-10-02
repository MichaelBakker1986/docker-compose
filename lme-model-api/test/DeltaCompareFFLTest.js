import log                                     from 'log6'
import { ENCODING, Register }                  from '../../lme-core/index'
import { DeltaCompareRegister, FFLToRegister } from '../../ffl/index'
import { readFileSync }                        from 'fs'

const modelRegister = new Register()
//var ffl_format = new FFLFormatter(modelRegister, require('fs').readFileSync(__dirname + '/../../model-tests/LGD/LGD.ffl', 'utf8'))

const header = 'model VASTGOED uses BaseModel\n{\nroot\n{\n' + readFileSync('./testfile.ffl', ENCODING) + '\n}\n}'

const ffl_format = new FFLToRegister(modelRegister, header)
ffl_format.parseProperties()
const otherModelRegister = new Register()
const otherFFLFormat = new FFLToRegister(otherModelRegister, readFileSync(__dirname + '/../../model-tests/LGD/LGD_v2.ffl', ENCODING))
otherFFLFormat.parseProperties()

const dcompare = new DeltaCompareRegister(modelRegister, otherModelRegister)
const compareResults = dcompare.compare()

log.info(compareResults.toString())
/*assert(compareResults.inserts.length == 1)
 assert(compareResults.inserts.length == 1)*/
