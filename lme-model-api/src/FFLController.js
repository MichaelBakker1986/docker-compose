//just an dummy-template to quickly create a model
const newModelTemplate = "model $1 uses BaseModel\n" +
    "{\n" +
    " version: \"1.0\";\n" +
    " root\n" +
    " {\n" +
    "  variable Q_ROOT\n" +
    "  {\n" +
    "   title: \"Stap 1\";\n" +
    "   displaytype: scorecard;\n" +
    "   variable Q_MAP01\n" +
    "   {\n" +
    "    title: \"Stap 1\";\n" +
    "    hint: \"Informatie over de stap\";\n" +
    "    variable Q_MAP01_VRAAG0\n" +
    "    {\n" +
    "     title: \"TestVraag\";\n" +
    "     frequency: document;\n" +
    "     datatype: number;\n" +
    "     formula: 100+100;\n" +
    "    }\n" +
    "   }\n" +
    "  }\n" +
    " }\n" +
    "}"

const EconomicEditorView = require('../../model-tests/EconomicEditorView').EconomicEditorView
const FFLFormatter = require('../../lme-core/exchange_modules/ffl/FFLFormatter').Formatter
const ScorecardTool = require('../../lme-core/exchange_modules/ffl/ScorecardTool').ScorecardTool

function FFLController($scope, $http, fflEditor, user_session, changeManager, register) {
    this.$scope = $scope
    this.$http = $http
    this.fflEditor = fflEditor;
    this.user_session = user_session;
    this.changeManager = changeManager;

    $.getScript('engineonly.js', function(data, textStatus, jqxhr) {
        $.get("resources/" + user_session.fflModelPath + ".ffl", function(data, status, xhr) {
            fflEditor.setValue(data)
            $scope.reloadFFL()
            //Also tell the auto-complete manager to initiate
            changeManager.updateCursor(fflEditor.getValue(), 0);
        }).fail(function(err) {
            console.error(err)
        })

    }).fail(function() {
        if (arguments[0].readyState == 0) {
            console.info('Failed to load')
            //script failed to load
        } else {
            //script loaded but failed to parse
            console.info('Error while loading modeldata: resources/' + user_session.fflModelPath + '.js' + ":[" + arguments[2].toString() + ']')
        }
    })
    fflEditor.aceEditor.on("mousedown", function() {
        $scope.changeView('FFLModelEditorView')
    });
    $scope.reloadFFL = function() {
        //Hello engine-only
        LMEMETA.importFFL(fflEditor.getValue())
        LME = LMEMETA.exportWebModel()
        $scope.LME_MODEL = LME.nodes
        $scope.name = LME.name
        $scope.LMEMETA = LMEMETA;

        LMEMETA.loadData(function(response) {
            $scope.$digest()
        })
    }
    $(".data-toggle-ide").click(function(e) {
        $scope.changeView('FFLModelEditorView')
    });
    $scope.saveFFLModel = function() {
        const type = '.ffl';
        Pace.track(function() {
            $scope.saveFeedback = "Customizing " + $scope.session.fflModelPath + "… "
            $scope.saveFeedbackTitle = "Working on it... ";
            var data = fflEditor.getValue()
            $.post("saveFFLModel/" + $scope.session.fflModelPath, {
                data: data,
                type: type
            }, function(data) {
                $scope.$apply(function() {
                    $scope.saveFeedbackTitle = "Finished"
                    $scope.saveFeedback = data.status == 'fail' ? 'Failed compiling model:' + data.reason : 'Done work.'
                    $scope.downloadJsLink = 'resources/' + $scope.session.fflModelPath + '.js'
                    $scope.session.disablePreviewButton = false;
                    if (data.status == 'success') {
                        window.open($scope.session.page + '.html#' + $scope.session.fflModelPath + '&' + userID)
                        $('#modal-success').modal('hide')
                    }
                })
            });
        });
    }
    $scope.toggleFormatter = function() {
        const cursor = fflEditor.getCursor()
        user_session.fflModel = new FFLFormatter(register, fflEditor.getValue()).toString();
        fflEditor.setParsedValue(user_session.fflModel);
        fflEditor.aceEditor.gotoLine(cursor.row + 1, cursor.column)
    }
    $scope.toggleWrapLines = function() {
        $scope.toggleFormatter()
    }
    $scope.toggleProperties = function() {
        EconomicEditorView.properties = !EconomicEditorView.properties;
        fflEditor.setParsedValue(user_session.fflModel)
        fflEditor.scrollTop()
    }
    $scope.toggleScorecardTool = function() {
        const cursor = fflEditor.getCursor()
        user_session.fflModel = ScorecardTool.parse(fflEditor.getValue());
        fflEditor.setParsedValue(user_session.fflModel);
        fflEditor.aceEditor.gotoLine(cursor.row + 1, cursor.column)
    }
    $scope.toggleAceEditorMode = function() {
        $scope.fflmode = !$scope.fflmode;
        EconomicEditorView.on = !EconomicEditorView.on;
        fflEditor.setParsedValue(user_session.fflModel)
    }
    fflEditor.aceEditor.on("change", function(e) {
        const fflAnnotations = []
        $scope.changeView('FFLModelEditorView')

        if (fflEditor.aceEditor.curOp && fflEditor.aceEditor.curOp.command.name) {
            // reindex(Math.min(e.start.row, e.end.row), Math.max(e.start.row, e.end.row))
            fflAnnotations.push({
                row: e.start.row,
                column: 0,
                text: 'Changed', // Or the Json reply from the parser
                type: 'info' // also warning and information
            })
            fflEditor.setAnnotations(fflAnnotations);
        }
    })
    /**
     * TODO: make functionality for single formula recompilation
     * Every keystroke from the ACE-IDE will pass here
     */
    fflEditor.aceEditor.commands.on("afterExec", function(e) {
        var changingValue = false;
        $scope.changeView('FFLModelEditorView')
        if (e.command.name == 'golinedown') {
        } else if (e.command.name == 'golineup') {
        } else if (e.command.name == 'gotoright') {
        } else if (e.command.name == 'gotoleft') {
        } else if (e.command.name == 'selectwordright') {
        } else if (e.command.name == 'replace') {
        } else if (e.command.name == 'find') {
        } else if (e.command.name == 'selectwordleft') {
        } else if (e.command.name == 'gotolineend') {//END
        } else if (e.command.name == 'gotolinestart') {//HOME
        } else if (e.command.name == 'gotopagedown') {
        } else if (e.command.name == 'gotopageup') {//PAGE-UP
        } else if (e.command.name == 'overwrite') {//INSERT
        } else {
            //current variable changed.
            changingValue = true;
            changeManager.changed = true;
        }
        console.info('action:' + JSON.stringify(e.command))
        changeManager.updateCursor(fflEditor.getValue(), fflEditor.getCursor());
        var annotations = [];
        $scope.$apply(function() {
            $scope.error = changeManager.error
            $scope.activeVariable = changeManager.currentVariable

            if ($scope.currentView == 'FFLModelEditorView') $scope.togglePropertiesSidebar(true)
            if (changingValue) {
                //only reload the variable
                $scope.runJBehaveTest();
            }

            if (changeManager.warnings.length > 0) {
                console.info('There are warnings:' + JSON.stringify(changeManager.warnings));
            }
        })
        if (changeManager.warnings.length > 0) {
            for (var i = 0; i < changeManager.warnings.length; i++) {
                var warning = changeManager.warnings[i];
                for (var j = 0; j < changeManager.warnings[i].pos.length; j++) {
                    var obj = changeManager.warnings[i].pos[j];
                    annotations.push({
                        row: fflModel.substring(0, obj.char).split('\n').length,
                        column: 0,
                        text: warning.message, // Or the Json reply from the parser
                        type: 'error' // also warning and information
                    })
                }
            }

        }
        fflEditor.setAnnotations(annotations)
    });
}

FFLController.prototype.updateFFLModel = function(model_name) {
    const self = this;
    Pace.track(function() {
        window.location.href = "#" + model_name + "&" + self.user_session.user.name;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('progress', function(e) {
            self.fflEditor.setValue('Loading data: ' + e.loaded + ' of ' + (e.total || 'unknown') + ' bytes...');
        });
        xhr.addEventListener('load', function(e) {
            if (this.responseText.startsWith("<!DOCTYPE html>")) {
                self.user_session.fflModel = newModelTemplate.replace('$1', model_name)
            } else {
                self.user_session.fflModel = this.responseText;
            }
            self.fflEditor.setParsedValue(self.user_session.fflModel)
            self.fflEditor.scrollTop();
        });
        xhr.open('GET', 'resources/' + model_name + '.ffl');
        return xhr.send();
    });

}

module.exports = FFLController