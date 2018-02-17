const log = require('log6')
const arr = [[1, 2], [2, 2], [3, 3], [4, 4]].map((numb) => {
    return { name: numb[0], y: numb[1] }
})
log.info(arr)