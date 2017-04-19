require('webgl-mock')
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
window = mock.getWindow();
document = mock.getDocument();
Canvas = new HTMLCanvasElement(500, 500);
gl = Canvas.getContext('webgl')

require('./fes-ngrpah-pixel')
module.exports = mock;
