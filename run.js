/*const spawn = require('child-process').spawn;
const child = spawn('node . -type f | wc -l', {
    stdio: 'inherit',
    shell: true,
    cwd: '/Users/samer/Downloads'
});*/

require('./lme-model-api')
require('./demo-apps')
require('./lme-data-api')
require('./git-connect')
require('./proxy')
