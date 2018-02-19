/**
 build docker image and publish to Registry
 #docker build . -f LMERestAPIBuilder -t=nexus.topicusfinance.nl:8444/model_name:version
 #docker push nexus.topicusfinance.nl:8444/ksp:1.1
 #sudo docker run -p 80:7081 nexus.topicusfinance.nl:8444/ksp:0.3
 #should only include the generated model.js from the generator instead of
 # -- but for now we include all to make the docker-image file work
 #http://blfyn-dv-doc01.finance.lab
 # - lme-core
 # - math
 # - ast-node-utils
 # - formulajs
 # - excel-connect
 # nexus.topicusfinance.nl:8444
 **/

//#browserify -o ./bundle.js --bare --node --standalone=test --dg false ../devrun.js -i fsevents -i thread-sleep -i tweetnacl -i jsbn -i ecc-jsbn -i bcrypt-pbkdf -i ecc-jsbn/lib/ec
//#browserify -o ./bundle.js --bare --node --standalone=test --dg false ../lme-data-api/lme-data-app.js

//const log = require('log6')
//const exec = require('child-process-promise').exec;
const params = process.env.MODEL || 'MVO'
const path = require('path')

function DockerImageBuilder(fflModel, story, matrix, model_name) {
    this.fflModel = fflModel
    this.story = story
    this.matrix = matrix
    this.model_name = model_name
}
//browserify --output bundle.js --bare --dg false input.js.
/*const compile = require('nexe')*/
/*compile.compile({
    input : 'C:/Users/mbakk/Documents/fesjs/lme-model-api/lme.js',
    python: 'C:/Users/mbakk/Documents/python/python.exe',
    /!*target: 'linux-x64',*!/
    build : true   //required to use patches
    /!* patches: [
         async (compiler, next) => {
             await compiler.setFileContentsAsync(
                 'lib/new-native-module.js',
                 'module.exports = 42'
             )
             return next()
         }
     ]*!/
}).then(() => {
    console.log('success')
})*/

DockerImageBuilder.prototype.buildDockerImage = function() {
    console.info('Start build image')
    /*log.info('Start build image')
    const command = 'cd .. && docker build . -f LMERestAPIBuilder -t=' + this.model_name + ':0.002'
    exec(command).then((resp) => {
        if (resp.stderr.length > 0) return log.error('failed to create docker image ', resp.stderr)
        log.info(resp.stdout)
    })*/
}
//new DockerImageBuilder(null, null, null, 'prescan').buildDockerImage()
module.exports = DockerImageBuilder