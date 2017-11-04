function ScorecardQCaseFix() {
    this.on = true;
}

ScorecardQCaseFix.prototype.parse = function(input) {
    return input.replace(/[^\w]{1}(Q_\w*)/gmi, function($1) {
        return $1.toUpperCase()
    })
}
exports.ScorecardQCaseFix = new ScorecardQCaseFix();