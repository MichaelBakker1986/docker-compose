"use strict";

var cov_21crtg8goz = function () {
    var path = "C:\\Users\\michael\\Documents\\lme\\lme-model-api\\src\\DebugController.js",
        hash = "313a501c08a26aadcb3dec95a32bcf43a15291a2",
        Function = function () {}.constructor,
        global = new Function('return this')(),
        gcv = "__coverage__",
        coverageData = {
        path: "C:\\Users\\michael\\Documents\\lme\\lme-model-api\\src\\DebugController.js",
        statementMap: {
            "0": {
                start: {
                    line: 48,
                    column: 4
                },
                end: {
                    line: 48,
                    column: 24
                }
            },
            "1": {
                start: {
                    line: 51,
                    column: 0
                },
                end: {
                    line: 51,
                    column: 32
                }
            }
        },
        fnMap: {
            "0": {
                name: "DebugController",
                decl: {
                    start: {
                        line: 47,
                        column: 9
                    },
                    end: {
                        line: 47,
                        column: 24
                    }
                },
                loc: {
                    start: {
                        line: 47,
                        column: 40
                    },
                    end: {
                        line: 49,
                        column: 1
                    }
                },
                line: 47
            }
        },
        branchMap: {},
        s: {
            "0": 0,
            "1": 0
        },
        f: {
            "0": 0
        },
        b: {},
        _coverageSchema: "d34fc3e6b8297bcde183f5492bcb8fcb36775295"
    },
        coverage = global[gcv] || (global[gcv] = {});

    if (coverage[path] && coverage[path].hash === hash) {
        return coverage[path];
    }

    coverageData.hash = hash;
    return coverage[path] = coverageData;
}();

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
    cov_21crtg8goz.f[0]++;
    cov_21crtg8goz.s[0]++;

    this.$scope = $scope;
}

cov_21crtg8goz.s[1]++;
module.exports = DebugController;