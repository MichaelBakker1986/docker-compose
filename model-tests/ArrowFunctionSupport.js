var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify")

browserify()
    .transform(babelify, { presets: ["env"]})
    .require("../lme-model-api/src/lmeAPIWrapper.js", { entry: true })
    .bundle()
    .on("error", function(err) {
        console.log("Error: " + err.message);
    })
    .pipe(fs.createWriteStream("bundle.js"));
/*

browserify( "../../lme-model-api/src/lmeAPIWrapper.js")
    .transform("babelify", {presets: ["env"]})
    .bundle()
    .pipe(fs.createWriteStream(__dirname + "/bundle.js"));
*/
