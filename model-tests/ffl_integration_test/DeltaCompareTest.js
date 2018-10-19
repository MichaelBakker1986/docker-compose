import { DeltaCompareRegister, FFLToRegister } from '../../ffl/index'
import { equal }                               from 'assert'
import { source_ffl, target_ffl }              from '../../ffl/tests/FFLTestCasesUtil'
import { Register }                            from '../../lme-core/index'

const base_register = new FFLToRegister(new Register, source_ffl).parseProperties(true)
const target_register = new FFLToRegister(new Register, target_ffl).parseProperties(true)

const comparator = new DeltaCompareRegister(base_register, target_register).compare()

const differences = comparator.map(([type, var_name, var_property, value]) => ({ var_name, var_property, value }))
equal(differences.length, 6, JSON.stringify(differences, null, 2))