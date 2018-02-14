/**
 * We only want to store delta's from models in the database
 * Therefore we require a comparator between two models
 * returns an action list for current state to update into other state.
 */
const log = require('log6')
// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function(array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function DeltaCompareRegister(registerOne, registerOther) {
    this.one = registerOne;
    this.other = registerOther;
}

/**
 * A compare has three categories.
 *  1) UPDATES
 *  2) INSERTS
 *  3) REMOVES
 */
DeltaCompareRegister.prototype.compare = function() {
    // log.info(this.one.toString())
    // log.info(this.other.toString())
    const delta = {
        schema: this.other.schemaIndexes,
        updates: [],
        inserts: [],
        deletes: [],
        changes: 0
    }
    //Check the schema also has to be diffed.
    const schemaMapping = []
    if (!this.one.schema.equals(this.other.schema)) {
        log.warn('Not supported yet! Incomparable schemas')
        return delta;
    } else {
        for (var i = 0; i < this.one.schema.length; i++) schemaMapping[i] = [i, i]
    }
    const schema = this.other.schema;

    delta.addChange = function(changeType, colIndex, variableName, value) {
        delta[changeType].push([changeType, variableName, schema[colIndex], value])
        delta.changes++
    }
    //Some kind of Internal index (not required to rebuild model)
    const internalIndexIndex = this.other.schemaIndexes.index;
    //parentId (should be renamed into ParentIDName,
    const parentIdIndex = this.other.schemaIndexes.parentId;
    delta.toString = function() {
        const diff = [
            delta.updates.map(function(el, id) {
                return el.join(";")
            }).join("\n"),
            delta.deletes.map(function(el, id) {
                return el.join(";")
            }).join("\n"),
            delta.inserts.map(function(el, id) {
                return el.join(";")
            }).join("\n")
        ]
        return JSON.stringify(delta.schema) + "\n" + diff.join("\n");
    }
    log.info('comparing both')
    /*
     * So we take the original as base index to test against
     * And extract atomic changes
     */
    const baseNames = this.one.getIndex('name')
    const otherNames = this.other.getIndex('name')

    //check inserts and updates
    for (var variableName in otherNames) {
        const baseRow = baseNames[variableName];
        const otherRow = otherNames[variableName];

        if (!baseRow) {
            //INSERT every property for the variable
            for (var otherRowSchemaIndex = 3; otherRowSchemaIndex < otherRow.length; otherRowSchemaIndex++) {
                const otherProperty = otherRow[schemaMapping[otherRowSchemaIndex][0]];
                if (otherRowSchemaIndex == parentIdIndex || otherRowSchemaIndex == internalIndexIndex || otherProperty == null || otherProperty == undefined) continue
                delta.addChange('inserts', schemaMapping[otherRowSchemaIndex][0], variableName, otherProperty)

            }
        } else {
            for (var otherRowSchemaIndex = 3; otherRowSchemaIndex < otherRow.length; otherRowSchemaIndex++) {
                if (otherRowSchemaIndex == parentIdIndex || otherRowSchemaIndex == internalIndexIndex) continue

                const baseProperty = baseRow[schemaMapping[otherRowSchemaIndex][0]];
                const otherProperty = otherRow[schemaMapping[otherRowSchemaIndex][1]];

                if ((baseProperty == null || baseProperty == undefined) && (otherProperty != null || otherProperty != undefined)) {
                    delta.addChange('inserts', schemaMapping[otherRowSchemaIndex][0], variableName, otherProperty)
                } else if (baseProperty != otherProperty && otherProperty != undefined && otherProperty != null && !Array.isArray(baseProperty)) {
                    delta.addChange('updates', schemaMapping[otherRowSchemaIndex][0], variableName, otherProperty)
                }
            }
        }
    }
    //check deletes
    for (var key in baseNames) {
        const baseRow = baseNames[key];
        const otherRow = otherNames[key];
        if (!otherRow) {
            for (var baseSchemaIndex = 3; baseSchemaIndex < baseRow.length; baseSchemaIndex++) {
                const baseProperty = baseRow[schemaMapping[baseSchemaIndex][1]];
                if (baseSchemaIndex == parentIdIndex || baseSchemaIndex == internalIndexIndex || baseProperty == null || baseProperty == undefined) continue
                delta.addChange('deletes', schemaMapping[baseSchemaIndex][1], key, null)
            }
        } else {
            for (var schemaIndex = 3; schemaIndex < baseRow.length; schemaIndex++) {
                const baseProperty = baseRow[schemaMapping[schemaIndex][0]];
                const otherProperty = otherRow[schemaMapping[schemaIndex][1]];
                if ((otherProperty == null || otherProperty == undefined) && (baseProperty != null || baseProperty != undefined)) {
                    delta.addChange('deletes', schemaMapping[schemaIndex][1], key, null)
                }
            }
        }
    }
    return delta;
}
exports.DeltaCompareRegister = DeltaCompareRegister