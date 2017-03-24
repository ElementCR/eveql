var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

var buy;
var all;
var sell;

var itemStats = {
  "hiBuy": 0,
  "loSel": 0,
  "buyVol": 0,
  "selVol": 0,
  "allVol": 0,
  "iskSpread": 0,
  "perSpread": 0,
  "buyPerHR": 0,
  "selPerHR": 0,
  "TORatio": 0
}

var host = 'http://api.eve-central.com/api/marketstat'

var options = {
  host: 'api.eve-central.com',
  port: 80,
  path: '/api/marketstat/json?typeid=615&usesystem=30000142',
  method: 'GET'
}

http.request(options, function (res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
    var payload = JSON.parse(chunk);

    buy = payload[0]["buy"];
    all = payload[0]["all"];
    sell = payload[0]["sell"];

    //console.log("buy Xfer :: " + JSON.stringify(buy));
    //console.log("all Xfer :: " + JSON.stringify(all));
    //console.log("sell Xfer :: " + JSON.stringify(sell));
    //console.log("raw item stats :: " + JSON.stringify(itemStats));

    itemStats.hiBuy = buy["max"];
    itemStats.loSel = sell["min"];
    itemStats.iskSpread = itemStats.loSel - itemStats.hiBuy; //Adjusted the spread calculation for station trading.
    itemStats.perSpread = itemStats.iskSpread / itemStats.loSel;
    itemStats.buyVol = buy["volume"];
    itemStats.selVol = sell["volume"];
    itemStats.allVol = all["volume"];
    itemStats.buyPerHR = itemStats.buyVol / 24;
    itemStats.selPerHR = itemStats.selVol / 24;
    itemStats.TORatio = itemStats.selPerHR / itemStats.buyPerHR;

    console.log("Transferred Values" + JSON.stringify(itemStats));

    fs.writeFile("economicData.txt", JSON.stringify(itemStats), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });


  });
}).end();
