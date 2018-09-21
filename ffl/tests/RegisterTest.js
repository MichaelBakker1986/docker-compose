import { RegisterToFFL, RegisterToJSON } from '../index'
import { Register }                      from 'lme-core'
import { info }                          from 'log6'
import { equal }                         from 'assert'

const register = new Register
const children = () => ({ val: [], col: 'children' })
register.addColumns(['parent_name', 'visible', 'value'])
register.initRow([null, null, null, 'Q_ROOT'], [
	children(),
	{ val: 170, col: 'value' },
	{ val: 200, col: 'visible' },
	{ val: 0, col: 'tree_index' },
	{ val: 'root', col: 'parent_name' }
])
register.initRow([null, null, null, 'root'], [children()])
register.initRow([null, null, null, 'Q_STEP01'], [
	children(),
	{ val: 170, col: 'value' },
	{ val: 200, col: 'visible' },
	{ val: 0, col: 'tree_index' },
	{ val: 'Q_ROOT', col: 'parent_name' }
])
register.iterateRows('tree_index', (index, row, parent, tree_index = 0) => parent[register.schemaIndexes.children][tree_index] = row)
const ffl = new RegisterToFFL(register).toGeneratedFFL({ rootVariableName: 'root', auto_join: true })
const target_register = new Register
info(new RegisterToJSON(target_register).fromJSON(new RegisterToJSON(register).toJSON('root')))
equal(ffl, new RegisterToFFL(target_register).toGeneratedFFL({ rootVariableName: 'root', auto_join: true }))