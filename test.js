var cronPing = require('./index');
var fileobj  = require('fileobj');
var readJSON = require('read-json');
readJSON('./test.json', function(err, sites){
	cronPing.monitor(sites, function(){
		
	});
});
