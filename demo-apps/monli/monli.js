angular
    .module('angapp', ["highcharts-ng"])
    .controller('lmeController', function($scope, $http) {
        $scope.changeChoice = function(variable, value) {
            variable.value = value.name
        }
        window.onerror = function errorHandler(msg, url, line) {
            console.log(arguments);
            // Just let default handler run.
            return true;
        }
        $(function() {
            $.ajaxSetup({
                statusCode: {
                    401: function() {
                        console.info('ok')
                        return false;
                    }
                },
                error: function(xhr, status, err) {
                    if (xhr.status == 401)
                        return false;
                }
            });
            $(window).ajaxError(function() {
                console.info('global')
            });
        });

        try {
            $.getScript('resources/KSP.js', function(data, textStatus, jqxhr) {
                for (var name in LME.nodes) {
                    $scope[name] = LME.nodes[name]
                }
                $scope.name = LME.name
            }).fail(function(err) {
                console.info('test')
            }).catch(function(err) {
                //console.error("failed loading ", err);
                console.info("failed loading KSP.js");
            });
        } catch (err) {
            console.info('err')
        }
        $('body').popover({
            selector: '[data-toggle="popover"]'
        });
    });