/**
 * features breakpoints from FFL file, let them be replayed
 */
function DebugManager() {
    this.stack = []
    this.steps = []
    this.active = false;
    this.stepIndex = 0;
    this.vars = {}
}

function splitName(name) {
    const split = name.split('_');
    return {row: split.slice(1, -1).join('_'), col: split[split.length - 1]}
}

DebugManager.prototype.addStep = function(name) {
    this.active = true;
    const varcol = splitName(name);
    this.steps.push(varcol)
}
DebugManager.prototype.initVariables = function(fflModel) {
    const lines = fflModel.split('\n')
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        const trim = line.trim();
        if (trim.indexOf('variable') >= 0) {
            var name = trim.substring(9).trim().split(" ")[0];
            this.vars[name] = i
        }
    }
}
DebugManager.prototype.nextStep = function() {
    this.stepIndex++;
    if (this.steps.length <= this.stepIndex) {
        this.active = false;
    }
}
DebugManager.prototype.getCurrentLine = function() {
    return this.vars[this.steps[this.stepIndex].row]
}
exports.DebugManager = DebugManager