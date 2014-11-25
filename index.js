var CronJob = require('cron').CronJob;
var http    = require('http');
module.exports = {
	schedule: function(pattern, cb, stop){
		var j = new CronJob(pattern, cb, stop, true);
	},
	monitor: function(pattern, sites, cb, stop){
		var self = this;
		sites.forEach(function(site){
			self.schedule(pattern, function(){
				http.get(site, function(res){
					cb(null, site, res);
				}).on('error', function(e){
					cb(e, site, null);
				}, stop);
			});
		});
	}
}
