global.loglevel = 'debug'
var log = require('log6')
var assert = require('assert')
var formula = require('excel-formula');
var graph = require('./fes-dependency')
graph.forEachNode(function (node) {
    node.title = node.id
});
var createSettingsView = require('config.pixel');
var createLegend = require('edgelegend');

var renderGraph = require('ngraph.pixel');
var renderer = renderGraph(graph, {
    interactive: true,
    physics: {
        interactive: true,
        springLength: 60,
        springCoeff: 0.0002,
        gravity: -1.2,
        theta: 0.8,
        dragCoeff: 0.02
    },
    link: function createLinkUI(link) {
        if (link.data === 'hidden') return; // don't need to render!
        // otherwise return default link:
        return {
            fromColor: 0xFF00FF,
            toColor: 0x00FFFF
        };
    }
});
var settings = createSettingsView(renderer);
settings.remove(['View Settings', 'Layout Settings']);

createLegend(settings, 'Groups', [{
    name: 'Q_*',
    color: 0xff0000,
    filter: function (link) {
        return link.fromId.startsWith('Q_');
    }
}]);
log.info('done')
