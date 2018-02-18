const ChangeManager = require('../exchange_modules/ffl/ChangeManager').ChangeManager
const cm = new ChangeManager();
const assert = require('assert')

/* Extract:
* tuple =+test Implies
* tuple -test
* variable =test refers to
* =test refers to
* To: test
*/
assert.equal(cm.extractName('tuple =+test Implies'), 'test')
assert.equal(cm.extractName('tuple -test'), 'test')
assert.equal(cm.extractName('variable =test refers to'), 'test')
assert.equal(cm.extractName('=test refers to'), 'test')
assert.equal(cm.extractName('test'), 'test')

assert.ok(cm.isVariableLine('test\n{'))
assert.ok(cm.isVariableLine('variable test \n  {'))
assert.ok(cm.isVariableLine('tuple test \n \n\n { aa'))
assert.ok(!cm.isVariableLine('tuple test \n \n\n } aa'))
assert.ok(!cm.isVariableLine(' tuple test \n \n\n } aa'))

assert.ok(cm.validCurrentLine('tuple test \n \n\n', ' { aa'))
assert.ok(!cm.validCurrentLine(' vaariable  test \n \n\n', ' { aa'))
assert.ok(!cm.validCurrentLine('tuple test \n \n\n', ' } aa'))
assert.ok(!cm.validCurrentLine('tuple test \n \n\n', 'aa:bbb;'))
assert.ok(!cm.validCurrentLine('acb:reas', 'aa:bbb;'))
assert.ok(!cm.validCurrentLine('reas{', 'aa:bbb;'))
