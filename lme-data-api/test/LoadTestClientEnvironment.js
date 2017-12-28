XMLHttpRequest = require("xhr2").XMLHttpRequest;
var uuid = require('uuid4')
var modelName = process.argv[2] || 'MVO';
var story = process.argv[3] || __dirname + '/../../model-tests/MVO/mvo.story';
/**
 * We need to mock a window environment to get end-point information.
 * TODO: think of a better way to do this.
 */
window = {
    location: {
        href: "http://10.0.75.1:8083/id/DEMO/grid_example.html#" + modelName + "&" + uuid()
        //href: "http://10.146.2.87:8083/id/DEMO/grid_example.html#" + modelName + "&" + uuid()
    }
}
let MvoStory = require('../../model-tests/MVO/MVOStoryParserTest').MVOStory;
new MvoStory(story).startTest()
LMEMETA.urlPrefix = 'http://127.0.0.1:8085'
//LMEMETA.urlPrefix = 'http://10.146.2.87:8085'
LMEMETA.persistData(function(done) {
    LMEMETA.persistData(function(done) {
        LMEMETA.loadData(function(done) {
            console.info('Done:' + done)
        });
    });
});