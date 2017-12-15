/**
 * Backwards compatible decorator, until all unit-tests success it will serve to fix bugs.
 */
const SolutionFacade = require('../../src/SolutionFacade')
const FFLFormatter = require('../ffl2/FFLFormatter').Formatter
const Register = require('../ffl2/Register').Register

function SwaggerParser() {
}

const preview = {
    "type": "object",
    "properties": {
        "graph": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "year": {
                        "format": "int32",
                        "type": "integer"
                    },
                    "totalCosts": {
                        "format": "double",
                        "type": "number"
                    },
                    "allowance": {
                        "type": "object",
                        "properties": {
                            "childBenefit": {
                                "format": "double",
                                "type": "number"
                            },
                            "childcareAllowance": {
                                "format": "double",
                                "type": "number"
                            },
                            "combinationDiscount": {
                                "format": "double",
                                "type": "number"
                            },
                            "childRelatedBudget": {
                                "format": "double",
                                "type": "number"
                            }
                        }
                    },
                    "totalYearlyCosts": {
                        "format": "double",
                        "type": "number"
                    },
                    "totalMonthlyCosts": {
                        "format": "double",
                        "type": "number"
                    },
                    "totalMonthlySavings": {
                        "format": "double",
                        "type": "number"
                    }
                }
            }
        }
    }
}

SwaggerParser.prototype.name = 'swagger'
SwaggerParser.prototype.status = 'green';
SwaggerParser.prototype.headername = '.swagger';

SwaggerParser.prototype.deParse = function(rowId, workbook) {
    const register = workbook.indexer;
    const startnode = register.getIndex('name')[rowId]
    const nameIndex = register.schemaIndexes.name;
    const childrenIndex = register.schemaIndexes.children;
    const datatypeIndex = register.schemaIndexes.datatype;
    const parentIdIndex = register.schemaIndexes.parentId;
    const variables = {}
    const names = register.getIndex('i')
    register.walk(startnode, 0, function(node, depth) {
        const nodeName = node[nameIndex];
        const currentNode = {
            type: node[childrenIndex].length > 0 ? "object" : (node[datatypeIndex] || 'string'),
            description: workbook.get(nodeName, 'title')
        }
        variables[nodeName] = currentNode
        if (currentNode.type == 'object') currentNode.properties = {}
    })
    register.walk(startnode, 0, function(node, depth) {
        if (node[parentIdIndex]) {
            const variable = variables[node[nameIndex]];
            const parent = variables[names[node[parentIdIndex]][nameIndex]];
            if (parent) parent.properties[node[nameIndex]] = variable
        }
    })
    return variables[rowId];
}
SwaggerParser.prototype.parseData = function(data, workbook) {
    throw new Error('There is no support to convert swagger into lme yet.')
}
exports.RegisterPlainFFLToLMEParser = SwaggerParser;
SolutionFacade.addParser(SwaggerParser.prototype);