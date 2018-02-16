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
const log = require('log6')
const exec = require('child-process-promise').exec;
const params = process.env.MODEL || 'MVO'
const path = require('path')

function DockerImageBuilder(fflModel, story, matrix, model_name) {
    this.fflModel = fflModel
    this.story = story
    this.matrix = matrix
    this.model_name = model_name
}

DockerImageBuilder.prototype.buildDockerImage = function() {
    log.info('Start build image')
    const command = 'cd .. && docker build . -f LMERestAPIBuilder -t=' + this.model_name + ':0.002'
    exec(command).then((resp) => {
        if (resp.stderr.length > 0) return log.error('failed to create docker image ', resp.stderr)
        log.info(resp.stdout)
        exec('')
    })
}
//new DockerImageBuilder(null, null, null, 'prescan').buildDockerImage()

module.exports = DockerImageBuilder