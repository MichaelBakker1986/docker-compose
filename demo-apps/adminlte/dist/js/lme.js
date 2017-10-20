//create an angular application
function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function() {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

angular.module('angapp', []).controller('kspController', function($scope) {
    var url = window.location.href.split("/")
    var result = url[0] + "//" + url[2].split(':')[0]
    let url2 = result + ':8080/DEMO/transformFFL_LME/KSP';
    console.info(url2)
    loadScript(url2, function() {
        var tree = LME.exportWebModel();
        console.info(tree)
        $scope.$apply(function() {
            for (var k in tree.nodes) {
                $scope[k] = tree.nodes[k];
            }
        });
    });
});