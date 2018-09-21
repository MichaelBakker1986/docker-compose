const Docker = require('dockerode')
//const docker = new Docker({ host: 'http://94.213.30.5:8082', port: 8082 });

var docker = new Docker({ protocol: 'http', host: '94.213.30.5', port: 8082 });
var auth = {
    username     : '92616E615D7B1671CEE7',
    password     : 'rYi2DoYUqWTw5uh46roDLFDAEsjPTh455nc61gtX',
    serveraddress: 'http://94.213.30.5:8082/v1'
};
docker.checkAuth({ 'authconfig': auth }, function(err, stream) {
    console.info(err, stream)
});
/*docker.listContainers({ 'authconfig': auth }, function(err, stream) {
    console.info(err, stream)
});*/
/*docker.info((ce, data) => {
    console.info(ce, data)
})*/
/*
API Key Created
D56B2FCEE08EF92F096C
jGW9gzKz9MYNuxjgqdup8aC5xyGQeHgjALeep5Uz
*/

/*92616E615D7B1671CEE7
rYi2DoYUqWTw5uh46roDLFDAEsjPTh455nc61gtX*/
/*

docker.listContainers({ 'authconfig': auth }, (ce, data) => {
    console.info(ce, data)
})*/
