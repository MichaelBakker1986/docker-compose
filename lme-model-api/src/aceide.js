/**
 * editor variable is set to the window.
 */
console.info("tuple test ".replace(/(?:variable|tuple)\s*(\w+).*/i, "$1"))
const EconomicEditorView = require('../../model-tests/EconomicEditorView').EconomicEditorView
const FFLFormatter = require('../../lme-core/exchange_modules/ffl2/FFLFormatter').FFLFormatter
const ScorecardTool = require('../../lme-core/exchange_modules/ffl2/ScorecardTool').ScorecardTool
const StoryParser = require('../../model-tests/StoryParser').StoryParser
const RegisterToFFL = require('../../lme-core/exchange_modules/ffl2/RegisterToFFL').RegisterToFFL
var Register = require('../../lme-core/exchange_modules/ffl2/Register').Register
var ChangeManager = require('../../lme-core/exchange_modules/ffl2/ChangeManager').ChangeManager

var fflModel = '';
var params = window.location.href.split('#')
if (params.length == 1) window.location.href = '#MVO&DEMO'
var params = window.location.href.split('#')[1].split('&')
let windowModelName = params[0] || 'MVO';
let userID = params[1] || 'DEMO'
//just an dummy-template to quickly create a model
var newModelTemplate = "model $1 uses BaseModel\n" +
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
const user_session = {
    disablePreviewButton: true,
    fflModelPath: windowModelName,
    user: {
        name: userID
    },
    messages: {
        data: [
            {text: 'Scorecard converter!'},
            {text: 'Implement refersTo generic!\nrefersTo STEP01\nrefersTo numberVariable</br>Multi dimentional is a Step and a Tuple'},
            {text: 'Make bigdata analyses from all models to find generics'}
        ]
    }
}


