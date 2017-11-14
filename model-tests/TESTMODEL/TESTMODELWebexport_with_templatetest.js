require('../../ff-fes/exchange_modules/presentation/webexport_with_template');
const LME = require('../../lme-model-api/src/lme');
const LmeDisplayGrammer = require('./LmeDisplayGrammer').LmeDisplayGrammer

const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
//MVO.importFFL(fs.readFileSync(__dirname + '/TESTMODEL.ffl', 'utf8'));
var webDesignGrammer = fs.readFileSync(__dirname + '/TESTMODEL.wdn', 'utf8');

const lmeDisplayGrammer = new LmeDisplayGrammer(webDesignGrammer);
const grammerModel = lmeDisplayGrammer.parseGrammer();
MVO.importWebModel(webDesignGrammer)

const nodes = MVO.exportWebModel().nodes;
console.info(nodes)


