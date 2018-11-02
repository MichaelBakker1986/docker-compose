import { Register } from '../../lme-core/index'
import { equal }    from 'assert'

const register = new Register
register.addColumn('parent_name')
register.initRow([null, null, null, 'Q_ROOT'], { children: [], parent_name: 'root' })

equal(register.getNames()['Q_ROOT'][register.schemaIndexes.parent_name], 'root')
