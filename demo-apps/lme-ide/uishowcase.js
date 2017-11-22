angular
    .module('angapp', [])
    .controller('lmeController', function($scope, $http, $rootScope) {
        $scope.formulaExample = "variable LEASE_CALCULATOR\n" +
            "{\n" +
            " datatype: number;\n" +
            " formula: 100 + 200;\n" +
            " title: \"Lease calculator\";\n" +
            "}"
        $scope.memoFFL = "variable LEASE_DETAILS\n" +
            "{\n" +
            " title: \"Lease information\";\n" +
            " datatype: string;\n" +
            " displaytype: memo;\n" +
            " formula: \"\";\n" +
            "}"
        $scope.calculateExample = "variable LEASE_AMMOUNT\n" +
            "{\n" +
            " title: \"Cars to lease\";\n" +
            " datatype: number;\n" +
            " formula: 100;\n" +
            "}\n" +
            "variable LEASE_TOTAL\n" +
            "{\n" +
            " title: \"Lease Total\";\n" +
            " datatype: number;\n" +
            " formula: LEASE_AMMOUNT * 100;\n" +
            "}"

        $scope.loadFFL = function(ffl) {
            LMEMETA.importFFL("\nmodel TEST uses BaseModel\n{\nroot\n{\n" + ffl + "\n}\n}")
            const webModel = LMEMETA.exportWebModel()
            for (var key in webModel.nodes) {
                $scope[key] = webModel.nodes[key]
            }
        }
    })