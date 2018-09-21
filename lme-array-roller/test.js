require('./array-roller')
const assert = require('assert')
const arr = ['a', 'b']
arr.addRoller(2, 'bc4')
arr.addRoller(2, 'bc3')
arr.addRoller(2, 'bc2')
assert.equal(arr.length, 2)
arr.addRoller(3, 'bc1')
assert.equal(arr.length, 3)

const first_arr = [1, 2]
const second_arr = [... first_arr, 3]
console.info(second_arr)