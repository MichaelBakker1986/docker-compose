var WorkBook = require('../fesjs/JSWorkBook');
var FESContext = require('../fesjs/fescontext');
require('../../ff-math');
var assert = require('assert');
/*var ARGUMENT_NAMES = /([^\s,]+)/g;
 function getParamNames(func) {
 var fnStr = func.toString();
 return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES) || [];
 }*/
//var test = getParamNames(TSUM);
var wb = new WorkBook(new FESContext());

//test for calls within tuples using same tuple, and calls outside tuples use base tuple
wb.createFormula("10", "DocumentValue", 'value', false, 'document');
wb.createFormula("1", "TupleSibling1", 'value', true, 'document');
wb.createFormula("2+DocumentValue", "TupleSibling2", 'value', true, 'document');
wb.createFormula("TupleSibling1[doc]+TupleSibling2[doc]", "TestTupleValues", 'value', true, 'document');
wb.createFormula("TSUM(TestTupleValues[doc])", "TestTupleValuesSUM", 'value', false, 'document');

assert(wb.get('TestTupleValues', 'value', 0, 0) === 13);
wb.set('DocumentValue', 100, 'value', 0, 1);//will completely be ignored, since its not a tuple
assert(wb.get('TestTupleValues', 'value', 0, 0) === 13);
wb.set('DocumentValue', 100, 'value', 0, 0);
assert(wb.get('TestTupleValues', 'value', 0, 0) === 103);
wb.set('TupleSibling1', 2, 'value', 0, 1);
assert(wb.get('TestTupleValues', 'value', 0, 0) === 103);
assert(wb.get('TestTupleValues', 'value', 0, 1) === 104);
//TupleSibling1 and TupleSibling2 do not know they belong to same tuple group
assert(wb.get('TestTupleValuesSUM') === 0);

wb.createFormula("1+1", "TupleTest", 'value', true);
wb.createFormula("TSUM(TupleTest)", "TupleTestSUM");

assert(wb.get('TupleTest') === 2);
wb.set('TupleTest', 10);
assert(wb.get('TupleTest') === 10);

var FirstY = 1;
var FirstX = 1;
//ga tupleInstantie in, y0(0) -> y0(1), check hoeveel Instanties er zijn
wb.set('TupleTest', 20, 'value', FirstX)
assert(wb.get('TupleTest') === 10)
assert(wb.get('TupleTest', 'value', FirstX) === 20)
wb.set('TupleTest', 30, 'value', FirstX, FirstY)
assert(wb.get('TupleTest', 'value', FirstY) == 20)
wb.set('TupleTest', 40, 'value', FirstY, 0)
assert(wb.get('TupleTest', 'value', FirstX, FirstY) == 30)
var tupleTestSUM = wb.get('TupleTestSUM');
assert(tupleTestSUM == 10 + 2)
assert(wb.get('TupleTestSUM', 'value', FirstX) === 40 + 30)
wb.set('TupleTest', 100, 'value', FirstX, 30)
assert(wb.get('TupleTestSUM', 'value', FirstY) === 100 + 40 + 30 + 2 * 28)
wb.set('TupleTest', null, 'value', FirstX, 30)
assert(wb.get('TupleTestSUM', 'value', FirstX) === 40 + 30)

wb.createFormula("''", "TupleName", 'value', true);
wb.set('TupleName', 'Piet', 'value', 0, 0)
wb.set('TupleName', 'Jan', 'value', 0, 1)
wb.set('TupleName', 'Klaas', 'value', 0, 2)
assert(wb.get('TupleName') === 'Piet')
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

