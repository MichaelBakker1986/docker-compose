const assert = require('assert')
const Register = require('../exchange_modules/ffl2/Register').Register
const ChangeManager = require('../exchange_modules/ffl2/ChangeManager').ChangeManager
const register = new Register()
register.addRow(['abc', 1, 10, 'testVar', null, 'modifier', 'parentId', 'tuple', 'SUPERVAR'])
register.addRow(['abc', 10, 20, 'SUPERVAR', 'index', 'modifier', 'parentId', 'tuple', null])
const inherited = register.createInformationObject('testVar', [])
assert(inherited[4].value == 'index')
