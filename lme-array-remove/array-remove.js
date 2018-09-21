if (!Array.prototype.removeByName)
    Object.defineProperty(Array.prototype, 'removeByName', {
        enumerable: false,
        value     : function() {
            var what, a = arguments, L = a.length, ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            return this;
        }
    });
else console.warn('Trying to overwrite removeByName')