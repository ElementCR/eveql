var querystring = require('querystring');
var http = require('http');
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
  "perSpread": 0
}

var host = 'http://api.eve-central.com/api/marketstat'

var options = {
  host: 'api.eve-central.com',
  port: 80,
  path: '/api/marketstat/json?typeid=34&usessystem=30000142',
  method: 'GET'
}

http.request(options, function (res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
    var jsonBuy = JSON.parse(chunk);

    buy = jsonBuy[0]["buy"];
    all = jsonBuy[0]["all"];
    sell = jsonBuy[0]["sell"];

    //console.log("buy Xfer :: " + JSON.stringify(buy));
    //console.log("all Xfer :: " + JSON.stringify(all));
    //console.log("sell Xfer :: " + JSON.stringify(sell));
    //console.log("raw item stats :: " + JSON.stringify(itemStats));

    itemStats.hiBuy = buy["max"];
    itemStats.loSel = sell["min"];
    itemStats.iskSpread = itemStats.hiBuy - itemStats.loSel;
    itemStats.perSpread = itemStats.iskSpread / itemStats.hiBuy;
    itemStats.buyVol = buy["volume"];
    itemStats.selVol = sell["volume"];
    itemStats.allVol = all["volume"];

    console.log("Transferred Values" + JSON.stringify(itemStats));

  });
}).end();
