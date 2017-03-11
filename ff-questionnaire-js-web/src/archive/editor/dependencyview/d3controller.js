var APP = require('../../app.js');
APP.pages.push({name: 'charts', title: 'Chart Visualizing', order: 4, icon: 'fa-line-chart', path: '/src/archive/editor/dependencyview/dependencies.html'});
var GenericModelFile = require('../../fesjs/GenericModelFile.js');
function linkArc(d)
{
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}
//http://mbostock.github.io/d3/talk/20111018/cluster.html
http://mbostock.github.io/d3/talk/20111116/bundle.html
    function transform(d)
    {
        return "translate(" + d.x + "," + d.y + ")";
    }
//Helper, to clone tree's and replace members from map
//Looks like the one in AST
function cloneTree(obj, map)
{
    if (obj === null || typeof obj !== 'object')
    {
        return obj;
    }
    var temp = Array.isArray(obj) ? [] : {};    //obj.constructor(); // give temp the original obj's constructor
    for (var key in obj)
    {
        if (key.startsWith('_') || key.startsWith('$') || ((typeof obj[key] === 'function')))
        {
            continue;
        }
        temp[map[key] || key] = cloneTree(obj[key], map);
    }
    return temp;
}
var d3Chart = require('./dndTree.js');
var WorkBook = require('../../fesjs/JSWorkBook.js')
var wb = new WorkBook();
APP.controller('visual', ['$timeout', '$scope', '$http', '$location', '$window', function ($timeout, $scope, $http, $location, $window)
{
    $scope.renderers = [
        {
            name: 'TreeGraph',
            render: function (element)
            {
                //copy original tree, and map some members
                var treeData = cloneTree($scope.presentation || {name: 'root'}, {nodes: 'children', rowId: 'name', count: 'size'})
                d3Chart(treeData, element);
            }
        }, {
            name: "PlotCirleChart",
            render: function (element)
            {
                //filter for requested variables, so al already has to know which variables we want to scan
                var names = new Set();
                //get all recursive childnames
                names.add($scope.presentation.rowId);
                $scope.presentation.visit(function (child)
                {
                    names.add(child.rowId);
                })
                function correctName(name)
                {
                    return names.has(name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1'));
                }

                /*          var data2 = {
                 packageNames: ['Main', 'A', 'B'],
                 matrix: [[1, 1, 1], // Main depends on A and B
                 [1, 1, 1], // A depends on B
                 [1, 1, 1]] // B doesn't depend on A or Main
                 };*/
                var matrix = GenericModelFile.generateDependencyMatrix(correctName);
                //strip out SOLUTIONNAME_*_VALUE
                for (var i = 0; i < matrix.packageNames.length; i++)
                {
                    matrix.packageNames[i] = matrix.packageNames[i].replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
                }
                if (matrix.matrix.length === 0)
                {
                    return;
                }
                try
                {
                    //exception like endAngle are common for this visualizers
                    var chart = d3.chart.dependencyWheel();
                    chart.width(element[0].clientWidth);

                    d3.select(element[0])
                        .datum({
                            matrix: matrix.matrix,
                            packageNames: matrix.packageNames
                        })
                        .call(chart);
                }
                catch (e)
                {
                    console.error(e);
                }
            }
        }, {
            name: 'Traditional',
            render: function (element)
            {
                var links = [];
                var names = new Set();
                //get all recursive childnames
                names.add($scope.presentation.rowId);
                $scope.presentation.visit(function (child)
                {
                    names.add(child.rowId);
                })

                var formulas = [];
                //get all value formula's
                names.forEach(function (name)
                {
                    var formula = GenericModelFile.getFormula(name, 'value');
                    if (formula)
                    {
                        formulas.push(GenericModelFile.getFormula(name, 'value'));
                    }
                })
                var accociatons = {
                    deps: new Set(),
                    refs: new Set()
                }

                for (var i = 0; i < formulas.length; i++)
                {
                    accociatons[formulas[i].name.replace(/^[^_]+_([\w]*)_\w+$/gi, '$1')] = {refs: 0, deps: 0};
                }
                for (var i = 0; i < formulas.length; i++)
                {
                    var formula = formulas[i];
                    var formulaName = formula.name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
                    formula.formulaDependencys.forEach(function (accociation)
                    {
                        var accociationName = accociation.name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
                        if (accociation.refId && !accociatons[accociation.association].has(accociationName))
                        {
                            var opposite = accociation.association === 'refs' ? 'deps' : 'refs';
                            if (!accociatons[accociationName])
                            {
                                //special case, they go outside the scope
                                //for now we are discarding them
                                return;
                            }
                            accociatons[formulaName][accociation.association] = accociatons[formulaName][accociation.association] + 1;
                            accociatons[accociationName][opposite] = accociatons[accociationName][opposite] + 1;

                            var link = {
                                source: formulaName,
                                target: accociationName,
                                type: accociation.association === 'refs' ? "resolved" : "licensing",
                                formula: GenericModelFile.findFormulaByIndex(accociation.refId).original
                            };
                            links.push(link);
                        }
                        accociatons[accociation.association].add(accociationName)
                    })
                }
                //filter unbound nodes, they are not interesting
                console.info(accociatons)
//filter out unbind formulas
                var nodes = {};
// Compute the distinct nodes from the links.
                links.forEach(function (link)
                {
                    link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
                    link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
                });
                var width = element[0].clientWidth;
                var height = element[0].clientWidth;
                var force = d3.layout.force()
                    .nodes(d3.values(nodes))
                    .links(links)
                    .size([width, height])
                    .linkDistance(60)
                    .charge(-300)
                    .on("tick", tick)
                    .start();

                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width)
                    .attr("height", height);

// Per-type markers, as they don't inherit styles.
                svg.append("defs").selectAll("marker")
                    .data(["suit", "licensing", "resolved"])
                    .enter().append("marker")
                    .attr("id", function (d) { return d; })
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 15)
                    .attr("refY", -1.5)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5");

                var path = svg.append("g").selectAll("path")
                    .data(force.links())
                    .enter().append("path")
                    .attr("class", function (d) { return "link " + d.type; })
                    .attr("title", function (d) { return d.formula; })
                    .attr("marker-end", function (d) { return "url(#" + d.type + ")"; })


                var circle = svg.append("g").selectAll("circle")
                    .data(force.nodes())
                    .enter().append("circle")
                    .attr("r", 6)
                    .call(force.drag);

                var text = svg.append("g").selectAll("text")
                    .data(force.nodes())
                    .enter().append("text")
                    .attr("x", 8)
                    .attr("y", ".31em")
                    .text(function (d) { return d.name; });

// Use elliptical arc path segments to doubly-encode directionality.
                function tick()
                {
                    path.attr("d", linkArc);
                    circle.attr("transform", transform);
                    text.attr("transform", transform);
                }

                function linkArc(d)
                {
                    var dx = d.target.x - d.source.x,
                        dy = d.target.y - d.source.y,
                        dr = Math.sqrt(dx * dx + dy * dy);
                    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                }

                function transform(d)
                {
                    return "translate(" + d.x + "," + d.y + ")";
                }
            }
        }]
}]);
APP.directive('d3Chart', function ()
{
    return {
        link: function ($scope, element, attrs)
        {
            $scope.$on('myCustomEvent', function (event, data)
            {
                element.find('svg').remove();
                $scope.renderer.render(element);
            });
            if ($scope.presentation && $scope.presentation)
            {
                $scope.renderer.render(element);
            }
        }
    }
});