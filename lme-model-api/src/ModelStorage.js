const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
const DeltaCompareRegister = require('../../lme-core/exchange_modules/ffl/DeltaCompareRegister').DeltaCompareRegister
const FFLFormatter = require('../../lme-core/exchange_modules/ffl/FFLFormatter').Formatter
const assembler = require('../../git-connect/ModelAssembler');
const uuid = require('uuid4');
const log = require('log6')
const path = require('path')

function ModelStorage() {
}

ModelStorage.prototype.getHistory = function(name) {
    return assembler.getFFLModelPropertyChanges(name).then(function(ok) {
        log.info(ok)
        return ok;
    }).catch(function(err) {
        log.error(err)
        throw Error('Unable to get history for model with name ' + name, err)
    });
}
ModelStorage.prototype.saveDelta = function(name, data) {
    const fflPath = path.resolve(__dirname + '/../../git-connect/resources/' + name + '.ffl');
    const compareResults = this.doDeltaCompare(name, fflPath, data)
    if (compareResults.status == 'ok' && compareResults.changes > 0) {
        const relativeFFLPath = path.relative(__dirname + '/../../git-connect/resources/', fflPath)
        var dbEntries = [];
        const create_time = new Date().toUTCString();
        const hash = uuid();
        for (var i = 0; i < compareResults.compare.updates.length; i++) {
            var update = compareResults.compare.updates[i];
            dbEntries.push([hash, create_time, relativeFFLPath, name, update[1], update[2], update[3]])
        }
        for (var i = 0; i < compareResults.compare.inserts.length; i++) {
            var update = compareResults.compare.inserts[i];
            dbEntries.push([hash, create_time, relativeFFLPath, name, update[1], update[2], update[3]])
        }
        for (var i = 0; i < compareResults.compare.deletes.length; i++) {
            var update = compareResults.compare.deletes[i];
            dbEntries.push([hash, create_time, relativeFFLPath, name, update[1], update[2], null])
        }
        assembler.insertProperties(dbEntries).then(function(ok) {
            log.info(ok)
        }).catch(function(err) {
            log.error(err)
        });
        return hash
    }
}
ModelStorage.prototype.doDeltaCompare = function(name, fflPath, data) {
    const fs = require('fs');
    const result = {status: 'fail', changes: 0}
    if (fs.existsSync(fflPath)) {
        const modelRegister = new Register();
        const fflformat = new FFLFormatter(modelRegister, require('fs').readFileSync(fflPath, 'utf8'))
        fflformat.parseProperties()
        const otherModelRegister = new Register();
        const otherFFLFormat = new FFLFormatter(otherModelRegister, data)
        otherFFLFormat.parseProperties()
        const dcompare = new DeltaCompareRegister(modelRegister, otherModelRegister)
        const compareResults = dcompare.compare();
        if (log.TRACE) log.trace(compareResults.toString());
        result.status = 'ok'
        result.changes = compareResults.changes;
        result.compare = compareResults;
    }
    return result;
}
exports.ModelStorage = new ModelStorage()