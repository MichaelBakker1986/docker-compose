var gitgraph = new GitGraph({
    template: "metro",
    orientation: "vertical",
    mode: "compact"
});

function correctFileName(name) {
    return name.replace(/^[^_]+_*([\w]*_\w+)$/gmi, '$1');
}

angular.module('angapp').controller('graphController', function($scope, $http) {
    $http.get('data').then(function(data) {
        console.info(data)
        var master = gitgraph.branch("master");
        master.commit({
            dotColor: "white",
            dotSize: 10,
            sha1: data.data.id,
            message: "main",
            dotStrokeWidth: 10,
            author: "michael.bakker@topicus.nl",
            onClick: function(commit) {
                $http.get('/id/' + commit.sha1 + '/data').then(function(data) {
                    for (var key in data.data.values) {
                        console.info(correctFileName(key))
                        let dataObject = data.data.values[key];
                        console.info(dataObject.value)
                        LME.nodes[correctFileName(key)].cols[parseInt(dataObject.colId)].value = dataObject.value
                    }
                });
            }
        });
        for (var key in data.data.parents) {
            // var newBranch = gitgraph.branch(key);
            master.commit({
                dotColor: "white",
                dotSize: 10,
                sha1: key,
                message: new Date(data.data.parents[key]),
                dotStrokeWidth: 10,
                author: "michael.bakker@topicus.nl",
                onClick: function(commit) {
                    $http.get('/id/' + commit.sha1 + '/data').then(function(data) {
                        for (var key in data.data.values) {
                            console.info(correctFileName(key))
                            let dataObject = data.data.values[key];
                            console.info(dataObject)
                            console.info(correctFileName(key) + ":" + (parseInt(dataObject.colId) - 2))
                            LME.nodes[correctFileName(key)].cols[parseInt(dataObject.colId) - 2].value = dataObject.value
                        }
                    });
                }
            })
        }
    });
});