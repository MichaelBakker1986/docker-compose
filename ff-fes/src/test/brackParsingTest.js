var assert = require('assert');
var bracketParser = require('../archive/ffl/bracketparser.js');

//TODO: the tests are realy strict, also with spacing.
//Consider /\\s*/g to strip all whitespace before compare
//remove strangely positioned | and & directly after a , or )
assert.equal('If(Pos("IFRS-EU" , FES_LAYOUT)>0,1,If(Pos("IFRS-PL" , FES_LAYOUT)>0,48,If(Pos("IFRS-Intl" , FES_LAYOUT)>0,2,0)))', bracketParser.parseRegex('If(Pos("IFRS-EU",&FES_LAYOUT)>0,1,If(Pos("IFRS-PL",&FES_LAYOUT)>0,48,If(Pos("IFRS-Intl",&FES_LAYOUT)>0,2,0)))'));

//remove strangely positioned & and && directly after a ,
assert.equal('EvaluateAsString(If(Q_Map01 == 0.0 , "Nog niet alle vragen zijn beantwoord.", "") + scRestricties + Q_WARNING_GLOBAL);', bracketParser.parseRegex('EvaluateAsString(If(Q_Map01 = 0.0, &"Nog niet alle vragen zijn beantwoord.", "") & scRestricties & Q_WARNING_GLOBAL);'));
assert.equal(", test", ", && test".replace(/(,|\()\s*&&/g, '$1'));
assert.equal(", test", ", || test".replace(/(,|\()\s*\|\|/g, '$1'));