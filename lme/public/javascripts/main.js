/**
 * UI Canvas part
 */
var modelengine = require('./lme');
DEBUG = true;
var counter = 0;

function prox(row, column, value) {
    if (column.name === 'name') {
        row[column.name] = value;
        return;
    }
    var icount = -1;
    var rval;
    Object.defineProperty(row, column.name, {
        get: function() {
            if (DEBUG) {
                return value;
            }
            if (icount !== counter) {
                icount = counter;
                rval = modelengine.get(row.name, column.name, 0, 0);
                if (typeof(rval) === 'object') {
                    rval = 1;
                }
            }
            return rval;
        },
        set: function(v) {
            counter++;
            value = v;
        }
    });
}

function demo() {

    var typeMap = {
        'text': 'string',
        'money': 'number',
        'number': 'number'
    };

    function isNoiseData(name) {
        return ['choices'].indexOf(name) !== -1;
    }

    function parseOpenData(openData) {
        var data, schema = [];
        openData.meta.view.columns.forEach(function(column) {
            if (isNoiseData(column.name)) {
                column.hidden = true;
            }
            column.type = typeMap[column.dataTypeName] || 'string';
            schema.push(column);
        });

        data = openData.data.map(function(row) {
                var r = {};
                schema.forEach(function(column, index) {
                    prox(r, column, row[index])
                });
                return r;
            }
        );
        return {
            data: data,
            schema: schema
        };
    }

    var Xgrid = canvasDatagrid({
        tree: true,
        parentNode: document.getElementById('grid'),
        borderDragBehavior: 'move',
        allowMovingSelection: true,
        columnHeaderClickBehavior: 'select'
    });
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('progress', function(e) {
        Xgrid.data = [{status: 'Loading data: ' + e.loaded + ' of ' + (e.total || 'unknown') + ' bytes...'}];
    });
    xhr.addEventListener('load', function(e) {
        Xgrid.data = [{status: 'Loading data ' + e.loaded + '...'}];
        let returnData = JSON.parse(this.responseText);
        var openData = parseOpenData(returnData);
        Xgrid.schema = openData.schema;
        Xgrid.data = openData.data;

        modelengine.importSolution(returnData, "lme");
        //modelengine.fixProblemsInImportedSolution();
    });
    var modelName = 'V05';
    try {
        modelName = window.location.search.split('model=')[1] || 'V05';
    } catch (err) {
        modelName = 'V05'
    }
    xhr.open('GET', '/public/json/' + modelName + '_canvas.json');
    xhr.send();
}
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', demo);
} else {
    setTimeout(function() {
        'use strict';
        demo();
    }, 500);
}

var langTools = ace.require("ace/ext/language_tools");
/*   ace.require("ace/ext/beautify");*/
/*ace.require("ace/mode/javascript");*/
ace.require("ace/mode/json");
editor.setOptions({
    showGutter: true,
    enableBasicAutocompletion: false,
    enableSnippets: true,
    enableLiveAutocompletion: true
});