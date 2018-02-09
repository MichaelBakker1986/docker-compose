/**
 * editor variable is set to the window.
 */
const EconomicEditorView = require('../../model-tests/EconomicEditorView').EconomicEditorView
const FFLFormatter = require('../../lme-core/exchange_modules/ffl/FFLFormatter').Formatter
const ScorecardTool = require('../../lme-core/exchange_modules/ffl/ScorecardTool').ScorecardTool
const StoryParser = require('../../model-tests/StoryParser').StoryParser
const RegisterToFFL = require('../../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL
const JSWorkBook = require('../../lme-core/src/JSWorkBook')
const Context = require('../../lme-core/src/Context')
const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
const DebugManager = require('../../lme-core/exchange_modules/ffl/DebugManager').DebugManager
const ChangeManager = require('../../lme-core/exchange_modules/ffl/ChangeManager').ChangeManager

var fflModel = '';
var params = window.location.href.split('#')
if (params.length == 1) window.location.href = '#SCORECARDTESTMODEL&DEMO'
var params = window.location.href.split('#')[1].split('&')
var windowModelName = params[0] || 'SCORECARDTESTMODEL';
var userID = params[1] || 'DEMO'
const newSotryTemplate =
    "{model_name} Score Basic\n" +
    "@Author {author_name}\n" +
    "@themes {model_name} Score basic\n" +
    "\n" +
    "Scenario: Verify {model_name} Score calculations\n" +
    "Given a document of the model type {model_name}"

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
    page: 'scorecard',
    version: '0.0.6',
    author: "michael.bakker@topicus.nl",
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

angular.module('lmeapp', ['angular.filter'])
    .controller('ideController', function($scope, $http, $timeout) {
        $http.get('whoami').then(function(response) {
            user_session.user.name = response.data.split(',')[0]
        }).catch(function(err) {
            user_session.user.name = 'DEMO'
        })
        $scope.session = user_session;
        $scope.model_history = []
        $.get("modelChanges/" + windowModelName, function(data, status, xhr) {
            const history = [];
            const hashes = {};
            for (var i = 0; i < data.data.length; i++) {
                var obj = data.data[i];
                obj.create_time = moment.utc(obj.create_time).add(1, 'hours').local().fromNow()

                if (hashes[obj.uuid]) {
                    hashes[obj.uuid].push(JSON.stringify(obj, null, 2))
                    continue
                }
                hashes[obj.uuid] = [JSON.stringify(obj, null, 2)]
                history.push({
                    create_time: obj.create_time,
                    data: hashes[obj.uuid]
                })
            }
            history.reverse()
            $scope.model_history = history;
        }).fail(function(err) {
            console.error(err)
        })

        const register = new Register();
        const debugManager = new DebugManager();
        DEBUGGER = debugManager
        $scope.register = register;
        const AceEditor = require('./ace_editor_api').AceEditor
        const right_editor = new AceEditor("right_editor");

        const changeManager = new ChangeManager(register)
        $scope.fflmode = true;
        $scope.currentView = 'FFLModelEditorView';
        $scope.fflType = '.ffl'
        var currentIndexer = new RegisterToFFL(register, {schema: [], nodes: []});//current modelindexer
        const aceEditor = new AceEditor("editor");

        var HoverLink = ace.require("hoverlink").HoverLink
        var TokenTooltip = ace.require("token_tooltip").TokenTooltip

        function registerEditorToClickNames(selected_editor) {
            selected_editor.aceEditor.hoverLink = new HoverLink(selected_editor.aceEditor, register);
            selected_editor.aceEditor.hoverLink.on("open", function(link) {
                const startLookIndex = fflModel.search(new RegExp("(variable|tuple)\\s*\\+?\\-?\\=?" + link.value + "\s*$", "gmi"));
                //(!) its the real LineNumber - Delta on page
                const lineNumber = fflModel.substring(0, startLookIndex).split('\n').length
                aceEditor.scrollToLine(lineNumber)
            })
            selected_editor.aceEditor.TokenTooltip = new TokenTooltip(selected_editor.aceEditor, register);
        }

        registerEditorToClickNames(right_editor)
        registerEditorToClickNames(aceEditor)

        $(document).ajaxError(function(event, jqxhr, settings, thrownError) {
            console.warn('error while getting [' + settings.url + ']', thrownError)
        });


        $.getScript('engineonly.js', function(data, textStatus, jqxhr) {
            $.get("resources/" + windowModelName + ".ffl", function(data, status, xhr) {
                aceEditor.setValue(data)
                LMEMETA.importFFL(data)
                LME = LMEMETA.exportWebModel()
                $scope.LME_MODEL = LME.nodes
                $scope.name = LME.name
                $scope.LMEMETA = LMEMETA;
                LMEMETA.loadData(function(response) {
                    $scope.$digest()
                })
            }).fail(function(err) {
                console.error(err)
            })

        }).fail(function() {
            if (arguments[0].readyState == 0) {
                console.info('Failed to load')
                //script failed to load
            } else {
                //script loaded but failed to parse
                console.info('resources/' + windowModelName + '.js' + ":[" + arguments[2].toString() + ']')
            }
        })

        var sidebaropen = false;
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

        $scope.dbModelConvert = function() {
            $scope.fflType = '.ffl'
            Pace.track(function() {
                $.getJSON("model?model=" + windowModelName, function(data) {
                    currentIndexer = new RegisterToFFL(register);
                    currentIndexer.indexProperties();
                    const lines = currentIndexer.toGeneratedCommaSeperated()
                    aceEditor.setValue(lines)
                }).fail(function() {
                    console.info('Model get fail')
                });
            });
        }
        $scope.runJBehaveTest = function() {
            var annotations = []
            LMEMETA.lme.clearValues();//Quick-fix to clear state, we should just create a copy of the current one.
            var storyParser = new StoryParser(right_editor.getValue(), windowModelName + '.story', LMEMETA.lme);
            storyParser.message = function(event) {
                annotations.push({
                    row: event.line - 1,
                    column: 0,
                    text: event.result.message, // Or the Json reply from the parser
                    type: event.result.status == 'fail' || event.result.status == 'error' ? 'error' : 'info' // also warning and information
                })
                right_editor.setAnnotations(annotations);
            }
            storyParser.then = function(event) {
                $scope.session.messages.data.push({
                    text: 'jBehave tests done ' + storyParser.results.rate().toFixed(1) + '% passed'
                })
            }
            storyParser.start();
            storyParser.call();
        }
        $scope.saveFileInView = function() {
            if ($scope.currentView == 'FFLModelEditorView') {
                $scope.saveFFLModel()
            } else if ($scope.currentView == 'jbehaveView') {
                $scope.saveJBehaveStory()
            }
        }
        $scope.saveJBehaveStory = function() {
            const type = '.story';
            Pace.track(function() {
                $scope.saveFeedback = "Saving story " + $scope.session.fflModelPath + "… "
                $scope.saveFeedbackTitle = "Working on it... ";
                var data = right_editor.getValue()
                $.post("saveJBehaveStory/" + $scope.session.fflModelPath, {
                    data: data,
                    type: type
                }, function(data) {
                    $scope.$apply(function() {
                        $scope.saveFeedbackTitle = "Finished"
                        $scope.saveFeedback = data.status == 'fail' ? 'Failed saving story :' + data.reason : 'Done work.'
                        $scope.downloadJsLink = 'resources/' + $scope.session.fflModelPath + '.story'
                        $scope.session.disablePreviewButton = false;
                        if (data.status == 'success') {
                            $('#modal-success').modal('hide')
                        }
                    })
                });
            });
        }
        $scope.saveFFLModel = function() {
            const type = '.ffl';
            Pace.track(function() {
                $scope.saveFeedback = "Customizing " + $scope.session.fflModelPath + "… "
                $scope.saveFeedbackTitle = "Working on it... ";
                var data = aceEditor.getValue()
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
        $scope.goToPreviewPage = function() {
            $scope.session.disablePreviewButton = true;
            $scope.downloadJsLink = null;
            window.open($scope.session.page + '.html#' + $scope.session.fflModelPath + '&' + userID)
            $('#modal-success').modal('toggle');
        }

        /**
         * DEBUG FUNCTIONALITY, deep dive- pilot
         */
        /*$scope.breakpoints = []
        aceEditor.aceEditor.on("guttermousedown", function(e) {
            var target = e.domEvent.target;
            if (target.className.indexOf("ace_gutter-cell") == -1)
                return;
            if (!aceEditor.aceEditor.isFocused())
                return;
            if (e.clientX > 25 + target.getBoundingClientRect().left)
                return;

            var row = e.getDocumentPosition().row;

            e.editor.session.setBreakpoint(row);
            $scope.$apply(function() {
                $scope.breakpoints = aceEditor.aceEditor.session.$breakpoints;
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
                    var property = aceEditor.aceEditor.session.getLine(i).trim().split(':')[0].trim()
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
        $scope.sneakPreviewModel = function() {
            Pace.track(function() {
                $.post("preview/" + $scope.session.fflModelPath, {
                    data: aceEditor.getValue()
                }, function(data) {
                    window.open($scope.session.page + '.html#' + data.link + '&' + userID);
                });
            });
        }
        $scope.reloadFFL = function() {
            //Hello engine-only
            LMEMETA.importFFL(aceEditor.getValue())
            LME = LMEMETA.exportWebModel()
            $scope.LME_MODEL = LME.nodes
            $scope.name = LME.name
            $scope.LMEMETA = LMEMETA;
            LMEMETA.loadData(function(response) {
                $scope.$digest()
            })
        }
        $scope.previewRestApi = function() {
            $scope.reloadFFL();
            Pace.track(function() {
                $.post("preview/" + $scope.session.fflModelPath, {
                    data: aceEditor.getValue()
                }, function(data) {
                    window.open('data-api-docs');
                });
            });
        }
        global.debug = function(name) {
            debugManager.addStep(name)
        }
        $scope.toggleFormatter = function() {
            const cursor = aceEditor.getCursor()
            fflModel = new FFLFormatter(register, aceEditor.getValue()).toString();
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

        $http.get('hasUpdates').then(function(data) {
            $scope.hasChanges = data.data.hasChanges;
            $scope.changes = data.data.changes;
        }).catch(function(err) {
            $scope.hasChanges = ""
            $scope.changes = undefined

        })
        $scope.gotoUpdateScreen = function() {
            $scope.currentView = 'updateView';
        }
        $scope.update = function(hasUpdates) {
            $http.get('hasUpdates').then(function(data) {
                $scope.hasChanges = data.data.hasChanges;
                $scope.changes = data.data.changes;
                if ($scope.hasChanges) {
                    $http.get('/update/git/notifyCommit').then(function(data) {
                        location.reload();
                    }).catch(function(err) {
                        $scope.changes = err.toString();
                        location.reload();
                    });
                }
            }).catch(function(err) {
                $scope.changes = err.toString()
                location.reload();
            });
        }
        /**
         * Auto-complete for JBehave view
         **/
        $scope.changedView = function() {
            if ($scope.currentView == 'jbehaveView') {
                const names = register.getIndex('name')
                const wordMap = []
                for (var name in names) {
                    wordMap.push(
                        {"word": name}
                    )
                }
                aceEditor.addCompleter(function(editor, session, pos, prefix, callback) {
                    if (prefix.length === 0) {
                        callback(null, []);
                        return
                    }
                    callback(null, wordMap.map(function(ea) {
                        return {name: ea.word, value: ea.word, meta: "optional text"}
                    }));
                })
                $scope.reloadFFL();
                $scope.runJBehaveTest();
            }
        }
        window.addEventListener("keydown", function(e) {
            if (e.ctrlKey && e.shiftKey) {
                return;
            }
            if (e.key == 'F5' && debugManager.active) {
                doStep()
                e.preventDefault();
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
                        $('#saveFileInView').click();
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

        $(".toggle-expand-btn").click(function(e) {
            $(this).closest('.content .box').toggleClass('panel-fullscreen');
        });
        $(".data-story").click(function(e) {
            $.get("resources/" + windowModelName + ".story", function(data, status, xhr) {
                right_editor.setValue(data)
            }).fail(function(err) {
                if (err.status == 404) {
                    right_editor.setValue(newSotryTemplate.replace(/{model_name}/g, windowModelName).replace(/{author_name}/g, userID))
                } else {
                    right_editor.setValue(err.statusText)
                }
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

        $.getJSON("models", function(data) {
            $("#models").autocomplete({
                source: data,
                autoFocus: true,
                change: function() {
                    windowModelName = $('#models').val();
                    handleModelChange()
                }
            });
        }).fail(function() {
            $("#models").autocomplete({
                source: [],
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
        right_editor.aceEditor.on("mousedown", function() {
            if (register.changes.length > 0) {
                console.info("Changes been made")
                register.changes.length = 0
                $scope.reloadFFL()
            }
            $scope.runJBehaveTest()
        });
        right_editor.aceEditor.commands.on("afterExec", function(e) {
            $scope.runJBehaveTest()
            return;
        });

        //TODO: make functionality for single formula recompilation
        aceEditor.aceEditor.commands.on("afterExec", function(e) {
            if ($scope.currentView !== 'FFLModelEditorView') {
                return;
            }
            if (e.command.name == 'golinedown') {
            } else if (e.command.name == 'golineup') {
            } else if (e.command.name == 'gotoright') {
            } else if (e.command.name == 'gotoleft') {
            } else if (e.command.name == 'selectwordright') {
            } else if (e.command.name == 'replace') {
            } else if (e.command.name == 'find') {
            } else if (e.command.name == 'selectwordleft') {
            } else {
                changeManager.changed = true;
            }
            changeManager.updateCursor(aceEditor.getValue(), aceEditor.getCursor());
            var annotations = [];
            $scope.$apply(function() {
                $scope.error = changeManager.error
                $scope.activeVariable = changeManager.currentVariable

                if ($scope.currentView == 'FFLModelEditorView') $scope.togglePropertiesSidebar(true)

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
            aceEditor.setAnnotations(annotations)
        });
        $scope.$watch(function(scope) {
                if (scope.register.changes.length > 0) {
                    console.info("Changes been made")
                    scope.register.changes.length = 0
                    const newValue = scope.register.header + '{\n' + new RegisterToFFL(scope.register).toGeneratedFFL(undefined, windowModelName).join('\n')
                    aceEditor.setValue(newValue)
                }
                return scope.register.changes
            },
            function() {
                //Hook for changes in the UI
                //NO-OP
            }
        );
        $scope.togglePropertiesSidebar();
        handleModelChange()

        $scope.isOpen = function(node, closed_nodes) {
            var path = node.path.split('.')
            for (var i = 0; i < path.length; i++) {
                if (closed_nodes[path[i]] === true) return false;
            }
            return true;
        }
        $scope.showNode = function(node) {
            aceEditor.setValue(new RegisterToFFL(register).toGeneratedFFL(node.id, undefined).join('\n'));
        }
        $scope.changeView = function(viewName) {
            $scope.currentView = viewName;
            $scope.changedView();
        }
    });
