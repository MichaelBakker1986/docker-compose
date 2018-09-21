const ls = require("local-storage")

module.exports = function(session) {
   for (var key in session) {
      Object.defineProperty(session, key, function() {
         const akey = key;
         ls.set(key, ls.get(akey) || session[akey])
         return {
            get: function() {
               return ls.get(akey)
            },
            set: function(v) {
               ls.set(akey, v)
            }
         }
      }());
   }
}