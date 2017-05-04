var log = require('ff-log')
var WorkBook = require('../fesjs/JSWorkBook')
var FESContext = require('../fesjs/fescontext')
require('../../ff-math')
/*var ARGUMENT_NAMES = /([^\s,]+)/g;
 function getParamNames(func) {
 var fnStr = func.toString();
 return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES) || [];
 }*/
//var test = getParamNames(TSUM);
var wb = new WorkBook(new FESContext());
wb.createFormula("1+1", "TupleTest", 'value', true);
wb.createFormula("TSUM(TupleTest)", "TupleTestSUM");
var assert = require('assert');
assert(wb.get('TupleTest') == 2)
wb.set('TupleTest', 10)
assert(wb.get('TupleTest') == 10)

var FirstY = 1;
var FirstX = 1;

wb.set('TupleTest', 20, 'value', FirstX)
assert(wb.get('TupleTest') == 10)
assert(wb.get('TupleTest', 'value', FirstX) == 20)
wb.set('TupleTest', 30, 'value', FirstX, FirstY)
assert(wb.get('TupleTest', 'value', FirstY) == 20)
wb.set('TupleTest', 40, 'value', FirstY, 0)
assert(wb.get('TupleTest', 'value', FirstX, FirstY) == 30)
var tupleTestSUM = wb.get('TupleTestSUM');
assert(tupleTestSUM == 10 + 2)
assert(wb.get('TupleTestSUM', 'value', FirstX) == 40 + 30)
wb.set('TupleTest', 100, 'value', FirstX, 30)
assert(wb.get('TupleTestSUM', 'value', FirstY) == 100 + 40 + 30 + 2 * 28)
wb.set('TupleTest', null, 'value', FirstX, 30)
assert(wb.get('TupleTestSUM', 'value', FirstX) == 40 + 30)

wb.createFormula("''", "TupleName", 'value', true);
wb.set('TupleName', 'Piet', 'value', 0, 0)
wb.set('TupleName', 'Jan', 'value', 0, 1)
wb.set('TupleName', 'Klaas', 'value', 0, 2)
log.info(wb.get('TupleName'))
/**
 * Gedachten bij het implementeren van tuples:
 * Van tuple naar tuple *binnen eigen tupleDefinition* word de TupleLocatie gebruikt om berekeningen te doen
 * Van Niet tuple naar tuple worden alle values van alle tupleinstanties terug gegeven
 * van tuple naar niet tuple word de tuple naar 0 gezet (mits anders aangeven) (FirstTuple,LastTuple,MaxTuple,FirstTupleIn....)
 * Formules worden geparsed, daarin is de target(referenceFormula) een propertyReferentie.
 * Dit betekend dat er vantui deze manier gedacht moet worden met het parsen
 * De TargetProperty kan een tuple/niet tuple zijn, en daar moet rekening mee gehouden worden.
 * De YAxis word meegeven van de formule, als er naar een tuple variable referenced word, kan de geparsde formula vanuit een tuple
 * een andere uitwerking hebben dan vanuit een niet-tuple
 *
 * tuple    A: 1
 * tuple    X: A+1 -> a(x,y,z) + 1 = 2
 * variable L: A+1 -> a(x,y,z) + 1 = [1] + 1
 *
 * Een wrapper om de uitvragende Property?
 * TSUM herstellen en de logica verplaatsen naar de uitvragende formule
 * TSUM(tupleNaam) => TSUM(tupleDefinitionCount,propertyNaam,x,y,z)
 *
 * TSUM herstellen lijkt de beste oplossing
 *
 * Bij het inlezen van een FFL model, tuple markeren als TupleDefinition
 * Alle kinderen daaronder totaan nieuwe tuple markeren als TupleProperty
 *
 * Bij het uitvragen van een TupleDefinition itereren over alle instanties
 */

