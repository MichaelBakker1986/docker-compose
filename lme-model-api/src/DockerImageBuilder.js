/**
 * build docker image and publish to Registry
 */
const log = require('log6')

function DockerImageBuilder(fflModel, story, matrix) {
    this.fflModel = fflModel
    this.story = story
    this.matrix = matrix
}

DockerImageBuilder.prototype.buildDockerImage = function() {
    log.info('Start build image')
}
module.exports = DockerImageBuilder