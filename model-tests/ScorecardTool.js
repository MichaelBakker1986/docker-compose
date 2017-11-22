/**
 * find displaytype = scorecard
 * add validation to all steps
 * fix input required
 * parse back to ffl
 * TODO: skip the part where formula's are parsed
 * When parsing, remove all default formula.
 * While de-parsing, put all default formula back
 * So a line in result can be multiple lines original
 * First milestone could be a formatting tool
 */
var LexialParser = require('./plugins/FFLFormatter').LexialParser

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
var variables = {}

function Indexer() {
}

Indexer.prototype.find = function(key, value) {
    if (!this[key] || !this[key][value]) return []
    return this[key][value];
}
Indexer.prototype.index = function(key, value, index) {
    if (key == '') throw Error('Invalid FFL. [' + value + ']');
    if (!this[key]) this[key] = {}
    if (!this[key][value]) this[key][value] = []
    this[key][value].push(index)
}
Indexer.prototype.print = function() {
    for (var key in this) {
        for (var value in this[key]) {
            console.info(key + "." + value + ":" + this[key][value].length)
        }
    }
}
var formulaMapping = {
    inputRequired: 'required'
}
ScorecardTool.prototype.parse = function(input) {
    var indexer = new Indexer();
    var model = LexialParser.create(input);
    //index and parse everything
    model.visit(function(variable, raw_properties, children) {
        const varChildren = [];
        for (let i = 0; i < children.length; i++) {
            varChildren.push(variables[children[i][1]])
        }
        const properties = {
            name: variable[0],
            index: variable[1],
            modifier: variable[2],
            parentId: variable[3],
            tuple: variable[4],
            refersto: variable[5],
            children: varChildren
        }
        variables[variable[1]] = properties;
        for (let i = 0; i < raw_properties.length; i++) {
            const p = raw_properties[i];
            const p_seperator_index = p.indexOf(':');//can't use split. some properties use multiple :
            let key = p.substring(0, p_seperator_index).trim();
            key = formulaMapping[key] || key
            const value = p.substring(p_seperator_index + 1).trim();
            properties[key] = value
            indexer.index(key, value, variable[1])
        }
    })
    //find scorecard types
    const scorecardsIndexes = indexer.find('displaytype', 'scorecard');
    const scorecards = []
    for (var i = 0; i < scorecardsIndexes.length; i++) {
        scorecards.push(variables[scorecardsIndexes[i]]);
    }
    const adjustments = []
    for (var i = 0; i < scorecards.length; i++) {
        let completeFilledIn = [];
        const scorecard = scorecards[i];
        for (var j = 0; j < scorecard.children.length; j++) {

            const requiredvars = []

            const mapVar = scorecard.children[j];
            walkDepthFirst(mapVar, function(node, depth) {

                if (!defaultValue.required[node.required]) {
                    requiredvars.push(node)
                }

            }, 0)

            if (requiredvars.length > 0) {
                const validFormula = '[AMMOUNT(' + requiredvars.map(function(variable) {
                    return variable.name + '.required and ' + variable.name + '.entered'
                }).join(',') + '),AMMOUNT(' + requiredvars.map(function(variable) {
                    return variable.name + '.required'
                }).join(',') + ')]';

                adjustments.push({
                    index: mapVar.index,
                    property: 'valid',
                    value: validFormula
                })
                mapVar.valid = validFormula;
                completeFilledIn = completeFilledIn.concat(requiredvars)
            }
        }
        if (completeFilledIn.length > 0) {
            const validFormula = 'AMMOUNT(' + completeFilledIn.map(function(variable) {
                return variable.name + '.required and ' + variable.name + '.entered'
            }).join(',') + ')  = AMMOUNT(' + completeFilledIn.map(function(variable) {
                return variable.name + '.required'
            }).join(',') + ')';

            adjustments.push({
                index: scorecard.index,
                property: 'formula',
                value: validFormula
            })
            scorecard.formula = validFormula;
        }
    }
    for (var adjindex = 0; adjindex < adjustments.length; adjindex++) {
        var adjustment = adjustments[adjindex];
        model.change(adjustment.index, adjustment.property, adjustment.value)
    }
    return model.toFFL();
}

function walkDepthFirst(node, visitor, depth) {
    for (var i = 0; i < node.children.length; i++) {
        walkDepthFirst(node.children[i], visitor, depth + 1)
    }
    visitor(node, depth)
}

exports.ScorecardTool = new ScorecardTool();