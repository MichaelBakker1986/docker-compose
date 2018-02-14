/**
 * build docker image and publish to Registry
 */
function DockerImageBuilder(fflModel, story, matrix) {
    this.fflModel = fflModel
    this.story = story
    this.matrix = matrix
}

DockerImageBuilder.prototype.buildDockerImage = function() {
    console.info('Start build image')
}
module.exports = DockerImageBuilder