var gitgraph = new GitGraph({
    template: "metro",
    orientation: "vertical",
    mode: "compact"
});

function correctFileName(name) {
    return name.replace(/^[^_]+_*([\w]*_\w+)$/gmi, '$1');
}

angular.module('angapp').controller('graphController', function($scope, $http, $rootScope) {

    var params = window.location.href.split('#')[1].split('&')
    let hash = params[1] || 'DEMO';
    $http.get('/id/' + hash + '/data').then(function(data) {
        console.info("GRAPH DATA: " + JSON.stringify(data))
        var master = gitgraph.branch("master");
        master.commit({
            dotColor: "white",
            dotSize: 10,
            sha1: data.data.id,
            message: new Date(data.data.create_date),
            dotStrokeWidth: 10,
            author: "michael.bakker@topicus.nl",
            message: {
                displayAuthor: true,
                displayBranch: false,
                displayHash: false,
                font: "normal 12pt Arial"
            },
            onClick: function(commit) {
                window.location.href = '#MVO&' + commit.sha1
                LMEMETA.loadData(function(response) {
                    $rootScope.$digest()
                })
            }
        });
        for (var key in data.data.parents) {
            // var newBranch = gitgraph.branch(key);
            master.commit({
                dotColor: "white",
                dotSize: 10,
                message: {
                    displayAuthor: true,
                    displayBranch: false,
                    displayHash: false,
                    font: "normal 12pt Arial"
                },
                sha1: key,
                message: new Date(data.data.parents[key]),
                dotStrokeWidth: 10,
                author: "michael.bakker@topicus.nl",
                onClick: function(commit) {
                    window.location.href = '#MVO&' + commit.sha1
                    LMEMETA.loadData(function(response) {
                        $rootScope.$digest()
                    })
                }
            })
        }
    });
});