var graph = require('./fes-dependency')
var createSettingsView = require('ngraph.pixel');

var addCurrentNodeSettings = require('./nodesettings.js');
var renderer = createSettingsView(graph);
var settingsView = createSettingsView(renderer);
var gui = settingsView.gui();