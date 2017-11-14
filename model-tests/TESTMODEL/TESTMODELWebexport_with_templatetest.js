require('../../ff-fes/exchange_modules/presentation/webexport_with_template');
const LME = require('../../lme-model-api/src/lme');
const LmeDisplayGrammer = require('../../ff-fes/exchange_modules/presentation/LmeDisplayGrammer').LmeDisplayGrammer

const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
MVO.importFFL(fs.readFileSync(__dirname + '/../MVO/MVO.ffl', 'utf8'));
//var webDesignGrammer = fs.readFileSync(__dirname + '/TESTMODEL.wdn', 'utf8');
//const lmeDisplayGrammer = new LmeDisplayGrammer(webDesignGrammer);

/*const lmeDisplayGrammer = new LmeDisplayGrammer('Uses TESTMODEL\nQ_ROOT');
const grammerModel = lmeDisplayGrammer.parseGrammer();*/
MVO.importWebModel('Uses MVO\nQ_ROOT')

const nodes = MVO.exportWebModel().nodes;



