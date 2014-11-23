var CronJob = require('cron').CronJob;
var http    = require('http');
var stopped = function(){
	console.log('stopped');
};
module.exports = {
	schedule: function(pattern, cb){
		var j = new CronJob(pattern, cb, stopped, true);
	},
	monitor: function(pattern, sites, cb){
		var self = this;
		sites.forEach(function(site){
			self.schedule(pattern, function(){
				http.get(site, function(res){
					cb(site, res);
				}).on('error', function(e){
					cb(site, e);
				});
			});
		});
	}
}
