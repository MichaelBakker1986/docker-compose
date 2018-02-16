/**
 * Backwards compatible decorator, until all unit-tests success it will serve to fix bugs.
 */
const SolutionFacade = require('../../src/SolutionFacade')
const log = require('log6')

function SwaggerParser() {
}

SwaggerParser.prototype.name = 'swagger'
SwaggerParser.prototype.headername = '.swagger';

SwaggerParser.prototype.deParse = function(metaData, workbook) {
    if (metaData.type == 'output') return this.parseInput(metaData, workbook);
    else if (metaData.type == 'input') return this.parseOutput(metaData, workbook)
    else throw Error('Error while parsing Swagger. Invalid conversion type valid types: input|output')
}
SwaggerParser.prototype.parseInput = function(metaData, workbook) {
    const rowId = metaData.rowId
    const type = metaData.type


    const indexer = workbook.indexer;
    const register = indexer.getIndex('name');
    const startnode = indexer.getIndex('name')[rowId]
    const nameIndex = indexer.schemaIndexes.name;
    const childrenIndex = indexer.schemaIndexes.children;
    const frequencyIndex = indexer.schemaIndexes.frequency;
    const datatypeIndex = indexer.schemaIndexes.datatype;
    const parentIdIndex = indexer.schemaIndexes.parentId;
    const referstoIndex = indexer.schemaIndexes.refersto;
    const variables = {}
    const names = indexer.getIndex('i')
    let firstArray = true;


    //TODO: copy-paste from RegisterToLMEParser...
    //only inherit properties once.
    const inherited = {}
    //INFO: inheritance could also be possible via database
    //TODO: copy-paste from RegisterToLMEParser...
    function inheritProperties(node) {
        if (!inherited[node[nameIndex]] && node[referstoIndex]) {
            inherited[node[nameIndex]] = true
            const supertype = register[node[referstoIndex]]
            if (supertype == null) {
                if (log.DEBUG) log.debug('RefersTo: [' + node[referstoIndex] + '] is declared in the model but does not exsists');
            }
            //first inherit from parents of parents.
            if (supertype[referstoIndex]) inheritProperties(supertype)
            for (var i = 0; i < supertype.length; i++) {
                if (node[i] == null) node[i] = supertype[i];
            }
        }
    }

    indexer.walk(startnode, 0, function(node, depth) {
        const nodeName = node[nameIndex];
        inheritProperties(node)

        const hasChildren = node[childrenIndex].length == 0;
        if (workbook.get(nodeName, 'locked') && !hasChildren) {
            return;
        }
        let nodeType = 'number';
        const currentNode = {
            type: nodeType,
            description: workbook.get(nodeName, 'title')
        }
        let choices;
        if (node[childrenIndex].length > 0) {
            currentNode.type = "object"
        } else if (choices = workbook.get(nodeName, 'choices')) {
            currentNode.enum = []
            for (var i = 0; i < choices.length; i++) {
                var obj = choices[i];
                currentNode.enum.push(obj.value)
            }
        } else {
            if (node[datatypeIndex]) {
                currentNode.type = (node[datatypeIndex])
            } else {
                currentNode.type = 'string'
            }
        }
        variables[nodeName] = currentNode
        if (currentNode.type == 'object') currentNode.properties = {}
        if (currentNode.type == 'number') currentNode.format = "double"

        if (currentNode.type != 'object') {
            currentNode.properties = {}
            for (var type in workbook.properties) {
                if (type.startsWith("_")) continue
                currentNode.properties[type] = {
                    "type": type == 'title' ? 'string' : "boolean"
                }
            }
            currentNode.properties.value = {
                "type": currentNode.type
            }
            if (currentNode.type == 'number') currentNode.properties.value.format = "double"

            currentNode.type = 'object'

            delete currentNode.format
        }
        if (node[frequencyIndex] == 'column' && firstArray) {
            firstArray = false;
            currentNode.type = 'array'
            currentNode.items = {
                properties: currentNode.properties
            }
            delete  currentNode.properties
        }
    })
    indexer.walk(startnode, 0, function(node, depth) {
        if (node[parentIdIndex]) {
            const variable = variables[node[nameIndex]];
            const parent = variables[names[node[parentIdIndex]][nameIndex]];
            if (parent) {
                if (parent.type == 'array') {
                    parent.items.properties[node[nameIndex]] = variable
                } else {
                    parent.properties[node[nameIndex]] = variable
                }
            }
        }
    })
    return variables[rowId];
}
SwaggerParser.prototype.parseOutput = function(metaData, workbook) {
    const rowId = metaData.rowId
    const type = metaData.type
    const register = workbook.indexer;
    const startnode = register.getIndex('name')[rowId]
    const nameIndex = register.schemaIndexes.name;
    const childrenIndex = register.schemaIndexes.children;
    const frequencyIndex = register.schemaIndexes.frequency;
    const datatypeIndex = register.schemaIndexes.datatype;
    const parentIdIndex = register.schemaIndexes.parentId;
    const variables = {}
    const names = register.getIndex('i')
    let firstArray = true;
    register.walk(startnode, 0, function(node, depth) {
        const nodeName = node[nameIndex];
        let nodeType = 'number';
        const currentNode = {
            type: nodeType,
            description: workbook.get(nodeName, 'title')
        }
        let choices;
        if (node[childrenIndex].length > 0) {
            currentNode.type = "object"
        } else if (choices = workbook.get(nodeName, 'choices')) {
            currentNode.enum = []
            for (var i = 0; i < choices.length; i++) {
                var obj = choices[i];
                currentNode.enum.push(obj.value)
            }
        } else {
            if (node[datatypeIndex]) {
                currentNode.type = (node[datatypeIndex])
            } else {
                currentNode.type = 'number'
            }
        }
        variables[nodeName] = currentNode
        if (currentNode.type == 'object') currentNode.properties = {}
        if (currentNode.type == 'number') currentNode.format = "double"
    })
    register.walk(startnode, 0, function(node, depth) {
        if (node[parentIdIndex]) {
            const variable = variables[node[nameIndex]];
            const parent = variables[names[node[parentIdIndex]][nameIndex]];
            if (parent) {
                if (parent.type == 'array') {
                    parent.items.properties[node[nameIndex]] = variable
                } else {
                    parent.properties[node[nameIndex]] = variable
                }
            }
        }
    })
    return variables[rowId];
}
SwaggerParser.prototype.parseData = function(data, workbook) {
    throw new Error('There is no support to convert swagger into lme yet.')
}
exports.RegisterPlainFFLToLMEParser = SwaggerParser;
SolutionFacade.addParser(SwaggerParser.prototype);