var APP = require('../app.js');
var logger = require('ff-log')
var JSWorkBook = require('../uiWorkbook');

APP.additionalbuttons.push({
    name: 'questionnaire',
    icon: 'fa-edit',
    page: 'Editor',
    action: function ($scope) {
        sidebarShow();
        $scope.switchPage('Questionnaire')
    }
});
APP.directive('hcChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            $(element[0]).highcharts(scope.options);
        }
    };
})
APP.pages.push({
    name: 'Questionnaire',
    title: 'Preview',
    order: 1,
    icon: 'fa-edit',
    path: "/src/archive/clientscorecard/form.html"
});
APP.pages.push({
    name: 'Developer',
    icon: 'fa-sitemap',
    path: '/src/form/editor.html',
    hide: true,
    arrow: true,
    subpages: [{
        name: 'ui-nodes',
        path: '/src/form/plain.html',
        action: 'content = UIModel'
    }, {
        name: 'Solution',
        path: '/src/form/plain2.html',
        action: 'content = produceSolution()'
    }]
});
//TODO: make debug setting
function print(message) {
    console.info(message);
}

//we use the UI export to create the views
var present = JSWorkBook.export('presentation');
var navigator = present.navigator;
JSWorkBook.present = present.tree;
//this this controller is called only once, its the AppController
//pages within the Controller are called multiple times
//this is where generic functionality should go, scope.members and scope.functions
APP.controller('appCtrl', ['$timeout', '$scope', '$http', '$location', '$rootScope', function ($timeout, $scope, $http, $location) {
    var warningtpye = ['fa-comment fa-fwt', 'fa-upload fa-fw', 'fa-tasks fa-fw', 'fa-envelope fa-fw', 'fa-twitter fa-fw']
    print('Initialized MainControl');

    $scope.navigator = navigator;
    $scope.additionalbuttons = APP.additionalbuttons;
    $scope.pages = APP.pages;
    $scope.usersettings = JSWorkBook.settings;
    //updates on the presentation are not passed through. Simple cause we fail to call update on it onces model changes.    $scope.aceOn = false;
    $scope.apiPath = 'http://' + $location.host() + ':8081/api/';
    $scope.x = JSWorkBook.x;
    $http.defaults.headers.post['X-Requested-With'] = "*";
    // to make better css for styling o0n multiple columns
    $scope.columns = [1];
    var docValues = JSWorkBook.docValues;
    //remove member. its not UI specific
    $scope.docValues = docValues;
    $scope.rating;
    $scope.uimodelroot = {nodes: []};
    $scope.rootPath;
    $scope.toggleDefaultOutput = JSWorkBook.settings.toggleOutput;
    $scope.getOrCreateProperty = JSWorkBook.getOrCreateProperty;
    $scope.find = JSWorkBook.find;


    $scope.alerts = {
        warnings: [
            {message: ' New Comment', type: warningtpye[0], timeago: '4 minutes ago'},
            {message: ' Server Rebooted', type: warningtpye[1], timeago: '12 minutes ago'},
            {message: ' New Task', type: warningtpye[2], timeago: '4 minutes ago'},
            {message: ' Message Sent', type: warningtpye[3], timeago: '4 minutes ago'},
            {message: ' 3 New Followers', type: warningtpye[4], timeago: '4 minutes ago'}
        ]
    };

    var _session;
    var editor;
    $timeout(function () {
        $scope.presentation = JSWorkBook.present;
    })


    $scope.doToggle = function (node) {
        node.selected = !node.selected;
        node._collapsed = !node._collapsed;
    };

    $scope.exampleModels = [
        {
            template: true,
            produce: function () {
            },
            name: 'Questionnaire',
            id: 0
        },
        {
            produce: function () {
            },
            template: true,
            name: 'Form',
            id: 1
        }
    ];

    $http.get($scope.apiPath + 'SOLUTION').success(function (data) {
        Array.prototype.push.apply($scope.models, data);
    });

    for (var key in $location.search()) {
        $scope[key] = $location.search()[key];
    }

    $scope.switchPageByPage = function (page) {
        $scope.page = page;
        $location.search('page', page.name);
        $scope.templatePath = '../' + page.path;
        navigator._current.update(JSWorkBook.updateAll);
    }
    $scope.lookupSolutions = function (text) {
        return [text];
    }
    //TODO: remove copy paste
    $scope.switchPage = function (menuItemName) {
        var target = $scope.pages.lookup('name', menuItemName);
        $scope.page = target;
        $location.search('page', target.name);
        $scope.templatePath = '../' + target.path;
        $timeout(function () {
            $('body').scrollTop(0)
        });
//JSWorkBook.present
        navigator._current.update(JSWorkBook.updateAll);

    }

    $scope.rootNodePath = function (name) {
        if (name !== undefined) {
            var newRootNode = JSWorkBook.find(name, 'value');
            if (newRootNode !== undefined) {
                $scope.rootPath = name;
                $scope.selectedItem = name;
                print('changing root node to : ' + name);
                var presentation = JSWorkBook.present.getNode(name) || JSWorkBook.present.getRoot();

                presentation.update(JSWorkBook.updateAll);
                navigator.move(presentation.rowId);
                $timeout(function () {
                    $scope.uimodelroot.nodes = [newRootNode]
                    $scope.presentation = presentation;
                    $scope.$broadcast('myCustomEvent', presentation.rowId);

                })
            }
        }
    }
    //default page
    logger.info($scope.page)
    logger.info($scope.pages)

    var pageLookup = $scope.pages.lookup('name', $scope.page || 'Solutions');

    $scope.page = pageLookup;
    $scope.templatePath = '../' + pageLookup.path;

    //load values if Identifier is given in URL
    if ($scope.documentId) {
        $http.get($scope.apiPath + 'DOCUMENT/' + $scope.documentId).success(function (data) {
            if (data !== null && data.values !== undefined) {
                var importResult = JSWorkBook.doImport(data.values, 'docvalues');
                print('Import:' + importResult.valid ? ' success' : 'failed')
            }
        });
    }
    if ($scope.model) {
        var modelName = $scope.model.toUpperCase();
        var httpPromise = $http.get($scope.apiPath + '/SOLUTION/' + modelName);
        //Solution service always return a valid Solution Object
        httpPromise.success(function (dbSolution) {
            //we won't do anything if model is invalid
            if (dbSolution && dbSolution.name !== undefined) {
                $scope.switchModel(dbSolution);
            }
        });
    }
    //function is also called by Solution page
    $scope.switchModel = function (dbSolution) {
        $scope.model = dbSolution.name.toUpperCase();
        $timeout(function () {
            $location.search('model', $scope.model);
        });
        console.time('init-model-' + dbSolution.name);
        JSWorkBook.switchModel(dbSolution, $scope.docValues);

        //these scope members are root of all views in the app, unmapped is not very useful at the moment
        $scope.uimodelroot.nodes = JSWorkBook.getRootNode().nodes;
        JSWorkBook.present.update(JSWorkBook.updateAll);
        console.timeEnd('init-model-' + dbSolution.name);
        $scope.rootNodePath(JSWorkBook.getRootNode().rowId)
    }

    $scope.sendResponse = function () {
        var httpPromise = $http.post($scope.apiPath + '/DOCUMENT/' + $scope.documentId, {
            id: $scope.documentId,
            values: JSWorkBook.export('jsonvalues')
        });
        $scope.myPromise = httpPromise;
        httpPromise.then(function (response) {
            $scope.documentId = response.data.id;
            $location.search('documentId', $scope.documentId);
        }, function (response) {
            console.error(response)
        });
        // Temporary mock method to   test calculate button
        $timeout(function () {
            $scope.rating = ('Rating: ' + Math.floor((Math.random() * 6) + 1) + '+');
        })
    }

    //its not hidden in UI when there is no next
    //so also catch undefined next
    $scope.navigate = function (type) {
        navigator[type]();
        if (navigator._current !== undefined) {
            $scope.rootNodePath(navigator._current.rowId);
            $("html, body").animate({scrollTop: "0px"});
        }
    };
    $scope.matches = function (a, b) {
        return !!a.match(b);
    }

    $scope.InputValid = function (row) {
        if (row === undefined) {
            return true;
        }
        return row.validateInput ? row.validateInput.length === 0 : true;
    }
    /**
     * Initial view count is divided by the node.childrenSize
     * Every branch has its own size to display.
     * If a branch is a leaf we will only subtract one for being a Node it-self.
     * Else divide the total over all children and they again will do the calculation again
     * Avoid devide by zero problems and such
     */
    $scope.calcTotalShow = function (total, node) {
        if (node.isLeaf()) {
            return total - 1;
        }
        var remainder = 0;
        var median = (total - node.nodes.length) / node.nodes.length
        return median;
    }
    $scope.expanded = function (total, node) {
        if (node._Tcollapsed === undefined) {
            return (total >= 1);
        }
        return !node._Tcollapsed;
    }

    $scope.exportValue = function (rowId, row, colId, inputValue) {
        print('setvalue called')
        JSWorkBook.set(rowId, inputValue, colId);
        JSWorkBook.present.update(JSWorkBook.updateAll);
    }
}]);