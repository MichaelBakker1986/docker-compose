/**
 * find displaytype = scorecard
 */
var FFLFormatter = require('./FFLFormatter').Formatter
var Register = require('./Register').Register

function ScorecardTool() {
    this.on = false;
}

var defaultValue = {
    visible: {
        undefined: true,
        '1.0': true,
        '1': true,
        'true': true,
        'On': true
    },
    locked: {
        '0.0': true,
        '0': true,
        'false': true,
        'Off': true,
        'No': true
    },
    required: {
        undefined: true,
        '0.0': true,
        '0': true,
        'false': true,
        'No': true,
        'Off': true
    }
}
ScorecardTool.prototype.parse = function(input) {
    //TODO: move radio-choice / VALIDATION names into here..
    var indexer = new Register();
    var model = new FFLFormatter(indexer, input);
    model.parseProperties();
    this.childIndex = indexer.schemaIndexes.children
    const requiredIndex = indexer.schemaIndexes.required
    const nameIndex = indexer.schemaIndexes.name
    const formulaIndex = indexer.schemaIndexes.formula
    const rIndex = indexer.schemaIndexes.index
    //index and parse everything
    //find scorecard types
    const scorecards = indexer.find('displaytype', 'scorecard');
    const adjustments = []
    for (var i = 0; i < scorecards.length; i++) {
        var completeFilledIn = [];
        const scorecard = scorecards[i];
        const steps = scorecard[indexer.schemaIndexes.children];
        //CONVERT A LOT OF THIS INTO SELECT_DECENDANTS
        for (var j = 0; j < steps.length; j++) {
            const requiredvars = []
            const mapVar = steps[j];
            this.walkDepthFirst(mapVar, function(node, depth) {
                if (!defaultValue.required[node[requiredIndex]]) {
                    requiredvars.push(node)
                }
            }, 0)
            if (requiredvars.length > 0) {
                const validFormula = '[AMMOUNT(' + requiredvars.map(function(variable) {
                    return variable[nameIndex] + '.required and ' + variable[nameIndex] + '.entered'
                }).join(',') + '),AMMOUNT(' + requiredvars.map(function(variable) {
                    return variable[nameIndex] + '.required'
                }).join(',') + ')]';

                adjustments.push({
                    index: mapVar[nameIndex],
                    property: 'valid',
                    value: validFormula
                })
                completeFilledIn = completeFilledIn.concat(requiredvars)
            }
        }
        if (completeFilledIn.length > 0) {
            const validFormula = 'AMMOUNT(' + completeFilledIn.map(function(variable) {
                return variable[nameIndex] + '.required and ' + variable[nameIndex] + '.entered'
            }).join(',') + ')  = AMMOUNT(' + completeFilledIn.map(function(variable) {
                return variable[nameIndex] + '.required'
            }).join(',') + ')';

            adjustments.push({
                index: scorecard[nameIndex],
                property: 'formula',
                value: validFormula
            })
        }
    }
    var names = indexer.getIndex('name')
    for (var adjindex = 0; adjindex < adjustments.length; adjindex++) {
        var adjustment = adjustments[adjindex];
        indexer.value(names[adjustment.index][rIndex], adjustment.property, adjustment.value)
    }
    return indexer;
}
ScorecardTool.prototype.walkDepthFirst = function(node, visitor, depth) {
    const children = node[this.childIndex]
    for (var i = 0; i < children.length; i++) {
        this.walkDepthFirst(children[i], visitor, depth + 1)
    }
    visitor(node, depth)
}

exports.ScorecardTool = ScorecardTool;