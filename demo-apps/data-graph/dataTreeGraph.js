var gitgraph = new GitGraph({
    template: "metro",
    orientation: "vertical-reverse",
    mode: "compact"
});

function correctFileName(name) {
    return name.replace(/^[^_]+_*([\w]*_\w+)$/gmi, '$1');
}

angular.module('angapp').controller('graphController', function($scope, $http, $rootScope) {

    var params = window.location.href.split('#')[1].split('&')
    var model = params[0] || 'MVO';
    let hash = params[1] || 'DEMO';
    $http.get('/id/' + hash + '/data').then(function(data) {
        var master = gitgraph.branch("master");
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
                    window.location.href = '#' + model + '&' + commit.sha1
                    LMEMETA.loadData(function(response) {
                        $rootScope.$digest()
                    })
                }
            })
        }
    });
});