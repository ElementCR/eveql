var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var mysql = require("mysql");

var listData = [];
var iStatsList = [];
var connection;
var queryAmt = 10;
var requestString = '';
var usesSystem = 'usesystem=30000142';

var itemStats = {
    "typeID": '',
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
    path: '/api/marketstat/json?',
    method: 'GET'
}

function closeConnection() {
    connection.end(function (err) {});
    //process.exit(0);
}

function lookup() {
    mFinder(function (listData) {
        if(listData.length > 0){
        options.path = "/api/marketstat/json?";
        requestString = '';
        listData.forEach(function (row) {
            console.log(row['typeID']);
            requestString += 'typeid=' + row['typeID'] + '&';
            });
        }
        requestString += usesSystem;
        options.path += requestString;
        //console.log(options);
        requester(options);
    });
};

function openConnection(next) {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "",
        password: "",
        database: 'eveql'
    });

    conn.connect(function (err) {
        if (err) {
            console.log('Error connecting to Db');
        }
        console.log('Connection established');
        connection = conn;
        next();
    });
}

function requester(options) {
    http.request(options, function (res) {
        res.setEncoding('utf8');
        // Build response body in a string
        var resBody = '';

        // Listen for data and add
        res.on('data', function (chunk) {
            resBody += chunk
        });

        res.on('end', function () {
            // Now that the response is done streaming, parse resBody 
            var payload = JSON.parse(resBody);

            for (var i = 0; i < payload.length; i++) {
                buy = payload[i]["buy"];
                all = payload[i]["all"];
                sell = payload[i]["sell"];

                itemStats.typeID = buy["forQuery"]["types"];
                itemStats.hiBuy = buy["max"];
                itemStats.loSel = sell["min"];
                itemStats.iskSpread = itemStats.loSel - itemStats.hiBuy; //Adjusted the spread calculation for station trading.
                itemStats.perSpread = 100.0 * (itemStats.iskSpread / itemStats.loSel);
                itemStats.buyVol = buy["volume"];
                itemStats.selVol = sell["volume"];
                itemStats.allVol = all["volume"];
                itemStats.buyPerHR = itemStats.buyVol / 24;
                itemStats.selPerHR = itemStats.selVol / 24;

                iStatsList.push(itemStats);
                //console.log("Length of iStatsList : " + iStatsList.length);
                //console.log("Stats transferred for : " + JSON.stringify(itemStats));
                //console.log("Value of type id from JSON :: " + itemStats.typeID);
                var update = "UPDATE eveql.eve_economy " +
                    "SET allVolume = " + JSON.stringify(itemStats.allVol) + ", buyVolume= " + JSON.stringify(itemStats.buyVol) + ", sellVolume=" + JSON.stringify(itemStats.selVol) +
                    ", highestBuy=" + JSON.stringify(itemStats.hiBuy) + ", lowestSell=" + JSON.stringify(itemStats.loSel) + ", iskSpread=" + JSON.stringify(itemStats.iskSpread) +
                    ", perSpread=" + JSON.stringify(itemStats.perSpread) + ", buyPerHour=" + JSON.stringify(itemStats.buyPerHR) + ", sellPerHour=" + JSON.stringify(itemStats.selPerHR) +
                    ", date_modified=NOW() WHERE typeID=" + itemStats.typeID + ";";

                connection.query(update, function (err, rows) {
                    if (err) console.log(err);
                    else{
                        console.log("Update Successful!");
                    }
                });

            };
            //closeConnection();
        });
    }).end();
};

function mFinder(callback) {
    var sql = "Select typeID FROM eveql.eve_economy" +
        " WHERE eveql.eve_economy.date_modified < DATE_SUB(NOW(), INTERVAL 24 HOUR) LIMIT " + queryAmt;

    connection.query(sql, function (err, rows) {
        //console.log('in the callback of the query');
        //console.log('rows.length: ' + rows.length);

        if (err) console.log(err);
        else {
            callback(rows);
        }
    });
};
openConnection(lookup);
setInterval(function(){
    lookup();
}, 2000);
