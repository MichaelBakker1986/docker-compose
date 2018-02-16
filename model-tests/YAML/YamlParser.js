/**
 * Use yamljs to parse-modify docker-compose files
 * Experimental YML format of FFL
 */
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const YAML          = require('yamljs'),
      log           = require('log6'),
      assert        = require('assert'),
      LME           = require('../../lme-model-api/src/lme'),
      Context       = require('../../lme-core/src/Context'),
      Register      = require('../../lme-core/exchange_modules/ffl/Register').Register,
      RegisterToFFL = require('../../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL,
      context       = new Context({ columnSize: 1, columns: ['value', 'visible'] }),
      wb            = new LME(null, context),
      register      = new Register();

log.debug(
    JSON.stringify(
        YAML.load('./yamlTestFile.yml'),
        null, 2)
);

wb.importFFL({
    register: register,
    raw     : require('fs').readFileSync(__dirname + '/../../git-connect/resources/MVO.ffl', 'utf8')
});
const workbook = wb.lme;
const root = register.getIndex('name')['root']
const yawmfll = {}

const registerToFFL = new RegisterToFFL(register)
RegisterToFFL.prototype.toGeneratedYaml = function(rootVariableName, modelName) {
    const constants = this.constants;
    const formattedFFL = []
    const midx = this.modifierIndex;
    const nidx = this.nameIndex;
    const ridx = this.referstoIndex;
    const rname = " refers to "
    const indents = this.indents;
    const tidx = this.tupleIndex;
    const tuple = "tuple "
    const parentNameIndex = this.parentNameIndex
    const variable = "variable "
    //define shiftindent relevant indexes;
    const schema = this.schema;
    const relevant = this.relevant;
    const shiftindent = this.shiftindent;
    const names = this.vars;
    var cdept = 0;
    const yawmlOut = {}
    yawmlOut['root'] = yawmlOut
    const rootNode = this.vars[rootVariableName || 'root'];
    this.walk(rootNode, 1, function(node, depth) {

        const yawmlNode = {}
        yawmlOut[node[nidx]] = yawmlNode
        if (node[parentNameIndex]) yawmlOut[register.i[node[parentNameIndex]][nidx]][node[nidx]] = yawmlNode;
        const items = [];

        items.push(node[tidx] ? tuple : variable)
        items.push(node[midx] || "")
        items.push(node[nidx])
        if (ridx != -1 && node[ridx]) {
            items.push(rname);
            items.push(node[ridx])
        }
        for (var i = 0; i < relevant.length; i++) {
            const real = relevant[i]
            if (schema[real] == 'valid') continue
            if (node[real] == 'number') continue
            if (node[real]) {
                yawmlNode[schema[real]] = node[real]
            }
        }
        cdept = depth;
    })
    for (var i = 0; i < formattedFFL.length; i++) {
        var obj = formattedFFL[i];
        formattedFFL[i] = obj.replace(/__(\d+)/gm, function($1, $2) {
            return constants[parseInt($1.substring(2))]
        })
    }
    return yawmlOut;
}
console.info(YAML.stringify(registerToFFL.toGeneratedYaml(null, null)['root'], 6))