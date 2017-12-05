var params = window.location.href.split('#')
if (params.length == 1) window.location.href = '#DEMO&DEMO'

angular
    .module('angapp', ["highcharts-ng"])
    .controller('lmeController', function($scope, $http, $rootScope) {
        $scope.demos = [
            {
                name: "Formula example",
                ffl: "variable LEASE_CALCULATOR\n" +
                "{\n" +
                " title: \"Lease calculator\";\n" +
                " datatype: number;\n" +
                " formula: 100 + 200;\n" +
                "}"
            },
            {
                name: "Memo",
                ffl: "variable LEASE_DETAILS\n" +
                "{\n" +
                " title: \"Lease information\";\n" +
                " datatype: string;\n" +
                " displaytype: memo;\n" +
                " formula: \"\";\n" +
                "}"
            },
            {
                name: "Calculate",
                ffl: "variable LEASE_AMMOUNT\n" +
                "{\n" +
                " title: \"Cars to lease\";\n" +
                " datatype: number;\n" +
                " formula: 100;\n" +
                "}\n" +
                "variable LEASE_COST\n" +
                "{\n" +
                " title: \"Price per lease\";\n" +
                " datatype: number;\n" +
                " formula: 100.00;\n" +
                "}\n" +
                "variable LEASE_TOTAL\n" +
                "{\n" +
                " title: \"Lease Total\";\n" +
                " datatype: number;\n" +
                " fixed_decimals: 2;\n" +
                " formula: ZeroOnNaN(LEASE_AMMOUNT * LEASE_COST);\n" +
                "}"
            },
            {
                name: "Dropdown",
                ffl: "variable LEASE_PRIVATE\n" +
                "{\n" +
                " title: \"Private lease?\";\n" +
                " datatype: number;\n" +
                " displaytype: select;\n" +
                " choices: \"0:Nee|1:Ja\";\n" +
                "}"
            },
            {
                name: "Radio",
                ffl: "variable LEASE_PRIVATE\n" +
                "{\n" +
                " title: \"Private lease?\";\n" +
                " datatype: number;\n" +
                " displaytype: select;\n" +
                " choices: \"0:Nee|1:Ja\";\n" +
                "}"
            },
            {
                name: "Piechart",
                ffl: "variable LEASE_RATIO\n" +
                "{\n" +
                " title: \"Lease ratios\";\n" +
                " datatype: matrix;\n" +
                " formula: [[\"Private\",40],[\"Business\",70]];\n" +
                " displaytype: piechart;\n" +
                "}"
            },
            {
                name: "Behaviors",
                ffl: "variable BEHAVIORS\n" +
                "{\n" +
                " title: \"Lease contract\";\n" +
                " datatype: string;\n" +
                " visible: 1;\n" +
                " locked: 1;\n" +
                " inputRequired: 1;\n" +
                " displaytype: memo;\n" +
                "}"
            }
        ]
        $scope.loadFFL = function(ffl) {
            LMEMETA.importFFL("\nmodel TEST uses BaseModel\n{\nroot\n{\n" + ffl + "\n}\n}")
            const webModel = LMEMETA.exportWebModel()
            for (var key in webModel.nodes) {
                $scope[key] = webModel.nodes[key]
            }
            LMEMETA.loadData(function(response) {
                $scope.$digest()
            })
        }
        $(window).bind('keydown', function(event) {
            if (event.ctrlKey || event.metaKey) {
                switch (String.fromCharCode(event.which).toLowerCase()) {
                    case 's':
                        event.preventDefault();
                        $scope.saveData();
                        break;
                }
            }
        });
        $scope.saveData = function() {
            Pace.start();
            LMEMETA.persistData(function(response) {
                $scope.$broadcast('someEvent', [1, 2, 3]);
                $scope.$digest()
            });
        }
    })