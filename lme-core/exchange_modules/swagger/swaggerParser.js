/**
 * Backwards compatible decorator, until all unit-tests success it will serve to fix bugs.
 */
const SolutionFacade = require('../../src/SolutionFacade')

function SwaggerParser() {
}

SwaggerParser.prototype.name = 'swagger'
SwaggerParser.prototype.status = 'green';
SwaggerParser.prototype.headername = '.swagger';

SwaggerParser.prototype.parseInput = function(metaData, workbook) {
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
        if (type == 'input' && workbook.get(nodeName, 'locked') && node[childrenIndex].length == 0) {
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
SwaggerParser.prototype.deParse = function(metaData, workbook) {
    const rowId = metaData.rowId
    const type = metaData.type
    if (type == 'output') return this.parseInput(metaData, workbook)
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
        if (type == 'input' && workbook.get(nodeName, 'locked') && node[childrenIndex].length == 0) {
            return;
        }
        let nodeType = 'string';
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