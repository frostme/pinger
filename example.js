var cronPing = require('./index');
var nconf    = require('nconf');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Gmailer  = require('gmail-sender');
nconf.file('config.json');


var ResponseSchema = new Schema({
  site:   String,
  status: Number,
});

mongoose.connect(nconf.get('mongo'));

Gmailer.options({
  smtp: nconf.get('gmail')
});

var Response = mongoose.model('Response', ResponseSchema);

cronPing.monitor('0,10,20,30,40,50 * * * * *', nconf.get('sites'), function(err, site, res){
  if(err) {
    Gmailer.send({
      subject: "Pinger Monitor produced error",
      template: "./assets/error.html",
      from: "'Pinger Mail'",
      to: {
        email: nconf.get('gmail:user')
      },
      data: {
        site: site,
        err: err.message
      }
    });
  } else {
    Response.create({ site: site, status: res.statusCode }, function(error, doc){
      if(error) console.log(error);
    });
  }
}, function(){
  Gmailer.send({
    subject: "Pinger Monitor has Stopped",
    template: './assets/outage.html',
    from: "'Pinger Mail'",
    to: {
      email: nconf.get('gmail:user')
    },
    data: {
      sites: nconf.get('sites').map(function(element, id, arr){
        return "<p>" + (id + 1) + " <span>" + element + "</span></p>";
      })
    }
  });
});
