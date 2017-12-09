require('../../lme-core/exchange_modules/presentation/webexport_with_template');
const LME = require('../../lme-model-api/src/lme');
const LmeDisplayGrammer = require('../../lme-core/exchange_modules/presentation/LmeDisplayGrammer').LmeDisplayGrammer

const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
const MVOFFL = fs.readFileSync(__dirname + '/../MVO/MVO.ffl', 'utf8');
MVO.importFFL(MVOFFL);

function splitName(name) {
    const split = name.split('_');
    return {row: split.slice(1, -1).join('_'), col: split[split.length - 1]}
}
console.info(splitName("KVO_Q_ROOT_VALUE"))
const lines = MVOFFL.split('\n')
const vars = {}
for (var i = 0; i < lines.length; i++) {
    var obj1 = lines[i];
    const trim = obj1.trim();
    if (trim.indexOf('variable') >= 0) {
        var name = trim.substring(9).substring(0, trim.indexOf(" "));
        console.info(name)
        vars[name] = i
    }
}

//var webDesignGrammer = fs.readFileSync(__dirname + '/TESTMODEL.wdn', 'utf8');
//const lmeDisplayGrammer = new LmeDisplayGrammer(webDesignGrammer);

/*const lmeDisplayGrammer = new LmeDisplayGrammer('Uses TESTMODEL\nQ_ROOT');
const grammerModel = lmeDisplayGrammer.parseGrammer();*/
MVO.importWebModel('Uses MVO\nQ_ROOT')

const nodes = MVO.exportWebModel().nodes;



