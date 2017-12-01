/**
 * editor variable is set to the window.
 */
var ConvertEvaluateAsString = require('../../model-tests/plugins/ConvertEvaluateAsString').ConvertEvaluateAsString
var AmpersandConverter = require('../../model-tests/plugins/AmpersandConverter').AmpersandConverter
var ScorecardQ_caseFix = require('../../model-tests/plugins/ScorecardQ_caseFix').ScorecardQCaseFix
var V05CaseFix = require('../../model-tests/plugins/V05CaseFix').V05CaseFix
var EconomicEditorView = require('../../model-tests/EconomicEditorView').EconomicEditorView
var StoryParser = require('../../model-tests/StoryParser').StoryParser
var FFLFormatter = require('../../model-tests/plugins/FFLFormatter').LexialParser
var ScorecardTool = require('../../model-tests/ScorecardTool').ScorecardTool
var DbToFFLIndexer = require('../../lme-model-api/src/DbModelToFFLConverter').DbToFFLIndexer

var fflModel = '';
var params = window.location.href.split('#')
if (params.length == 1) window.location.href = '#MVO&DEMO'
var params = window.location.href.split('#')[1].split('&')
let windowModelName = params[0] || 'MVO';
let userID = params[1] || 'DEMO'

function setValue(fflModel) {
    if (ConvertEvaluateAsString.on) {
        fflModel = ConvertEvaluateAsString.parse(fflModel);
    }
    if (AmpersandConverter.on) {
        fflModel = AmpersandConverter.parse(fflModel);
    }
    if (ScorecardQ_caseFix.on) {
        fflModel = ScorecardQ_caseFix.parse(fflModel);
    }
    if (V05CaseFix.on) {
        fflModel = V05CaseFix.parse(fflModel);
    }
    if (EconomicEditorView.on) {
        fflModel = EconomicEditorView.parse(fflModel);
    }
    if (FFLFormatter.props) {
        fflModel = FFLFormatter.parse(fflModel).toString();
    }
    aceEditor.setValue(fflModel);
}

function scrollTop() {
    aceEditor.scrollToLine(1, true, true, function() {
    });
    aceEditor.gotoLine(1, 1, true);
    aceEditor.selection.moveTo(0, 0)
}

