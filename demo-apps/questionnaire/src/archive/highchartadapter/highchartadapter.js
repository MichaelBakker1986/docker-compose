/**
 turn a Node from a Tree into a highchart-json

 a Node(Node.js) is a Tree Structure Representation of a Solution(Solution.js)

 how a highchart template looks like:

 var highchartdata = {
    chart: {
        type: 'bar' //or column etc..
    },
    title: {
        text: 'Fruit Consumption'
    },
    xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
        title: {
            text: 'Fruit eaten'
        }
    },
    series: [{
        name: 'Jane',
        data: [1, 0, 4]
    },
    {
        name: 'John',
        data: [5, 7, 3]
    }]
}

 So for given a Node, we can create a Highchart JSON object. Update it etc.
 **/
function HighchartNodeAdapter(node)
{
    this.node = node;
}
//call init to construct the output element.
//TODO: make the template customizable
HighchartNodeAdapter.prototype.init = function ()
{
    //the object can only be constructed once
    this.chart = this.chart || {
            chart: {
                type: 'spline',
                marginRight: 10,
                events: {
                    load: function ()
                    {
                        /*  // set up the updating of the chart each second
                         var series = this.series[0];
                         setInterval(function ()
                         {
                         var x = (new Date()).getTime(), // current time
                         y = Math.random();
                         series.addPoint([x, y], true, true);
                         }, 1000);*/
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                /*  formatter: function ()
                 {
                 return '<b>' + this.series.name + '</b><br/>' +
                 Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                 Highcharts.numberFormat(this.y, 2);
                 }*/
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: []
        };
}

HighchartNodeAdapter.prototype.convert = function (value)
{
    this.chart.title.text = this.node.title;

    var itar = 0;
    var children = this.node.childCount();
    for (var i = 0; i < children; i++)
    {
        var child = this.node.getChild(i);
        this.chart.series.push({
            name: child.title,
            data: [{x: itar, y: child.value}]
        })

        //   this.chart.series[0].data.push();
    }
    /*    this.chart.series[0].update({
     pointStart: 0,
     data: {x: 1, y: 1}
     }, true); //true / false to redraw*/

    return this.chart;
}
module.exports = {
    converter: HighchartNodeAdapter,
    forDisplayType: ["chart"]
};

