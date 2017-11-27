var fs = require("fs");
var browserify = require("browserify");
browserify("./ArrowFunctionScript.js")
    .transform("babelify", {presets: ["env"]})
    .bundle()
    .pipe(fs.createWriteStream(__dirname + "/bundle.js"));
