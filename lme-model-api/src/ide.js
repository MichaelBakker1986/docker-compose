/** * editor variable is set to the window. */
const LocalStorage = require('./LocalStoreMagic').LocalStorage

require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
const RegisterToFFL = require('../../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL
const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
const ChangeManager = require('../../lme-core/exchange_modules/ffl/ChangeManager').ChangeManager
const JBehaveController = require('./JBehaveController')
const MatrixManager = require('../../excel-connect/MatrixManager')
const MatrixController = require('./MatrixController')
const FFLController = require('./FFLController')
const DebugController = require('./DebugController')
const LMEModelEngine = require('./lme.js')
var params = window.location.href.split('#')
if (params.length == 1) window.location.href = '#SCORECARDTESTMODEL&DEMO&6'
var params = window.location.href.split('#')[1].split('&')

const user_session = {
    disablePreviewButton: true,
    fflModelPath        : () => params[0] || 'SCORECARDTESTMODEL',
    page                : 'scorecard',
    fflModel            : '',
    column_size         : 6,
    version             : '0.0.7',
    author              : "michael.bakker@topicus.nl",
    user                : {
        name: params[1] || 'DEMO'
    },
    messages            : {
        data: [
            { text: 'Scorecard converter!' },
            { text: 'Implement refersTo generic!\nrefersTo STEP01\nrefersTo numberVariable</br>Multi dimentional is a Step and a Tuple' },
            { text: 'Make bigdata analyses from all models to find generics' }
        ]
    }
}
global.session = new LocalStorage(user_session)

angular.module('lmeapp', ['angular.filter'])
    .controller('ideController', function($scope, $http, $timeout) {

        const modelEngine = new LMEModelEngine()
        $scope.LMEMETA = modelEngine;
        global.LME = modelEngine
        modelEngine.loadData(function(response) {
        })

        const AceEditor = require('./ace_editor_api').AceEditor
        const matrixManager = new MatrixManager()
        const matrixController = new MatrixController($scope, $http, matrixManager, { halfHeight: true })
        const debugController = new DebugController($scope, $http)
        $http.get('whoami').then(function(response) {
            user_session.user.name = response.data.split(',')[0]
        }).catch(function(err) {
            user_session.user.name = 'DEMO'
        })
        $scope.session = user_session;
        $scope.model_history = []

        $scope.updateModelChanges = function() {
            $.get("modelChanges/" + user_session.fflModelPath, function(data, status, xhr) {
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
                        data       : hashes[obj.uuid]
                    })
                }
                history.reverse()
                $scope.$apply(function() {
                    $scope.model_history = history;
                })

            }).fail(function(err) {
                console.error('Error while reading modelchanges.', err)
            })
        }
        const register = new Register();
        $scope.register = register;

        const right_editor = new AceEditor("right_editor", { halfHeight: true });
        const jBehaveController = new JBehaveController($scope, $http, modelEngine, right_editor, user_session)
        const changeManager = new ChangeManager(register)
        $scope.fflmode = true;
        $scope.currentView = 'FFLModelEditorView'
        $scope.fflType = '.ffl'
        var currentIndexer = new RegisterToFFL(register, { schema: [], nodes: [] });//current modelindexer
        const fflEditor = new AceEditor("editor");
        fflEditor.initResize()
        const fflController = new FFLController($scope, $http, fflEditor, user_session, changeManager, register, modelEngine)
        const workbook = modelEngine.lme;
        right_editor.registerEditorToClickNames(right_editor, fflEditor, user_session, register, workbook)
        right_editor.initResize()
        fflEditor.registerEditorToClickNames(fflEditor, fflEditor, user_session, register, workbook)
        matrixController.registerEditorToClickNames(fflEditor, user_session, register, workbook)
        matrixController.matrix_editor.initResize()
        $(document).ajaxError(function(event, jqxhr, settings, thrownError) {
            console.warn('error while getting [' + settings.url + ']', thrownError)
        });
        var sidebaropen = false;
        var hideSideBar = true;
        $scope.publishDockerImage = function() {
            Pace.track(function() {
                $.post("publishDockerImage/" + $scope.session.fflModelPath, {
                    story  : right_editor.getValue(),
                    matrix : matrixManager.toFatrix(),
                    fflData: fflEditor.getValue()
                }, function(data) {
                    console.info('Finished publishing docker image.')
                });
            });
        }
        $scope.toggleSideBarUsed = function() {
            hideSideBar = !hideSideBar;
            $scope.togglePropertiesSidebar(hideSideBar)
        }
        $scope.togglePropertiesSidebar = function(open) {
            if (hideSideBar && !sidebaropen) return;
            if (hideSideBar && sidebaropen) {
                sidebaropen = !sidebaropen;
                $('#pagewrapper').toggleClass('control-sidebar-open')
                $('#sidebar').toggleClass('control-sidebar')
            } else {
                if (sidebaropen && open) return;
                if ($scope.activeVariable.length == 0 && !sidebaropen) return;
                sidebaropen = !sidebaropen;
                $('#pagewrapper').toggleClass('control-sidebar-open')
                $('#sidebar').toggleClass('control-sidebar')
            }
            if (!sidebaropen) $('#sidebar').hide()
            else $('#sidebar').show()
        }
        $scope.dbModelConvert = function() {
            $scope.fflType = '.ffl'
            Pace.track(function() {
                $.getJSON("model?model=" + user_session.fflModelPath, function(data) {
                    currentIndexer = new RegisterToFFL(register);
                    currentIndexer.indexProperties();
                    const lines = currentIndexer.toGeneratedCommaSeperated()
                    fflEditor.setValue(lines)
                }).fail(function() {
                    console.info('Model get fail')
                });
            });
        }
        $scope.saveFileInView = function() {
            if ($scope.currentView == 'FFLModelEditorView') $scope.saveFFLModel()
            else if ($scope.currentView == 'jbehaveView') $scope.saveJBehaveStory()
        }
        $scope.goToPreviewPage = function() {
            $scope.session.disablePreviewButton = true;
            $scope.downloadJsLink = null;
            window.open($scope.session.page + '.html#' + $scope.session.fflModelPath + '&' + user_session.user.name + "&" + user_session.column_size)
            $('#modal-success').modal('toggle');
        }

        $scope.sneakPreviewModel = function() {
            Pace.track(function() {
                $.post("preview/" + $scope.session.fflModelPath, {
                    data: fflEditor.getValue()
                }, function(data) {
                    window.open($scope.session.page + '.html#' + data.link + '&' + user_session.user.name + "&" + user_session.column_size);
                });
            });
        }

        $scope.previewRestApi = function() {
            $scope.reloadFFL();
            Pace.track(function() {
                $.post("preview/" + $scope.session.fflModelPath, {
                    data: fflEditor.getValue()
                }, function(data) {
                    window.open('data-docs/?url=%2Fdata-api-docs#!/default/' + $scope.session.fflModelPath);
                });
            });
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
            $scope.changeView('updateView')
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
        /*** Auto-complete for JBehave view **/
        $scope.changedView = function() {
            if ($scope.currentView == 'jbehaveView') {
                console.info('Changed to JBEHAVE VIEW')
                const names = register.getIndex('name')
                const wordMap = []
                for (var name in names) {
                    wordMap.push(
                        { "word": name }
                    )
                }
                fflEditor.addCompleter(function(editor, session, pos, prefix, callback) {
                    if (prefix.length === 0) {
                        callback(null, []);
                        return
                    }
                    callback(null, wordMap.map(function(ea) {
                        return { name: ea.word, value: ea.word, meta: "optional text" }
                    }));
                })
                $scope.reloadFFL();
                $scope.runJBehaveTest();
                matrixController.refresh()
            }
        }
        $(".toggle-expand-btn").click(function(e) {
            $(this).closest('.content .box').toggleClass('panel-fullscreen');
        });

        function handleModelChange() {
            fflController.updateFFLModel(user_session.fflModelPath)
            jBehaveController.updateStory(user_session.fflModelPath)
            $scope.updateModelChanges()
            matrixController.updateMatrix(user_session.fflModelPath)
        }

        $.getJSON("models", function(data) {
            $("#models").autocomplete({
                source   : data,
                autoFocus: true,
                change   : function() {
                    user_session.fflModelPath = $('#models').val();
                    handleModelChange()
                }
            });
        }).fail(function() {
            $("#models").autocomplete({
                source   : [],
                autoFocus: true,
                change   : function() {
                    user_session.fflModelPath = $('#models').val();
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
        $scope.activeVariable = [];
        $scope.schema = register.schema
        right_editor.aceEditor.on("mousedown", function() {
            $scope.changeView('jbehaveView')
            if (register.changes.length > 0) {
                console.info("Changes been made")
                register.changes.length = 0
                $scope.reloadFFL()
            }
            $scope.runJBehaveTest()
        });
        /* This watches the propertiesView on the right side of the page.*/
        $scope.$watch(function(scope) {
                if (scope.register.changes.length > 0) {
                    console.info('Register changes')
                    scope.register.changes.length = 0
                    const newValue = scope.register.header + '{\n' + new RegisterToFFL(scope.register).toGeneratedFFL(undefined, user_session.fflModelPath).join('\n')
                    fflEditor.setValue(newValue)
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
            $scope.changeView('FFLModelEditorView')
            console.info('Looking at node ' + node)
            fflEditor.setValue(new RegisterToFFL(register).toGeneratedFFL(node.id, undefined).join('\n'));
        }
        $scope.changeView = function(viewName) {
            if ($scope.currentView != viewName) {
                console.info('Switched to ' + viewName)
                $scope.currentView = viewName;
                $scope.changedView();
            }
        }
        /*** Every keystroke from the JBehaveView will pass here */
        right_editor.aceEditor.commands.on("afterExec", function(e) {
            return $scope.runJBehaveTest()
        });
        window.addEventListener("keydown", function(e) {
            if (e.ctrlKey && e.shiftKey) return;
            if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
                e.preventDefault();
                fflEditor.aceEditor.execCommand("find")
            }
            else if ((e.ctrlKey && e.keyCode === 82)) {
                e.preventDefault();
                fflEditor.aceEditor.execCommand("replace")
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
    });