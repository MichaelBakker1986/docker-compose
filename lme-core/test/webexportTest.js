const assert = require('assert')

function doProxy(workbook, row, column, idx) {
    //temp check, seems to proxy multiple times.
    let rval, vcount;
    var prox = {
        get: function() {
            if (workbook.context.calc_count !== vcount) {
                vcount = workbook.context.calc_count;
                rval = workbook.get(row.id, column, idx, 0);
            }
            return rval;
        }

    }
    if (properties[column].change) {
        prox.set = function(v) {
            //only for 'value,formula_trend,...'
            var value = v === null ? v : (isNaN(v) ? v : parseFloat(v))
            workbook.set(row.id, value, column, idx, 0);
        }
    }
    Object.defineProperty(r, column, prox);
}

function doProxNoCacheAndChange(value) {
    let r;//return value
    let c;//calculation counter
    return {
        get: function() {
            return r;
        },
        set: function(v) {
            r = v;
        }
    }
}

var cantChange = function() {
    throw Error('Not permitted to change this value');
}

function doProxNoChange(value) {
    let r;//return value
    let c;//calculation counter
    return {
        get: function() {
            return r;
        }
    }
}

var object = {}
var objectNoChange = {}
Object.defineProperty(object, 'value', doProxNoCacheAndChange());
Object.defineProperty(objectNoChange, 'value', doProxNoChange());

objectNoChange.value = 1