require('../../lme-core/exchange_modules/ffl/RegisterToLMEParser')
require('../../math')

const Register                  = require('../../lme-core/exchange_modules/ffl/Register').Register,
      Workbook                  = require('../../lme-core/src/JSWorkBook'),
      Context                   = require('../../lme-core/src/Context'),
      log                       = require('log6'),
      assert                    = require('assert'),
      LME                       = require('../../lme-model-api/src/lme'),
      FormulaInformationManager = require('../../lme-model-api/src/FormulaInformationManager')

const ffl = require('fs').readFileSync(__dirname + '/../LGD/LGD.ffl', 'utf8')
const register = new Register()
const wb = new Workbook(new Context())
wb.importFFL({
    register: register,
    raw     : ffl
})

//var result = FormulaInformationManager.lookupFunction('If', 'Entered(If(MAX(1,2),MIN(2,1),1000))', 8);

assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: OnZero(123,1.4);", 13).parts.length, 3)
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: OnZero(123,1.4);", 12).parts.length, 3)
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: OnZero(123,1.4);", 11).parts.length, 3)
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: OnZero(MAX(1,2),1.4);", 10).parts.length, 3)
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: OnZero(MAX(1,2),1.4);", 19).parts[1], 'MAX(1,2)')
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: MAX(MAX(1,2),1.4);", 20).parts.length, 3)
assert.equal(FormulaInformationManager.lookupFunction("OnZero", "    formula: MAX(MAX(1,2),1.4);", 20).parts[1], '1')

var result = FormulaInformationManager.lookupFunction("MAX", "la: OnZero(MAX(1,2),1.4);", 12);
log.info(FormulaInformationManager.lookupFunction("OnZero", "la: OnZero(MAX(1,2),1.4);", 8))
log.info(FormulaInformationManager.lookupFunction("MAX", "la: OnZero(MAX(1,2),1.4);", 9))
log.info(FormulaInformationManager.lookupFunction("MAX", "la: OnZero(MAX(1,2),1.4);", 10))
log.info(FormulaInformationManager.lookupFunction("MAX", "la: OnZero(MAX(1,2),1.4);", 11))
log.info(result)
//=Case(krPD,[<=0.01:2|<=0.03:1|>0.03:0])
log.info('\n' + FormulaInformationManager.extractParts(wb, result).join('\n'))
//Incredible improvements can be made when not-altering state calculations are performed
//While calling If(a,b,c) and b and c are the same. Not always correct.
//Interesting would be Balance[bkyr] Balance[detail] (always show current year)
/*
 Showing D3 charts in array would be like [[1,2,3,4,5,6,7],[1,2,2,2,2,2,2,2]]
 [Balance as Default,Balance[bkyr] as avg]
 So always an array of numbers
   {
     [a,b,c],   = Balance
     [a,a,a]    = Balance[bkyr]
   }

 Can we call an array of CurrentBookYear values? VALUES[1,12] VALUES[x.bkyr.firstdetail,x.bkyr.lastdetail]
 VALUES[bkyr] should be the same.
 Balance[bkyr] presumably results in the SUM of the values..
 HSUM is required to fixed.

 The time-dimension is required.
 AVG 2nd is oke...
 FirstDetail,LastDetail is relative to BkYear,Quarter,Half
 Scaling? what will happen when request in Detail/BkYear
 When translating into bkyear it will always be the same.. Do we want this?
 It is the default request for column1
 Balance[bkyr]/TsY results in the avg... without knowing... But not repeated over time... TsY times..
 Balance[bkyr] result into VALUES(??
 sum for balance,
 last for flow
 avg for average
 override a variable with aggregation avg when want to use it in graph
 datatype: matrix
 Matrix(
  AVG(Balance[bkyr]), == every x, get x.bkyr . do the AVG of it -> require caching....
  Balance             == every x, get x      . get value
  every argument is a array of points in the Graph
 )
 So when show in detail. We only get first detail of a year, but want entire width.
 1->bkyr->? 6 times...
 Translate FFL into d3....
  q
 */