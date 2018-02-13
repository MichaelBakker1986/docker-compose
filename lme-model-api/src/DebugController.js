/**
 * DEBUG FUNCTIONALITY, deep dive- pilot
 */

/*$scope.breakpoints = []
fflEditor.fflEditor.on("guttermousedown", function(e) {
    var target = e.domEvent.target;
    if (target.className.indexOf("ace_gutter-cell") == -1)
        return;
    if (!fflEditor.fflEditor.isFocused())
        return;
    if (e.clientX > 25 + target.getBoundingClientRect().left)
        return;

    var row = e.getDocumentPosition().row;

    e.editor.session.setBreakpoint(row);
    $scope.$apply(function() {
        $scope.breakpoints = fflEditor.fflEditor.session.$breakpoints;
    })
    e.stop();
})

function doStep() {
    console.info(debugManager.getCurrentLine())
    edit.gotoLine(debugManager.getCurrentLine())
    debugManager.nextStep()
}

$scope.callDebug = function() {
    const breaks = $scope.breakpoints
    debugManager.initVariables(fflModel)
    for (var i = 0; i < breaks.length; i++) {
        var obj = breaks[i];
        if (obj) {
            changeManager.updateCursor(fflModel, {row: i, col: 0})
            var property = fflEditor.fflEditor.session.getLine(i).trim().split(':')[0].trim()
            property = property == 'formula' ? 'value' : property
        }
    }
    //once call is done, we reproduce the steps.
    debugManager.active = true;
    doStep()
}
/**
 * END DEBUG FUNCTIONALITY
 */
function DebugController($scope, $http) {
    this.$scope = $scope
}

module.exports = DebugController