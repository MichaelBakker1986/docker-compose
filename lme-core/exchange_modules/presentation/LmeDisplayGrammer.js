const log = require('ff-log')

function LmeDisplayGrammer(grammer, modelName) {
    this.nodes = []
    this.modelName = modelName;
    this.lines = grammer.split('\n')
    this.defaults = {
        columns: ['title', 'value']
    }
}

LmeDisplayGrammer.prototype.parseGrammer = function() {
    let modelPrefix = this.modelName;
    for (var i = 0; i < this.lines.length; i++) {
        //trim trailing spaces only.
        var grammerLine = this.lines[i].replace(/\s+$/, '');
        let tmp;
        if (tmp = grammerLine.match(/^Uses (\w+)$/mi)) {
            modelPrefix = tmp[1] + '_';
        } else if (tmp = grammerLine.match(/^(\s*)(\w+)$/mi)) {
            let variableName = modelPrefix + tmp[2];
            this.nodes.push({
                rowId: variableName,
                columns: this.defaults.columns
            })
        }
    }
    return this;
}
exports.LmeDisplayGrammer = LmeDisplayGrammer