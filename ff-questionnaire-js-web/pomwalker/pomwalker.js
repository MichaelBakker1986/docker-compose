var walk = require('fs-walk');
var fs = require('fs');
var pomParser = require("pom-parser");
var sloc = require('sloc');
var assert = require('assert')
var logger = require('tracer').colorConsole({level: 'debug'});
var gitmap = "C:\\PACKAGE_DEAL"
/*
 Presumably the parent extension is useless.
 TODO: remove if so
 */
var destinationFile = './financials_maven.json';
var mavenfile = {
    name: 'finanfinancials',
    time: new Date(),
    group: {},
    artifacts: {}
};

function adeptName(name)
{
    return name.replace(/-|\./gmi, '_').toLowerCase();
}
function changeArtifactName(artifact)
{
    artifact.artifactid = adeptName(artifact.artifactid);
}
function testValue(version)
{
    if (version === undefined)
    {
        logger.error('assuming every artifact has a version number');
        throw Error('assuming every artifact has a version number')
    }
}
walk.walk(gitmap, function (basedir, filename, stat, next)
{
    //TODO: add more checks on .bin .settings .git /target etc..
    if (filename === 'pom.xml')
    {
        var fullPath = basedir + "\\" + filename;
        logger.debug('parse: [' + fullPath + ']');
        pomParser.parse({filePath: fullPath /* The path to a pom file */}, function (err, pomResponse)
        {
            if (!pomResponse)
            {
                logger.warn('Skip file: [' + fullPath + '] invalid pom.xml');
                return;
            }
            if (err)
            {
                logger.warn(err);
            }
            //get the project part
            var project = pomResponse.pomObject.project;
            //some project didnt define a groupId, they can only be used in finan content, so if no groupId it is finan
            var groupid = (project.groupid || 'finan').toLocaleLowerCase();
            //the version number:
            var version = project.version;
            testValue(version);
            //add the group to the mavenFile,distinct it by groupId
            var group = (mavenfile.group[groupid] = mavenfile.group[groupid] || {})
            //in the group, add the artifact
            // so we will have { finan : { aab-ear : { }, ff-ear: { } } }
            changeArtifactName(project);
            var projectArtifactId = project.artifactid
            var artifact = ( group[projectArtifactId] = group[projectArtifactId] || {artifactid: projectArtifactId, groupid: groupid, version: version});

            //either a artifact has dependencies, or modules
            //Combine this into dependencies, not going to distinct these two.
            //assuming either modules, or dependencies
            if (artifact.dependencies && artifact.modules)
            {
                logger.error('assuming either modules, or dependencies');
                throw Error('assuming either modules, or dependencies')
            }
            //in the artifact add the dependencies
            if (artifact.dependencies)
            {
                logger.error('expected to be null');
                throw Error('expected to be null');
            }
            if (project.dependencies)
            {
                //type it because after flatten there is not much to distinct the two types
                //only the version is here
                artifact.type = 'ARTIFACT';
                //artifact.version = project.version;
                artifact.dependencies = [];
                if (project.dependencies.dependency)
                {
                    //can be only one dependency
                    if (!Array.isArray(project.dependencies.dependency))
                    {
                        changeArtifactName(project.dependencies.dependency);
                        artifact.dependencies.push(project.dependencies.dependency)
                    }
                    else
                    {
                        project.dependencies.dependency.forEach(function (dep)
                        {
                            changeArtifactName(dep);
                            artifact.dependencies.push(dep)
                        });
                    }
                }
            }
            if (project.modules)
            {
                //type it because after flatten there is not much to distinct the two types
                //only the version is missing here
                artifact.type = 'MODULE';
                //    artifact.version = project.version;
                artifact.dependencies = [];
                //create a object for each module, so it looks like a dependency
                //easier parsing later on

                project.modules.module.forEach(function (module)
                {
                    var moduleDependency = {artifactid: module, scope: 'compile', groupid: 'finan', version: 'inherit'};
                    changeArtifactName(moduleDependency);
                    artifact.dependencies.push(moduleDependency);
                })
            }
        });
    }
    next();
}, function (err)
{
    if (err)
    {
        logger.error(err);
        return;
    }
    //write file to filesystem
    fs.writeFile(destinationFile, JSON.stringify(mavenfile, null, 2), 'utf-8', function (err)
    {
        if (err)
        {
            logger.error(err);
            return;
        }
        logger.info("Created file [" + destinationFile + "]");
    });

});

function getSloc()
{
    var stats = sloc(code, "coffee");
    for (i in sloc.keys)
    {
        var k = sloc.keys[i];
        console.log(k + " : " + stats[k]);
    }
}