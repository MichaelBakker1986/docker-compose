var log = require('./ff-log')
for (var i = 0; i < 999999999; i++) {
    if (i % 100000000 == 0)
        log.log('test')
}