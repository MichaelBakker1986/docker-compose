require('./array-remove')
const assert = require('assert')
const ary = ['three', 'seven', 'eleven'];
ary.removeByName('seven');
assert.equal(ary.length, 2)