angular.module('lmeapp', ['angular.filter']).controller('ideController', function($scope, $http) {
    let register = new Register();
    $scope.register = register;
    const AceEditor = require('./ace_editor_api').AceEditor
    const aceEditor = new AceEditor();
    const changeManager = new ChangeManager(register)
    $scope.fflmode = true;
    $scope.currentView = 'FFLModelEditorView';
    $scope.session = user_session;
    let currentIndexer = new RegisterToFFL(register, {schema: [], nodes: []});//current modelindexer

    $http.get('resources/' + windowModelName + '.js').then(function(data) {
        eval(data.data)
        LME = LMEMETA.exportWebModel();
        $scope.LME_MODEL = LME.nodes
        $scope.name = LME.name
        $scope.LMEMETA = LMEMETA;

        LMEMETA.loadData(function(response) {
            $scope.$digest()
        })
    }).catch(function(err) {
        console.error("failed loading " + err);
    });
    let sidebaropen = false;
    $scope.togglePropertiesSidebar = function(open) {
        if (sidebaropen && open) {
            return;
        }
        if ($scope.activeVariable.length == 0 && !sidebaropen) {
            return;
        }
        sidebaropen = !sidebaropen;
        $('#pagewrapper').toggleClass('control-sidebar-open')
        $('#sidebar').toggleClass('control-sidebar')
    }
    $scope.fflType = '.ffl'
    $scope.dbModelConvert = function() {
        $scope.fflType = '.ffl2'
        Pace.track(function() {
            $.getJSON("model?model=" + windowModelName, function(data) {
                currentIndexer = new RegisterToFFL(register, data.data);
                currentIndexer.indexProperties();
                const lines = currentIndexer.toGeneratedCommaSeperated()
                aceEditor.setValue(lines)
            });
        });
    }
    $scope.runJBehaveTest = function() {
        var annotations = []
        let storyParser = new StoryParser(aceEditor.getValue());
        storyParser.message = function(event) {
            annotations.push({
                row: event.line,
                column: 0,
                text: event.result.message, // Or the Json reply from the parser
                type: event.result.status // also warning and information
            })
            aceEditor.setAnnotations(annotations);
        }
        storyParser.then = function(event) {
            $scope.session.messages.data.push({
                text: 'jBehave tests done ' + storyParser.results.rate().toFixed(1) + '% passed'
            })
        }
        storyParser.start();
        storyParser.call();
    }
    $scope.saveFFLModel = function() {
        const type = '.ffl';
        Pace.track(function() {
            $scope.saveFeedback = "Customizing " + $scope.session.fflModelPath + " …"
            $scope.saveFeedbackTitle = "Working on it...";
            let data = aceEditor.getValue()
            $.post("saveFFL_LME", {
                model: $scope.session.fflModelPath,
                data: data,
                type: type
            }, function(data) {
                console.info(data)
                $scope.$apply(function() {
                    $scope.saveFeedbackTitle = "Finished"
                    $scope.saveFeedback = data.status == 'fail' ? 'Failed compiling model:' + data.reason : 'Done work..'
                    $scope.session.disablePreviewButton = false;
                    if (data.status == 'succes') {
                        window.open('/id/' + userID + '/grid_bootstrap.html#' + $scope.session.fflModelPath + '&' + userID)
                        $('#modal-success').modal('hide')
                    }
                })
            });
        });
    }
    $scope.goToPreviewPage = function() {
        $scope.session.disablePreviewButton = true;
        window.open('/id/' + userID + '/grid_bootstrap.html#' + $scope.session.fflModelPath + '&' + userID)
        $('#modal-success').modal('toggle');
    }
    $scope.sneakPreviewModel = function() {
        Pace.track(function() {
            $.post("preview", {
                model: $scope.session.fflModelPath,
                data: aceEditor.getValue()
            }, function(data) {
                window.open('/id/' + userID + '/grid_bootstrap.html#' + data.link + '&' + userID);
            });
        });
    }
    $scope.toggleFormatter = function() {
        const cursor = aceEditor.getCursor()
        fflModel = FFLFormatter.create(register, aceEditor.getValue()).toString();
        aceEditor.setParsedValue(fflModel);
        aceEditor.aceEditor.gotoLine(cursor.row + 1, cursor.column)
    }
    $scope.toggleWrapLines = function() {
        this.toggleFormatter()
    }
    $scope.toggleProperties = function() {
        EconomicEditorView.properties = !EconomicEditorView.properties;
        aceEditor.setParsedValue(fflModel)
        aceEditor.scrollTop()
    }
    $scope.toggleScorecardTool = function() {
        const cursor = aceEditor.getCursor()
        fflModel = ScorecardTool.parse(aceEditor.getValue());
        aceEditor.setParsedValue(fflModel);
        aceEditor.aceEditor.gotoLine(cursor.row + 1, cursor.column)
    }
    $scope.toggleAceEditorMode = function() {
        $scope.fflmode = !$scope.fflmode;
        EconomicEditorView.on = !EconomicEditorView.on;
        aceEditor.setParsedValue(fflModel)
    }

    $scope.hasChanges = false;
    $scope.changes = '';

    $scope.update = function() {
        $scope.currentView = 'updateView';

        $http.get('/hasUpdates').then(function(data) {
            $scope.hasChanges = data.data.hasChanges;
            $scope.changes = data.data.changes;

            if ($scope.hasChanges) {
                $http.get('/update/git/notifyCommit').then(function(data) {
                    location.reload();
                });
            }
        });
    }

    window.addEventListener("keydown", function(e) {
        if (e.ctrlKey && e.shiftKey) {
            return;
        }
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
            e.preventDefault();
            aceEditor.aceEditor.execCommand("find")
        }
        else if ((e.ctrlKey && e.keyCode === 82)) {
            e.preventDefault();
            aceEditor.aceEditor.execCommand("replace")
        }
    })
    $(window).bind('keydown', function(evt) {
        if (evt.ctrlKey || evt.metaKey) {
            switch (String.fromCharCode(evt.which).toLowerCase()) {
                case 's':
                    evt.preventDefault();
                    $('#saveFFLModel').click();
                    $scope.saveFFLModel();
                    break;
                case 'f':
                    if (evt.shiftKey) {
                        evt.preventDefault();
                        $scope.toggleFormatter()
                    }
                    break;
                case 'p':
                    evt.preventDefault();
                    $scope.sneakPreviewModel();
                    break;
            }
        } else {
            switch (evt.keyCode) {
                case 117://F6
                    evt.preventDefault();
                    $('#models').select()
                    $('#models').focus()
                    break;
            }
        }
    });

    $.getJSON("/branches", function(data, status, xhr) {
        $("#tags").autocomplete({source: data});
    })
    $(".toggle-expand-btn").click(function(e) {
        $(this).closest('.content .box').toggleClass('panel-fullscreen');
    });
    $(".data-story").click(function(e) {
        $.get("resources/MVO.story", function(data, status, xhr) {
            aceEditor.setValue(data)
        })
    });
    $(".data-toggle-ide").click(function(e) {
        aceEditor.setValue(fflModel);
        aceEditor.scrollTop()
    });
    $(".toggle-debug-btn").click(function(e) {

        var wholelinetxt = aceEditor.getCurrentLine()

        var customPosition = {
            row: aceEditor.getCursor().row,
            column: 500
        };

        var text = '\t\t\t//*' + LME.nodes[wholelinetxt.replace(/variable (\w)/, '$1').trim()].value + "*//";
        aceEditor.aceEditor.session.insert(customPosition, text);
    });

    function handleModelChange() {
        Pace.track(function() {
            window.location.href = "#" + windowModelName + "&" + userID;
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('progress', function(e) {
                aceEditor.setValue('Loading data: ' + e.loaded + ' of ' + (e.total || 'unknown') + ' bytes...');
            });
            xhr.addEventListener('load', function(e) {
                if (this.responseText.startsWith("<!DOCTYPE html>")) {
                    fflModel = newModelTemplate.replace('$1', windowModelName)
                } else {
                    fflModel = this.responseText;
                }
                aceEditor.setParsedValue(fflModel)
                aceEditor.scrollTop();
            });
            xhr.open('GET', 'resources/' + windowModelName + '.ffl');
            return xhr.send();
        });
    }

    $.getJSON("/models", function(data, status, xhr) {
        $("#models").autocomplete({
            source: data,
            autoFocus: true,
            change: function() {
                windowModelName = $('#models').val();
                handleModelChange()
            }
        });
    })
    $("#models").keydown(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            handleModelChange()
            return false;
        }
    });

    aceEditor.aceEditor.on("change", function(e) {
        var fflAnnotations = []
        if (aceEditor.aceEditor.curOp && aceEditor.aceEditor.curOp.command.name) {
            // reindex(Math.min(e.start.row, e.end.row), Math.max(e.start.row, e.end.row))
            fflAnnotations.push({
                row: e.start.row,
                column: 0,
                text: 'Changed', // Or the Json reply from the parser
                type: 'info' // also warning and information
            })
            aceEditor.setAnnotations(fflAnnotations);
        }
    })
    $scope.activeVariable = [];
    $scope.schema = register.schema
    aceEditor.aceEditor.commands.on("afterExec", function(e) {
        if (e.command.name == 'golinedown') {
        }
        else if (e.command.name == 'golineup') {
        }
        console.info({name: e.command.name, args: e.args})
        changeManager.updateCursor(aceEditor.getValue(), aceEditor.getCursor());
        $scope.$apply(function() {
            $scope.error = changeManager.error
            $scope.activeVariable = changeManager.currentVariable
            $scope.togglePropertiesSidebar(true)
            console.info(changeManager.error)
        })
    });
    $scope.$watch(function(scope) {
            if (scope.register.changes.length > 0) {
                for (var i = 0; i < scope.register.changes.length; i++) {
                    var obj = scope.register.changes[i];
                    console.info(obj)
                }
                scope.register.changes.length = 0
                const newValue = scope.register.header + '{\n' + new RegisterToFFL(scope.register).toGeneratedFFL(undefined, windowModelName).join('\n')
                aceEditor.setValue(newValue)
            }
            return scope.register.changes
        },
        function() {
            console.info('change made')
        }
    );
    $scope.togglePropertiesSidebar();
    handleModelChange()
});