angular.module('lmeapp', ['angular.filter']).controller('ideController', function($scope, $http) {
    let currentIndexer;//current modelindexer
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
    $scope.fflmode = true;
    $scope.currentView = 'FFLModelEditorView';
    $scope.session = {
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
    $scope.togglePropertiesSidebar = function() {
        $('#pagewrapper').toggleClass('control-sidebar-open')
    }
    $scope.dbModelConvert = function(name) {
        Pace.track(function() {
            $.getJSON("model?model=" + windowModelName, function(data) {
                currentIndexer = new DbToFFLIndexer(data.data);
                currentIndexer.indexProperties();
                aceEditor.setValue(currentIndexer.toGeneratedCommaSeperated())
            });
        });
    }
    $scope.runJBehaveTest = function() {
        var annotations = []
        let storyParser = new StoryParser(aceEditor.session.getValue());
        storyParser.message = function(event) {
            annotations.push({
                row: event.line,
                column: 0,
                text: event.result.message, // Or the Json reply from the parser
                type: event.result.status // also warning and information
            })
            aceEditor.session.setAnnotations(annotations);
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
        Pace.track(function() {
            $scope.saveFeedback = "Customizing " + $scope.session.fflModelPath + " …"
            $scope.saveFeedbackTitle = "Working on it..."
            $.post("saveFFL_LME", {
                model: $scope.session.fflModelPath,
                data: aceEditor.getSession().getValue()
            }, function(data) {
                $scope.$apply(function() {
                    $scope.saveFeedbackTitle = "Finished"
                    $scope.saveFeedback = 'Done work..'
                    $scope.session.disablePreviewButton = false;
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
                data: aceEditor.getSession().getValue()
            }, function(data) {
                window.open('/id/' + userID + '/grid_bootstrap.html#' + data.link + '&' + userID);
            });
        });
    }
    $scope.toggleFormatter = function() {
        const row = aceEditor.selection.getCursor().row
        const col = aceEditor.selection.getCursor().column
        fflModel = FFLFormatter.parse(aceEditor.session.getValue()).toString();
        setValue(fflModel);
        aceEditor.gotoLine(row + 1, col)
    }
    $scope.toggleWrapLines = function() {
        FFLFormatter.props = !FFLFormatter.props
        this.toggleFormatter()
    }
    $scope.toggleProperties = function() {
        EconomicEditorView.properties = !EconomicEditorView.properties;
        setValue(fflModel)
        scrollTop()
    }
    $scope.toggleScorecardTool = function() {
        ScorecardTool.props = !ScorecardTool.props
        const row = aceEditor.selection.getCursor().row
        const col = aceEditor.selection.getCursor().column
        fflModel = ScorecardTool.parse(aceEditor.session.getValue());
        setValue(fflModel);
        aceEditor.gotoLine(row + 1, col)
    }
    $scope.toggleAceEditorMode = function() {
        $scope.fflmode = !$scope.fflmode;
        EconomicEditorView.on = !EconomicEditorView.on;
        setValue(fflModel)
    }
    window.addEventListener("keydown", function(e) {
        if (e.ctrlKey && e.shiftKey) {
            return;
        }
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
            e.preventDefault();
            aceEditor.execCommand("find")
        }
        else if ((e.ctrlKey && e.keyCode === 82)) {
            e.preventDefault();
            aceEditor.execCommand("replace")
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
            aceEditor.session.setValue(data)
        })
    });
    $(".data-toggle-ide").click(function(e) {
        aceEditor.setValue(fflModel);
        scrollTop()
    });
    $(".toggle-debug-btn").click(function(e) {

        var iRowPosition = aceEditor.selection.getCursor().row;
        var wholelinetxt = aceEditor.session.getLine(iRowPosition);

        var customPosition = {
            row: iRowPosition,
            column: 500
        };

        var text = '\t\t\t//*' + LME.nodes[wholelinetxt.replace(/variable (\w)/, '$1').trim()].value + "*//";
        aceEditor.session.insert(customPosition, text);
    });

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
                setValue(fflModel)
                scrollTop();
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


    aceEditor = ace.edit("editor");
    var langTools = ace.require("ace/ext/language_tools");
    aceEditor.session.setMode("ace/mode/ffl");
    aceEditor.setTheme("ace/theme/tomorrow");
    aceEditor.setBehavioursEnabled(true);
    // enable autocompletion and snippets
    aceEditor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showFoldWidgets: true
    });
    aceEditor.setAutoScrollEditorIntoView(true);
    aceEditor.setOption("maxLines", 60);
    aceEditor.$blockScrolling = Infinity
    aceEditor.resize(true)
    $(window).resize(function() {
        aceEditor.setOption("maxLines", 41 + (($(window).height() - 730) / 17));
        aceEditor.resize()
    });
    aceEditor.setOption("maxLines", 41 + (($(window).height() - 730) / 17));
    aceEditor.resize()
    aceEditor.on("changeCursor", function(e) {
        console.info(e)
    });
    aceEditor.on("change", function(e) {
        var fflAnnotations = []
        if (aceEditor.curOp && aceEditor.curOp.command.name) {
            console.info('look at row :' + e.start.row)
            console.info('look at row :' + e.end.row)
            console.log(e);
            fflAnnotations.push({
                row: e.start.row,
                column: 0,
                text: 'Changed', // Or the Json reply from the parser
                type: 'info' // also warning and information
            })
            aceEditor.session.setAnnotations(fflAnnotations);
        }
        else console.log("other change")
    })
    $scope.activeVariable = [{name: 'b', value: 'b'}];

    function setActiveVariable() {
        const row = aceEditor.selection.getCursor().row
        const variableLine = aceEditor.session.getLine(row);
        const variableName = variableLine.split(',')[0].trim();
        console.info(variableName)
        console.info(currentIndexer.vars[variableName])

        $scope.$apply(function() {
            var variable = [];
            for (var paramIndex = 0; paramIndex < currentIndexer.schema.length; paramIndex++) {
                var propertyName = currentIndexer.schema[paramIndex];
                variable.push({name: propertyName, value: currentIndexer.vars[variableName][paramIndex] || ""})
            }
            $scope.activeVariable = variable;
        })
    }

    aceEditor.commands.on("afterExec", function(e) {
        if (e.command.name == 'golinedown') {
            setActiveVariable();
        }
        else if (e.command.name == 'golineup') {
            setActiveVariable();
        }
        console.info({name: e.command.name, args: e.args})
    });
    // $('#pagewrapper').toggleClass('control-sidebar-open')
    //  $scope.dbModelConvert(windowModelName)
    handleModelChange(windowModelName)
});