global.loglevel = 'info'

var madge = require('madge');
var graphviz = require('graphviz');
var log = require('ff-log')
var path = require('path')
var walkAst = require('../../ast-node-utils').astWalk
var fs = require('fs');
var esprima = require('esprima');
var escodegen = require('escodegen');
var includemethodcalls = true;
var moduleName = 'ff-fes';
var workingpath = '../../';
var workingFile = 'ff-fes.js'

function MetaDataFinder() {
    var graph = graphviz.digraph("G ");
    graph.set("rankdir", "LR");
    this.graph = graph;
    this.declaredFunctions = {};
}
//get serviceNames
//get functionNames
function findCallees(info, functionName, ast) {
    walkAst(function (info, node) {
        if (node && node.type === 'CallExpression') {
            var callName = node.callee.property ? node.callee.property.name : node.callee.name
            log.debug('function [%s] has [%s]', functionName, callName)
            info.refs[callName] = true;
        }
    }, info, undefined, ast);
}
MetaDataFinder.prototype.findDeclaredFunctions = function (info, filename, ast) {
    var currentFunction;
    walkAst(function (info, node) {
        //find all functions in file
        //there are two types,  FunctionDeclaration and FunctionExpression
        if (node.type === 'FunctionDeclaration') {
            log.debug('found function: [%s] [%s]', info.fileName, node.id.name)
            var currentFunction = //info.fileName + '.' +
                node.id.name;
            info.foundFunctions[currentFunction] = info.foundFunctions[currentFunction] || {
                    fileName: {},
                    name: currentFunction,
                    refs: {}
                };
            info.foundFunctions[currentFunction].fileName[filename] = true
            findCallees(info.foundFunctions[currentFunction], currentFunction, node)
            currentFunction = node.id.name;
        } else if (node.type == 'AssignmentExpression' && node.right.type == 'FunctionExpression' && node.left.property) {
            log.debug('found function: [%s] [%s]', info.fileName, node.left.property.name)
            currentFunction = //info.fileName + '.' +
                node.left.property.name;
            info.foundFunctions[currentFunction] = info.foundFunctions[currentFunction] || {
                    fileName: {},
                    name: currentFunction,
                    refs: {}
                };
            info.foundFunctions[currentFunction].fileName[filename] = true
            findCallees(info.foundFunctions[currentFunction], currentFunction, node)
        }
    }, info, undefined, ast)
}
MetaDataFinder.prototype.programmFile = function (programMetadata, fileName, calleObject) {
    try {
        var start = this.graph.addNode(fileName)
        var source = fs.readFileSync(workingpath + moduleName + '/' + fileName + '.js', 'utf-8')
        var ast = esprima.parse(source)
        //we should find all inner FunctionDeclaration objects within functions
        var functionMetaData = {
            fileName: fileName,
            callees: []
        };
        this.findDeclaredFunctions(programMetadata, fileName, ast);
        var currentFunction = '';
        for (var dep in calleObject) {
            var metaData = {
                callees: {},
                servicename: path.basename(calleObject[dep], '.js'),
                name: fileName
            };
            walkAst(function (info, node) {
                //find all functions in file
                //there are two types,  FunctionDeclaration and FunctionExpression
                if (node.type === 'FunctionDeclaration') {
                    log.debug('found function: [%s] [%s]', fileName, node.id.name)
                    currentFunction = node.id.name;
                } else if (node.type == 'AssignmentExpression' && node.right.type == 'FunctionExpression') {
                    log.debug('found function: [%s] [%s]', fileName, node.left.property.name)
                    currentFunction = node.left.property.name;
                }
                if (node && node.type === 'MemberExpression') {
                    if (node.object.name === info.servicename) {
                        info.callees[node.property.name] = true
                        log.debug('found reference [%s.%s : %s.%s]', info.name, currentFunction, node.object.name, node.property.name)
                    }
                }
            }, metaData, undefined, ast)
            var edge = this.graph.addEdge(start, calleObject[dep])
            if (includemethodcalls) {
                edge.set('label', Object.keys(metaData.callees).toString().replace(/,/gmi, '\\n'));
            }
        }
    } catch (err) {
        log.warn(err)
    }
}
MetaDataFinder.prototype.makeGraphiz = function () {
    return this.graph.to_dot();
}
function sequenceIterator(sequences, sequence, chain, depth) {
    if (depth > 10) {
        return;
    }
    var fileName = Object.keys(sequence.fileName)[0]
    for (var key in sequence.refs) {
        if (key === 'trim' || key === 'size' || key === 'startsWith' || key === 'lookup' || key === 'visitInternal' || key === 'stringify' || key === 'buildFormula' || key === 'extractBaseChildren' || key === 'nestRecursive') {
            continue;
        }
        if (sequences[key]) {
            var otherfileName = Object.keys(sequences[key].fileName)[0]
            console.info('%s->%s:%s', fileName.replace("-", "_"), otherfileName, key)
            sequenceIterator(sequences, sequences[key], chain, depth + 1)
        }
    }
}
MetaDataFinder.prototype.makeSequences = function () {
    var foundFunctions = this.sequences.foundFunctions;
    for (functionDescriptionName in foundFunctions) {

        var functionDescription = foundFunctions[functionDescriptionName];
        if (functionDescription.fileName[path.basename(workingFile, '.js')]) {
            log.info('[%s]:[%s]', functionDescriptionName, JSON.stringify(functionDescription))
            sequenceIterator(foundFunctions, functionDescription, {}, 0)
        }
    }
}
/**
 * creation parameters
 */
//madge('../../' + moduleName + '/ff-fes.js', {
madge(workingpath + '/' + moduleName + '/' + workingFile, {
    excludeRegExp: ['Tree$', 'Node$', 'JSVisitor$', 'CustomImport'],
    fileExtensions: ['js']
}).then(function (res) {
    var metaDataFinder = new MetaDataFinder();
    var programDependencies = res.obj();
    var programMetadata = {
        foundFunctions: {}
    };
    metaDataFinder.sequences = programMetadata;
    for (var dependencyName in programDependencies) {
        metaDataFinder.programmFile(programMetadata, dependencyName, programDependencies[dependencyName]);
    }
    var sequenceDiagrms = metaDataFinder.makeSequences();
    var graphizIml = metaDataFinder.makeGraphiz();
    var outputPath = '../resources/' + moduleName + '.txt';
    fs.writeFile(outputPath, graphizIml, function (res) {
        log.info('Done filepath [%s]', outputPath)
    })
}).catch(function (err) {
    log.error(err)
});
/**
 Andrew->China: Says Hello
 Note right of China: China thinks\nabout it
 China-->Andrew: How are you?
 Andrew->>China: I am good thanks!
 **/