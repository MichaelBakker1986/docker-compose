angular
    .module('angapp', ["highcharts-ng"])
    .controller('lmeController', function($scope, $http) {
        $scope.changeChoice = function(variable, value) {
            variable.value = value.name
        }
        window.onerror = function errorHandler(msg, url, line) {
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
                console.error('global ajax error')
            });
        });

        try {
            $.getScript('resources/KSP.js', function(data, textStatus, jqxhr) {
                for (var name in LME.nodes) {
                    $scope[name] = LME.nodes[name]
                }
                $scope.name = LME.name
            }).fail(function(err) {
                console.info('Failed loading ksp.js')
            }).catch(function(err) {
                console.info("failed loading KSP.js");
            });
        } catch (err) {
            console.info('Failed loading ksp.js',err)
        }
        $('body').popover({
            selector: '[data-toggle="popover"]'
        });
    });