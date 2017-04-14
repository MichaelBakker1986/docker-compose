var FESFacade = require('../../fesjs/FESFacade');
var Visitor = require('../../clientscorecard/JSVisitor.js');
var AST = require('../../fesjs/AST.js');
var esprima = require('esprima')
var assert = require('assert')
var uimodel = require('../../clientscorecard/uimodel.js');


var excludes = {
    fin_test: true
}
function recurring(root, node, func)
{
    if (!node.exclusions && node.scope === 'compile')
    {
        var deps = node.deps;
        if (deps)
        {
            var dependencies = Object.keys(deps);
            for (var i = 0; i < dependencies.length; i++)
            {
                var obj = dependencies[i];
                recurring(root, root[obj], func);
            }
        }
        func(node);
    }
}
var arts = {};
function createArt(artifact)
{
    if (artifact.groupid === 'finan')
    {
        arts[artifact.artifactid] =
            arts[artifact.artifactid] || {
                groupid: artifact.groupid,
                artifactid: artifact.artifactid,
                scope: artifact.scope,
                version: artifact.version,
                exclude: !(artifact.exclusions === undefined),
                _parentKey: artifact._parentKey,
                deps: {}
            }
        if (artifact.dependencies)
        {
            artifact.dependencies.forEach(function (dep)
            {
                if (dep.scope !== 'test' && dep.groupid === 'finan')
                {
                    arts[artifact.artifactid].deps[dep.artifactid] = true
                }
            })
        }
    }
}
function createRecursive(solution, data)
{
    Visitor.travelOne(data, undefined, function (keyArg, childNode)
    {
        if (childNode.artifactid && childNode.artifactid.length > 1)
        {
            createArt(childNode);
        }
    })
    //very slow algorithm...
    for (var key1 in arts)
    {
        var art = arts[key1];
        console.info("2:" + art.artifactid);
        /*        recurring(arts, art, function (append)
         {
         if (art.artifactid !== append.artifactid)
         {
         art.deps[append.artifactid] = true;

         }
         });*/
        var allartifacts = '';
        for (var everyKey in art.deps)
        {
            allartifacts += "+" + "" + everyKey;
        }
        art.val = allartifacts.substring(1);
    }
    for (var key in arts)
    {
        var art2 = arts[key];
        addnode(solution, art2.artifactid, art2, art2._parentKey);
    }
}
var pomparser = {
    name: 'maven',
    extension: 'json',
    headername: 'Maven Files',
    parse: function (jsonpomfile)
    {
        var data = JSON.parse(jsonpomfile);
        var solution = uimodel.create(data.name || 'UNKNOWN');
        createRecursive(solution, data.group.finan);
        return solution;
    },
    deParse: function ()
    {
        return JSON.stringify({}, null, 2);
    }
};
function addnode(solution, rowId, node, parentId)
{
    if (solution.hasNode(rowId) || !rowId)
    {
        throw Error()
    }
    var uiNode;
    /*    if (node.referenceid)
     {
     uiNode = solution.createNode(rowId, 'value', undefined, "TextAnswerType");
     uiNode.referenceid = node.referenceid;
     }
     else
     {*/
    if (node.groupid === 'finan')
    {
        console.info(rowId + " : " + node.val)
    }
    uiNode = FESFacade.addSimpleLink(solution, rowId, 'value', node.val ? esprima.parse(node.val).body[0].expression : AST.UNDEFINED(), "TextAnswerType");
    /*  }*/
    solution.setDelegate(uiNode, node);
    solution.setParentName(uiNode, parentId);
    FESFacade.addSimpleLink(solution, rowId, 'title', AST.STRING(node.referenceid || rowId));
}
FESFacade.addParser(pomparser)