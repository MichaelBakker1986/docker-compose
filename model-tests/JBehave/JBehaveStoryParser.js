"format es6";
// ES2016 style
import {wrap} from 'decorator-wrap'


/**
 * @anotheremptyannotation
 */

// CommonJS style
let wrap = require('decorator-wrap').wrap;

var log = (callback, args, name, type) => {
    console.log('Starting  ', type, name);
    var result = callback();
    console.log('Ended: ', name);
    return result;
};
