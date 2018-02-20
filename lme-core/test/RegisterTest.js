const assert = require('assert')
const Register = require('../exchange_modules/ffl/Register').Register
const ChangeManager = require('../exchange_modules/ffl/ChangeManager').ChangeManager
const register = new Register()
register.addRow(['abc', 1, 10, 'testVar', null, 'modifier', 'parentId', 'tuple', 'SUPERVAR'])
register.addRow(['abc', 10, 20, 'SUPERVAR', 'index', 'modifier', 'parentId', 'tuple', null])
const inherited = register.createInformationObject('testVar', [])
assert(inherited[4].value == 'index')

const all = 'MatrixLookup(a,b,c()\n)'
const arr = []
console.info(all.replace(/\([^).]*/gm, function(a, b, c) {
    if (arr.length == 0) arr.length = b + 2
    return '(\n' + arr.join(' ') + a.slice(1)
}))