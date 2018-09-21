'use strict';

global.IDE_DEBUGMODUS = true;
var assert = require('assert');
var log = require('log6');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../exchange_modules/ffl/RegisterToFFL');
require('../../math/ff-math');
var Register = require('../exchange_modules/ffl/Register').Register,
    WorkBook = require('../src/JSWorkBook'),
    RegisterToFFL = require('../exchange_modules/ffl/RegisterToFFL').RegisterToFFL,
    Context = require('../src/Context');

var context = new Context();
var wb = new WorkBook(context, null, null, { modelName: 'FFLMATH' });

var register = new Register();
register.addColumn('formula');
register.addColumn('datatype');
//register.addRow(['desc', 0, 0, 'root', 0, null, undefined, false, null, 0, [], null, 'Case(2008,[<=2004:0.016|=2005:0.015|=2006:0.009|=2007:0.009|=2008:0.009|=2009:0.013|=2010:0.016|=2011:0.017|=2012:0.021|=2013:0.023|=2014:0.019|=2015:0.014|=2016:0.012|>=2017:0.012])'])
register.addRow(['desc', 0, 0, 'root', 0, null, undefined, false, null, 0, [], null, 'Case(NA,[<=0.00001:"AAA"|<=0.00002:"AA+"|<=0.00004:"AA"|<=0.00008:"AA-"|<=0.00010:"A+"|<=0.00020:"A"|<=0.00040:"A-"|<=0.00090:"BBB+"|<=0.00170:"BBB"|<=0.00420:"BBB-"|<=0.00870:"BB+"|<=0.01560:"BB"|<=0.02810:"BB-"|<=0.04680:"B+"|<=0.07160:"B"|<=0.11620:"B-"|<=0.15400:"CCC+"|<=0.17380:"CCC"|<=0.21500:"CCC-"|<=0.26000:"CC"|>0.26000:"D"]);', 'string']);

wb.importSolution(register, 'ffl2');
log.debug("\n" + new RegisterToFFL(register).toGeneratedFFL('root', 'FFLMATH', false).join('\n'));
log.info(wb.get('root'));

log.info('\n' + context.audittrail.printAuditTrail());