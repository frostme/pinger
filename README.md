cron-ping
======

Background process module to ping your websites.

## Installation
```
npm install cron-ping
```

## Usage
```js
var cronPing = require('cron-ping');

var sites = ['http://www.google.com','http://www.yahoo.com','http://www.bing.com'];

var cb = function(res, site){
  console.log('Got ' + res.statusCode + ' for ' + site);
});
var stop = function(){
  console.log('Monitoring has stopped');
};

cronPing.monitor('0,10,20,30,40,50 * * * * *', sites, cb, stop);
```

## API
- monitor(pattern, sites, option)
  - pattern: Cron Job pattern. [More on cron patterns](http://crontab.org/)
  - sites:   Array of string urls for which you want to monitor.
  - cb:  callback that takes two arguments, res, and site.
  - stop: callback to be called when monitoring is stoppped
