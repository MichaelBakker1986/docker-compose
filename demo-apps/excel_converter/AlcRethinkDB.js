var acl = require('acl')
var r = require('rethinkdbdash')()
var RethinkDBBackend = require('acl-backend-rethinkdb')

var options = {
   prefix     : 'acl_',
   useSingle  : true,
   ensureTable: true
}

acl = new acl(new RethinkDBBackend(r, options))
acl.addUserRoles('john', 'admin', function(err) {
   console.info('done')
})