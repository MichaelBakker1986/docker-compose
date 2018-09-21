'use strict';

var port = process.env.PORT || 8084;
var host = process.env.HOST || '127.0.0.1';
var welcome = process.env.WELCOME || 'index.html';
var hipchat = require('lme-hipchat-connect');
var validate_page = require('./web/page');
var production = process.env.NODE_ENV == 'production';
var babelify = require('babelify');
require('babel-preset-env');
require('babel-preset-es2015');
require('babel-preset-stage-2');
require('es6-string-polyfills');

var browserify = require('browserify-middleware');
browserify.settings({
    transform: [[babelify, {
        presets: ['env', 'es2015', 'stage-2', 'es6-string-polyfills'],
        sourceMapsAbsolute: true
    }]]
});

var excel_api = require('../../excel-connect/ExcelToRegister');
var domain = process.env.DOMAIN || host + ':' + port + '/';
var app = require('express')();
var fileUpload = require('express-fileupload');
app.use(fileUpload());
var browser_opts = {
    cache: production,
    gzip: production,
    insertGlobals: true,
    debug: production,
    minify: production,
    precompile: production
};

require('./web/SocialLogin').setup(app);
app.get('/app.js', browserify(__dirname + '/web/uiapp.js', browser_opts));
app.get('/diff.js', browserify(__dirname + '/web/diff.js', browser_opts));
app.get('/validator.js', browserify(__dirname + '/web/validator.js', browser_opts));
app.get('/', function (req, res) {
    return res.sendFile(__dirname + '/web/' + welcome);
});
app.get('/testfile.xlsx', function (req, res) {
    return res.sendFile(__dirname + '/resources/MagixIdea.xlsx');
});
app.get('/background.jpg', function (req, res) {
    return res.sendFile(__dirname + '/web/background.jpg');
});
app.get('/VASTGOED.ffl', function (req, res) {
    return res.sendFile(__dirname + '/resources/VASTGOED.ffl');
});
app.get('/diff.html', function (req, res) {
    return res.sendFile(__dirname + '/web/diff.html');
});
app.get('/validate.html', function (req, res) {
    return res.send(validate_page.page);
});
app.get('/index.html', function (req, res) {
    return res.sendFile(__dirname + '/web/index.html');
});
app.get('/converter.html', function (req, res) {
    return res.sendFile(__dirname + '/web/index.html');
});
var excel_file_mod = 0;
app.post('/upload', function (req, res) {
    if (!req.files) return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var sampleFile = req.files.presentation;
    var path = './excel_file' + excel_file_mod++ % 10 + ".xlsx";
    sampleFile.mv(path, function (err) {
        if (err) return res.status(500).send(err);
        excel_api(path, {
            root_name: 'Q_ROOT',
            name: 'VASTGOED',
            presentation_sheet_name: 'Presentation',
            columns: ["rownumber", "description", "level", "name", "*", "*", "required", "visible"]
        }).then(function (result) {
            return res.end(JSON.stringify({
                audit: result.audit,
                register: result.register,
                ffl: result.ffl.join('\n')
            }));
        });
    });
});
app.listen(port, function () {
    hipchat.log('<span>' + (production ? 'Production' : 'Develop') + ' converter server </span><a href="http://' + domain + 'index.html">server</a><span> deployed</span>');
    hipchat.log('<span>' + (production ? 'Production' : 'Develop') + ' validator server </span><a href="http://' + domain + 'validate.html">server</a><span> deployed</span>');
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4Y2VsX2NvbnZlcnRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sT0FBTyxRQUFRLEdBQVIsQ0FBWSxJQUFaLElBQW9CLElBQWpDO0FBQ0EsSUFBTSxPQUFPLFFBQVEsR0FBUixDQUFZLElBQVosSUFBb0IsV0FBakM7QUFDQSxJQUFNLFVBQVUsUUFBUSxHQUFSLENBQVksT0FBWixJQUF1QixZQUF2QztBQUNBLElBQU0sVUFBVSxRQUFRLHFCQUFSLENBQWhCO0FBQ0EsSUFBTSxnQkFBZ0IsUUFBUSxZQUFSLENBQXRCO0FBQ0EsSUFBTSxhQUFhLFFBQVEsR0FBUixDQUFZLFFBQVosSUFBd0IsWUFBM0M7QUFDQSxJQUFNLFdBQVcsUUFBUSxVQUFSLENBQWpCO0FBQ0EsUUFBUSxrQkFBUjtBQUNBLFFBQVEscUJBQVI7QUFDQSxRQUFRLHNCQUFSO0FBQ0EsUUFBUSxzQkFBUjs7QUFFQSxJQUFNLGFBQWEsUUFBUSx1QkFBUixDQUFuQjtBQUNBLFdBQVcsUUFBWCxDQUFvQjtBQUNoQixlQUFXLENBQUMsQ0FBQyxRQUFELEVBQVc7QUFDbkIsaUJBQW9CLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsU0FBbEIsRUFBNkIsc0JBQTdCLENBREQ7QUFFbkIsNEJBQW9CO0FBRkQsS0FBWCxDQUFEO0FBREssQ0FBcEI7O0FBT0EsSUFBTSxZQUFZLFFBQVEscUNBQVIsQ0FBbEI7QUFDQSxJQUFNLFNBQVMsUUFBUSxHQUFSLENBQVksTUFBWixJQUF1QixPQUFPLEdBQVAsR0FBYSxJQUFiLEdBQW9CLEdBQTFEO0FBQ0EsSUFBTSxNQUFNLFFBQVEsU0FBUixHQUFaO0FBQ0EsSUFBTSxhQUFhLFFBQVEsb0JBQVIsQ0FBbkI7QUFDQSxJQUFJLEdBQUosQ0FBUSxZQUFSO0FBQ0EsSUFBTSxlQUFlO0FBQ2pCLFdBQWUsVUFERTtBQUVqQixVQUFlLFVBRkU7QUFHakIsbUJBQWUsSUFIRTtBQUlqQixXQUFlLFVBSkU7QUFLakIsWUFBZSxVQUxFO0FBTWpCLGdCQUFlO0FBTkUsQ0FBckI7O0FBU0EsUUFBUSxtQkFBUixFQUE2QixLQUE3QixDQUFtQyxHQUFuQztBQUNBLElBQUksR0FBSixDQUFRLFNBQVIsRUFBbUIsV0FBVyxZQUFZLGVBQXZCLEVBQXdDLFlBQXhDLENBQW5CO0FBQ0EsSUFBSSxHQUFKLENBQVEsVUFBUixFQUFvQixXQUFXLFlBQVksY0FBdkIsRUFBdUMsWUFBdkMsQ0FBcEI7QUFDQSxJQUFJLEdBQUosQ0FBUSxlQUFSLEVBQXlCLFdBQVcsWUFBWSxtQkFBdkIsRUFBNEMsWUFBNUMsQ0FBekI7QUFDQSxJQUFJLEdBQUosQ0FBUSxHQUFSLEVBQWEsVUFBQyxHQUFELEVBQU0sR0FBTjtBQUFBLFdBQWMsSUFBSSxRQUFKLENBQWEsWUFBWSxPQUFaLEdBQXNCLE9BQW5DLENBQWQ7QUFBQSxDQUFiO0FBQ0EsSUFBSSxHQUFKLENBQVEsZ0JBQVIsRUFBMEIsVUFBQyxHQUFELEVBQU0sR0FBTjtBQUFBLFdBQWMsSUFBSSxRQUFKLENBQWEsWUFBWSwyQkFBekIsQ0FBZDtBQUFBLENBQTFCO0FBQ0EsSUFBSSxHQUFKLENBQVEsaUJBQVIsRUFBMkIsVUFBQyxHQUFELEVBQU0sR0FBTjtBQUFBLFdBQWMsSUFBSSxRQUFKLENBQWEsWUFBWSxxQkFBekIsQ0FBZDtBQUFBLENBQTNCO0FBQ0EsSUFBSSxHQUFKLENBQVEsZUFBUixFQUF5QixVQUFDLEdBQUQsRUFBTSxHQUFOO0FBQUEsV0FBYyxJQUFJLFFBQUosQ0FBYSxZQUFZLHlCQUF6QixDQUFkO0FBQUEsQ0FBekI7QUFDQSxJQUFJLEdBQUosQ0FBUSxZQUFSLEVBQXNCLFVBQUMsR0FBRCxFQUFNLEdBQU47QUFBQSxXQUFjLElBQUksUUFBSixDQUFhLFlBQVksZ0JBQXpCLENBQWQ7QUFBQSxDQUF0QjtBQUNBLElBQUksR0FBSixDQUFRLGdCQUFSLEVBQTBCLFVBQUMsR0FBRCxFQUFNLEdBQU47QUFBQSxXQUFjLElBQUksSUFBSixDQUFTLGNBQWMsSUFBdkIsQ0FBZDtBQUFBLENBQTFCO0FBQ0EsSUFBSSxHQUFKLENBQVEsYUFBUixFQUF1QixVQUFDLEdBQUQsRUFBTSxHQUFOO0FBQUEsV0FBYyxJQUFJLFFBQUosQ0FBYSxZQUFZLGlCQUF6QixDQUFkO0FBQUEsQ0FBdkI7QUFDQSxJQUFJLEdBQUosQ0FBUSxpQkFBUixFQUEyQixVQUFDLEdBQUQsRUFBTSxHQUFOO0FBQUEsV0FBYyxJQUFJLFFBQUosQ0FBYSxZQUFZLGlCQUF6QixDQUFkO0FBQUEsQ0FBM0I7QUFDQSxJQUFJLGlCQUFpQixDQUFyQjtBQUNBLElBQUksSUFBSixDQUFTLFNBQVQsRUFBb0IsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFjO0FBQzlCLFFBQUksQ0FBQyxJQUFJLEtBQVQsRUFBZ0IsT0FBTyxJQUFJLE1BQUosQ0FBVyxHQUFYLEVBQWdCLElBQWhCLENBQXFCLHlCQUFyQixDQUFQO0FBQ2hCO0FBQ0EsUUFBSSxhQUFhLElBQUksS0FBSixDQUFVLFlBQTNCO0FBQ0EsUUFBTSxPQUFPLGlCQUFrQixtQkFBbUIsRUFBckMsR0FBMkMsT0FBeEQ7QUFDQSxlQUFXLEVBQVgsQ0FBYyxJQUFkLEVBQW9CLFVBQUMsR0FBRCxFQUFTO0FBQ3pCLFlBQUksR0FBSixFQUFTLE9BQU8sSUFBSSxNQUFKLENBQVcsR0FBWCxFQUFnQixJQUFoQixDQUFxQixHQUFyQixDQUFQO0FBQ1Qsa0JBQVUsSUFBVixFQUFnQjtBQUNaLHVCQUF5QixRQURiO0FBRVosa0JBQXlCLFVBRmI7QUFHWixxQ0FBeUIsY0FIYjtBQUlaLHFCQUF5QixDQUFDLFdBQUQsRUFBYyxhQUFkLEVBQTZCLE9BQTdCLEVBQXNDLE1BQXRDLEVBQThDLEdBQTlDLEVBQW1ELEdBQW5ELEVBQXdELFVBQXhELEVBQW9FLFNBQXBFO0FBSmIsU0FBaEIsRUFLRyxJQUxILENBS1E7QUFBQSxtQkFBVSxJQUFJLEdBQUosQ0FBUSxLQUFLLFNBQUwsQ0FBZTtBQUNyQyx1QkFBVSxPQUFPLEtBRG9CO0FBRXJDLDBCQUFVLE9BQU8sUUFGb0I7QUFHckMscUJBQVUsT0FBTyxHQUFQLENBQVcsSUFBWCxDQUFnQixJQUFoQjtBQUgyQixhQUFmLENBQVIsQ0FBVjtBQUFBLFNBTFI7QUFVSCxLQVpEO0FBYUgsQ0FsQkQ7QUFtQkEsSUFBSSxNQUFKLENBQVcsSUFBWCxFQUFpQixZQUFNO0FBQ25CLFlBQVEsR0FBUixDQUFZLFlBQVksYUFBYSxZQUFiLEdBQTRCLFNBQXhDLElBQXFELDJDQUFyRCxHQUFtRyxNQUFuRyxHQUE0Ryw4Q0FBeEg7QUFDQSxZQUFRLEdBQVIsQ0FBWSxZQUFZLGFBQWEsWUFBYixHQUE0QixTQUF4QyxJQUFxRCwyQ0FBckQsR0FBbUcsTUFBbkcsR0FBNEcsaURBQXhIO0FBQ0gsQ0FIRCIsImZpbGUiOiJzY3JpcHQtY29tcGlsZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA4MDg0O1xyXG5jb25zdCBob3N0ID0gcHJvY2Vzcy5lbnYuSE9TVCB8fCAnMTI3LjAuMC4xJ1xyXG5jb25zdCB3ZWxjb21lID0gcHJvY2Vzcy5lbnYuV0VMQ09NRSB8fCAnaW5kZXguaHRtbCdcclxuY29uc3QgaGlwY2hhdCA9IHJlcXVpcmUoJ2xtZS1oaXBjaGF0LWNvbm5lY3QnKVxyXG5jb25zdCB2YWxpZGF0ZV9wYWdlID0gcmVxdWlyZSgnLi93ZWIvcGFnZScpXHJcbmNvbnN0IHByb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PSAncHJvZHVjdGlvbic7XHJcbmNvbnN0IGJhYmVsaWZ5ID0gcmVxdWlyZSgnYmFiZWxpZnknKVxyXG5yZXF1aXJlKCdiYWJlbC1wcmVzZXQtZW52JylcclxucmVxdWlyZSgnYmFiZWwtcHJlc2V0LWVzMjAxNScpXHJcbnJlcXVpcmUoJ2JhYmVsLXByZXNldC1zdGFnZS0yJylcclxucmVxdWlyZSgnZXM2LXN0cmluZy1wb2x5ZmlsbHMnKVxyXG5cclxuY29uc3QgYnJvd3NlcmlmeSA9IHJlcXVpcmUoJ2Jyb3dzZXJpZnktbWlkZGxld2FyZScpO1xyXG5icm93c2VyaWZ5LnNldHRpbmdzKHtcclxuICAgIHRyYW5zZm9ybTogW1tiYWJlbGlmeSwge1xyXG4gICAgICAgIHByZXNldHMgICAgICAgICAgIDogWydlbnYnLCAnZXMyMDE1JywgJ3N0YWdlLTInLCAnZXM2LXN0cmluZy1wb2x5ZmlsbHMnXSxcclxuICAgICAgICBzb3VyY2VNYXBzQWJzb2x1dGU6IHRydWVcclxuICAgIH1dXVxyXG59KVxyXG5cclxuY29uc3QgZXhjZWxfYXBpID0gcmVxdWlyZSgnLi4vLi4vZXhjZWwtY29ubmVjdC9FeGNlbFRvUmVnaXN0ZXInKVxyXG5jb25zdCBkb21haW4gPSBwcm9jZXNzLmVudi5ET01BSU4gfHwgKGhvc3QgKyAnOicgKyBwb3J0ICsgJy8nKTtcclxuY29uc3QgYXBwID0gcmVxdWlyZSgnZXhwcmVzcycpKCk7XHJcbmNvbnN0IGZpbGVVcGxvYWQgPSByZXF1aXJlKCdleHByZXNzLWZpbGV1cGxvYWQnKTtcclxuYXBwLnVzZShmaWxlVXBsb2FkKCkpO1xyXG5jb25zdCBicm93c2VyX29wdHMgPSB7XHJcbiAgICBjYWNoZSAgICAgICAgOiBwcm9kdWN0aW9uLFxyXG4gICAgZ3ppcCAgICAgICAgIDogcHJvZHVjdGlvbixcclxuICAgIGluc2VydEdsb2JhbHM6IHRydWUsXHJcbiAgICBkZWJ1ZyAgICAgICAgOiBwcm9kdWN0aW9uLFxyXG4gICAgbWluaWZ5ICAgICAgIDogcHJvZHVjdGlvbixcclxuICAgIHByZWNvbXBpbGUgICA6IHByb2R1Y3Rpb25cclxufVxyXG5cclxucmVxdWlyZSgnLi93ZWIvU29jaWFsTG9naW4nKS5zZXR1cChhcHApXHJcbmFwcC5nZXQoJy9hcHAuanMnLCBicm93c2VyaWZ5KF9fZGlybmFtZSArICcvd2ViL3VpYXBwLmpzJywgYnJvd3Nlcl9vcHRzKSk7XHJcbmFwcC5nZXQoJy9kaWZmLmpzJywgYnJvd3NlcmlmeShfX2Rpcm5hbWUgKyAnL3dlYi9kaWZmLmpzJywgYnJvd3Nlcl9vcHRzKSk7XHJcbmFwcC5nZXQoJy92YWxpZGF0b3IuanMnLCBicm93c2VyaWZ5KF9fZGlybmFtZSArICcvd2ViL3ZhbGlkYXRvci5qcycsIGJyb3dzZXJfb3B0cykpO1xyXG5hcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiByZXMuc2VuZEZpbGUoX19kaXJuYW1lICsgJy93ZWIvJyArIHdlbGNvbWUpKTtcclxuYXBwLmdldCgnL3Rlc3RmaWxlLnhsc3gnLCAocmVxLCByZXMpID0+IHJlcy5zZW5kRmlsZShfX2Rpcm5hbWUgKyAnL3Jlc291cmNlcy9NYWdpeElkZWEueGxzeCcpKTtcclxuYXBwLmdldCgnL2JhY2tncm91bmQuanBnJywgKHJlcSwgcmVzKSA9PiByZXMuc2VuZEZpbGUoX19kaXJuYW1lICsgJy93ZWIvYmFja2dyb3VuZC5qcGcnKSk7XHJcbmFwcC5nZXQoJy9WQVNUR09FRC5mZmwnLCAocmVxLCByZXMpID0+IHJlcy5zZW5kRmlsZShfX2Rpcm5hbWUgKyAnL3Jlc291cmNlcy9WQVNUR09FRC5mZmwnKSk7XHJcbmFwcC5nZXQoJy9kaWZmLmh0bWwnLCAocmVxLCByZXMpID0+IHJlcy5zZW5kRmlsZShfX2Rpcm5hbWUgKyAnL3dlYi9kaWZmLmh0bWwnKSk7XHJcbmFwcC5nZXQoJy92YWxpZGF0ZS5odG1sJywgKHJlcSwgcmVzKSA9PiByZXMuc2VuZCh2YWxpZGF0ZV9wYWdlLnBhZ2UpKTtcclxuYXBwLmdldCgnL2luZGV4Lmh0bWwnLCAocmVxLCByZXMpID0+IHJlcy5zZW5kRmlsZShfX2Rpcm5hbWUgKyAnL3dlYi9pbmRleC5odG1sJykpO1xyXG5hcHAuZ2V0KCcvY29udmVydGVyLmh0bWwnLCAocmVxLCByZXMpID0+IHJlcy5zZW5kRmlsZShfX2Rpcm5hbWUgKyAnL3dlYi9pbmRleC5odG1sJykpO1xyXG5sZXQgZXhjZWxfZmlsZV9tb2QgPSAwO1xyXG5hcHAucG9zdCgnL3VwbG9hZCcsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgaWYgKCFyZXEuZmlsZXMpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCgnTm8gZmlsZXMgd2VyZSB1cGxvYWRlZC4nKTtcclxuICAgIC8vIFRoZSBuYW1lIG9mIHRoZSBpbnB1dCBmaWVsZCAoaS5lLiBcInNhbXBsZUZpbGVcIikgaXMgdXNlZCB0byByZXRyaWV2ZSB0aGUgdXBsb2FkZWQgZmlsZVxyXG4gICAgbGV0IHNhbXBsZUZpbGUgPSByZXEuZmlsZXMucHJlc2VudGF0aW9uO1xyXG4gICAgY29uc3QgcGF0aCA9ICcuL2V4Y2VsX2ZpbGUnICsgKGV4Y2VsX2ZpbGVfbW9kKysgJSAxMCkgKyBcIi54bHN4XCI7XHJcbiAgICBzYW1wbGVGaWxlLm12KHBhdGgsIChlcnIpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoZXJyKTtcclxuICAgICAgICBleGNlbF9hcGkocGF0aCwge1xyXG4gICAgICAgICAgICByb290X25hbWUgICAgICAgICAgICAgIDogJ1FfUk9PVCcsXHJcbiAgICAgICAgICAgIG5hbWUgICAgICAgICAgICAgICAgICAgOiAnVkFTVEdPRUQnLFxyXG4gICAgICAgICAgICBwcmVzZW50YXRpb25fc2hlZXRfbmFtZTogJ1ByZXNlbnRhdGlvbicsXHJcbiAgICAgICAgICAgIGNvbHVtbnMgICAgICAgICAgICAgICAgOiBbXCJyb3dudW1iZXJcIiwgXCJkZXNjcmlwdGlvblwiLCBcImxldmVsXCIsIFwibmFtZVwiLCBcIipcIiwgXCIqXCIsIFwicmVxdWlyZWRcIiwgXCJ2aXNpYmxlXCJdXHJcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4gcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGF1ZGl0ICAgOiByZXN1bHQuYXVkaXQsXHJcbiAgICAgICAgICAgIHJlZ2lzdGVyOiByZXN1bHQucmVnaXN0ZXIsXHJcbiAgICAgICAgICAgIGZmbCAgICAgOiByZXN1bHQuZmZsLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgfSkpKVxyXG4gICAgfSlcclxufSk7XHJcbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xyXG4gICAgaGlwY2hhdC5sb2coJzxzcGFuPicgKyAocHJvZHVjdGlvbiA/ICdQcm9kdWN0aW9uJyA6ICdEZXZlbG9wJykgKyAnIGNvbnZlcnRlciBzZXJ2ZXIgPC9zcGFuPjxhIGhyZWY9XCJodHRwOi8vJyArIGRvbWFpbiArICdpbmRleC5odG1sXCI+c2VydmVyPC9hPjxzcGFuPiBkZXBsb3llZDwvc3Bhbj4nKVxyXG4gICAgaGlwY2hhdC5sb2coJzxzcGFuPicgKyAocHJvZHVjdGlvbiA/ICdQcm9kdWN0aW9uJyA6ICdEZXZlbG9wJykgKyAnIHZhbGlkYXRvciBzZXJ2ZXIgPC9zcGFuPjxhIGhyZWY9XCJodHRwOi8vJyArIGRvbWFpbiArICd2YWxpZGF0ZS5odG1sXCI+c2VydmVyPC9hPjxzcGFuPiBkZXBsb3llZDwvc3Bhbj4nKVxyXG59KSJdfQ==