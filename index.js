var CronJob = require('cron').CronJob;
var http    = require('http');
var stopped = function(){
	console.log('stopped');
};
module.exports = {
	schedule: function(pattern, cb){
		var j = new CronJob(pattern, cb, stopped, true);
	},
	monitor: function(sites){
		var self = this;
		sites.forEach(function(site){
			self.schedule('00,10,20,30,40,50 * * * * *', function(){
				http.get(site, function(res){
					console.log("For " + site + ", Got response: " + res.statusCode);
				}).on('error', function(e){
					console.log("For " + site + ", Got error: " + e.message);	
				});
			});
		});
	}
}
