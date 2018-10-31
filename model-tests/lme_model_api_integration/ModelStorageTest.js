import ModelStorage          from '../../lme-model-api/src/ModelStorage'
import { readModelAsString } from '../../git-connect/index'
import ok                    from 'assert'

const doDeltaCompare = ModelStorage.doDeltaCompare('KSP', readModelAsString({ model_name: 'KSP' }))
ok(doDeltaCompare.changes == null, 'there should be no changes')
