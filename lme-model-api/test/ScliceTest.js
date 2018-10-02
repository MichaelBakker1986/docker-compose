import { equal } from 'assert'

const modelName = '_a_b_c_d_123_d'

const one = modelName.split('_')[modelName.split('_').length - 1]
const other = modelName.split('_').slice(-1)
const other2 = modelName.split('_').last()
equal(one, other)
