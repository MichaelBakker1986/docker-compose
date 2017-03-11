var log = require('./ff-log')
log.dateformat = "HHMM;ssl"
for (var i = 0; i < 999999999; i++) {
    if (i % 100000000 == 0)
        log.log('test')
}