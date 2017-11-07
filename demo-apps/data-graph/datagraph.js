//const GitGraph = require('gitgraph.js')
var gitgraph = new GitGraph({
    template: "metro",
    orientation: "vertical-reverse",
    mode: "extended"
});
var master = gitgraph.branch("master");
gitgraph.commit({
    dotColor: "white",
    dotSize: 10,
    message: "DEMO1",
    dotStrokeWidth: 10
}).commit({
    dotColor: "white",
    dotSize: 10,
    dotStrokeWidth: 10
}).commit({
    dotColor: "white",
    dotSize: 10,
    dotStrokeWidth: 10
});
var develop = gitgraph.branch("develop");    // New branch from HEAD
master.commit("This commit is mine");
// Well, if you need to go deeper…
develop.commit({
    dotColor: "white",
    dotSize: 10,
    dotStrokeWidth: 10,
    sha1: "666",
    message: "version3'",
    author: "Michael.bakker@topicus.nl",
    onClick: function(commit) {
        alert("Oh, you clicked my commit?!" + commit);
    }
});