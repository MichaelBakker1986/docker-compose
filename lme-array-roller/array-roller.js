if (!Array.prototype.addRoller)
    Object.defineProperty(Array.prototype, 'addRoller', {
        enumerable: false,
        value     : function(maxlines, val) {
            this.unshift(val)
            if (this.length > maxlines) this.pop()
        }
    });
else console.warn('Trying to overwrite addRoller')