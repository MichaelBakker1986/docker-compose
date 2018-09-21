import { equal, ok }     from 'assert'
import { ChangeManager } from '../ChangeManager'

const cm = new ChangeManager()
/* Extract:
 * tuple =+test Implies
 * tuple -test
 * variable =test refers to
 * =test refers to
 * To: test
 */
equal(cm.extractName('tuple =+test Implies'), 'test')
equal(cm.extractName('tuple -test'), 'test')
equal(cm.extractName('variable =test refers to'), 'test')
equal(cm.extractName('=test refers to'), 'test')
equal(cm.extractName('test'), 'test')

ok(cm.isVariableLine('test\n{'))
ok(cm.isVariableLine('variable test \n  {'))
ok(cm.isVariableLine('tuple test \n \n\n { aa'))
ok(!cm.isVariableLine('tuple test \n \n\n } aa'))
ok(!cm.isVariableLine(' tuple test \n \n\n } aa'))

ok(cm.validCurrentLine('tuple test \n \n\n', ' { aa'))
// noinspection SpellCheckingInspection
ok(!cm.validCurrentLine(' vaariable  test \n \n\n', ' { aa'))
ok(!cm.validCurrentLine('tuple test \n \n\n', ' } aa'))
ok(!cm.validCurrentLine('tuple test \n \n\n', 'aa:bbb;'))
ok(!cm.validCurrentLine('acb:reas', 'aa:bbb;'))
ok(!cm.validCurrentLine('reas{', 'aa:bbb;'))
