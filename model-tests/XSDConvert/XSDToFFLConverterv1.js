const Xsd2JsonSchema = require('xsd2jsonschema').Xsd2JsonSchema;
const BaseConvertionVisitor = require('xsd2jsonschema').BaseConvertionVisitor;
const BaseConverter = require('xsd2jsonschema/src/baseConverter');
const jsVisit = require('../../lme-core/src/JSVisitor')
const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
const RegisterToFFL = require('../../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL
const XSDRegister = new Register();
var baseConverter = new BaseConverter()
var x = new BaseConvertionVisitor(baseConverter);


const converter = new Xsd2JsonSchema({
    baseId: "#",
    xsdBaseDir: __dirname,
    visitor: x
});
var walkSync = function(dir, filelist, mask) {
    if (dir[dir.length - 1] != '/') dir = dir.concat('/')
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory())
            filelist = walkSync(dir + file + '/', filelist, mask);
        else if (mask.test(file.toString())) filelist.push(dir + file);
    });
    return filelist;
};
const xsdFilenames = [];
walkSync('.', xsdFilenames, new RegExp("\.xsd$", 'i'))
baseConverter.annotation = function(a, b, c) {
    return true;
}
converter.processAllSchemas({
    xsdFilenames: xsdFilenames
});
/**
 * Skip the write/read from disk, directly use JSON objects to re-use
 */
converter.getObjects = function() {
    const objects = [];
    Object.keys(this.jsonSchemas).forEach(function(uri, index, array) {
        objects.push(this.jsonSchemas[uri].getJsonSchema())
    }, this);
    return objects;
}
const array = converter.getObjects();

function createObject(obj) {
    const newobj = {}
    for (var key in obj) {
        newobj[key] = obj[key]
    }
    return newobj;
}

function inherit(obj, other) {
    const newobj = {}
    for (var key in obj) {
        newobj[key] = obj[key]
    }
    for (var key in other) {
        newobj[key] = other[key]
    }
    return newobj;
}

var jw = require('json-walker');
const variables = {}
//TODO: first extract all types,
//DataTypes are used as array/tuple
//The oneOf/allOf/anyOf are implementations and should be defined 2nd iteration
for (var i = 0; i < array.length; i++) {
    var jsonObj = array[i];
    jsVisit.travelOne(jsonObj, null, function(key, node, ctx) {
        if (key == null) return
        const realkey = key.replace(/tns:|colcom:|xsd:|comres:|pay:|colcov:|colobj:|colreg:|coladr:|met:|lgdcon:|facprod:|facrat:|facfac:|facrep:|facwith:|comens:|comdat:/, '');
        if (realkey == 'FacilityInputContainer')
            console.info('')
        if (node.allOf) {
            //skipping inherited properties
            if (!variables[realkey])
                variables[realkey] = inherit(node.allOf[0], node.allOf[1]);
        } else if (node.oneOf) {
            variables[realkey] = node.oneOf[1];
        } else if (node.type == 'string' || node.type == 'integer' || node.type == 'number' || node.type == 'object') {
            variables[realkey] = node;
        } else if (node.$ref) {
            //TODO: countryDetails...
            /*if (!variables[realkey])
                variables[realkey] = node;*/
        }
        else {
            if (key !== 'required' && key !== 'anyOf' && key !== 'properties' && key !== 'allOf' && key !== 'oneOf' && key !== 'enum' && key !== 'items')
                ;
        }
    })
}

function extractName(ref) {
    const split = ref.split('/');
    const split2 = split[split.length - 1].split(':');
    const reference = variables[split2[split2.length - 1]];
    return reference;
}

for (var node in variables) {
    const ref = variables[node].$ref;
    if (ref) {
        let reference = extractName(ref);
        if (reference) {
            if (reference.$ref) {//there is one type double inheritance.. MultiCurrencyNonNegative..
                reference = extractName(reference.$ref);
            }
            variables[node] = reference
        }
    } else if (variables[node].type == 'array') {
        const ref = variables[node].items.$ref;
        variables[node].items = createObject(extractName(ref))
        variables[node].items.variableType = 'tuple'
    }
}
//first attach all references.
for (var node in variables) {
    const properties = variables[node].properties;
    if (properties) {
        for (var child in properties) {
            if (['_parent', 'undefined', '_parentKey'].indexOf(child) !== -1) {
                delete properties[child];
                continue;
            } else if (!properties[child]) {
            } else if (properties[child].$ref) {
                properties[child] = extractName(properties[child].$ref)
            }
            else if (properties[child].oneOf) {
            } else {
            }
        }
    }
}
for (var node in variables) {
    delete variables[node]._parent
    delete variables[node]._parentKey
}

function keys(obj) {
    if (!obj) return [];
    return Object.keys(obj)
}

XSDRegister.addColumn('displaytype')
XSDRegister.addColumn('datatype')
XSDRegister.addColumn('title')
XSDRegister.addColumn('frequency')
XSDRegister.addColumn('maxlength')
XSDRegister.addColumn('pattern')
XSDRegister.addColumn('minimum')
XSDRegister.addColumn('maximum')
XSDRegister.addColumn('choices')

//identify all variables
for (var node in variables) {
    const variable = variables[node];
    let type = variable.type;
    if (type == 'object') {
        const index = XSDRegister.addRow([variable, 0, 0, node, null, null, null, false, null, null, [], 'none', null, '"' + node + '"', 'document', null, null, null, null, null])
    } else if (type == 'string' || type == 'integer' || type == 'number') {
        if (variable.enum) type = 'select'
        if (variable.enum) {
            console.info(node)
        }
        const index = XSDRegister.addRow([variable, 0, 0, node, null, null, null, false, null, null, [], type, type, '"' + node + '"', 'document', variable.maxLength, variable.pattern, variable.minimum, variable.maximum, variable.enum])
    } else if (type == 'array') {//tuple
        const index = XSDRegister.addRow([variable, 0, 0, node, null, null, null, true, null, null, [], 'none', 'string', '"' + node + '"', 'document', null, null, null, null, null])
    } else {
        //throw Error('All supported types should be mapped ')
    }
}
//attach all parent-child relations
const names = XSDRegister.getIndex('name')
const tupleIndex = XSDRegister.schemaIndexes.tuple;
const childIndex = XSDRegister.schemaIndexes.children;
const rawDataIndex = XSDRegister.schemaIndexes.desc;
for (var node in names) {
    let children;
    if (names[node][tupleIndex]) {
        children = names[node][rawDataIndex].items.properties
    }
    else {
        children = names[node][rawDataIndex].properties
    }
    for (var child in children) {
        //if (!names[child]) throw Error('must be something')
        //TODO: temp fix to make total work
        if (names[child])
            names[node][childIndex].push(names[child])
    }
}

const fflInput = new RegisterToFFL(XSDRegister).toGeneratedFFL('LGDCalculationInputContainer', 'LGD').join('\n');
console.info(fflInput)
const fflOutput = new RegisterToFFL(XSDRegister).toGeneratedFFL('LGDCalculationOutputContainer', 'LGD').join('\n');
console.info(fflOutput)
require('fs').writeFileSync('./LGD.ffl', 'model LGD uses BaseModel \n{\n root\n {\n  variable Q_ROOT\n   {\n   displaytype:scorecard;\n' + fflInput + '\n' + fflOutput + '\n  }\n }\n}')
