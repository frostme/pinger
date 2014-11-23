pinger
======

Background process module to ping your websites.

## Installation
```
npm install pinger
```

## Usage
```js
var spring = require('pinger');

var sites = ['http://www.google.com','http://www.yahoo.com','http://www.bing.com'];

var cb = function(res, site){
  console.log('Got ' + res.statusCode + ' for ' + site);
});

spring.monitor('0,10,20,30,40,50 * * * * *', sites, cb);
```

## API
- monitor(pattern, sites, option)
  - pattern: Cron Job pattern. [More on cron patterns](http://crontab.org/)
  - sites:   Array of string urls for which you want to monitor.
  - option:  *Optional* Can be three types.
    - *String*: containing path json file that saves responses.
    - *Object*: containing parameters to db, that pinger can save response to.
    - *Function*: callback that takes two arguments, res, and site.
