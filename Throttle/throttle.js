module.exports = function(fn, to) {
   let wrap;

   return function() {
      if (wrap) clearTimeout(wrap);
      wrap = setTimeout(fn, to);
   }
}