var pinger = require('./index');
var readJSON = require('read-json');
readJSON('./test.json', function(err, sites){
	pinger.monitor(sites);
});
