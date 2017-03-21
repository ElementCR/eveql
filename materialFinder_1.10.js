var mysql = require("mysql");
var parsedData;
var listData = [];
var material;
var temp;

function mFinder(callback) {
	// First you need to create a connection to the db
	var connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: ""
	});

	connection.connect(function (err) {
		{
			if (err) {
				console.log('Error connecting to Db');
				return;
			}
		}
		console.log('Connection established');
	});

	var itemName = process.argv[2];

	connection.query("SELECT MAT.typeID, TYP.typeName, MAT.materialTypeID, " +
		"MAT.quantity, TYP.groupID, TYP.graphicID " +
		"FROM eveql.invTypeMaterials as MAT " +
		"INNER JOIN eveql.invTypes as TYP " +
		"ON MAT.typeID = TYP.typeID and TYP.typeName " +
		"= CONCAT('" + itemName + "');",
		function (err, rows) {
			if (err) {
				console.log(err);
			} else {
				for (row in rows) {
					listData.push(JSON.parse(JSON.stringify(rows[row])));
					//console.log('Value: ' + JSON.stringify(listData[row]));
				}
				//console.log("About to return : " + JSON.stringify(listData));
				callback(listData);
			}

		});

	connection.end(function (err) {
		// The connection is terminated gracefully
		// Ensures all previously enqueued queries are still
		// before sending a COM_QUIT packet to the MySQL server.
	});


};

mFinder(function (listData) {
	for (data in listData) {
		var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: ""
		});

		connection.connect(function (err) {
			{
				if (err) {
					console.log('Error connecting to Db');
					return;
				}
			}

		});

		connection.query("SELECT typeID, typeName FROM eveql.invTypes as TYP WHERE" +
			" TYP.typeID = " + listData[data].materialTypeID + ";",
			function (err, rows) {
				if (err) {
					console.log(err);
				} else {
					for (var i = 0; i < listData.length; i++) {
						//console.log(JSON.stringify(listData[i]));
						//console.log(JSON.stringify(rows));
						if (listData[i].materialTypeID == rows[0].typeID) {
							listData[i].materialTypeName = rows[0].typeName;
							console.log(listData[i]);
							break;

						}

					}

				}

				for (var i = 0; i < listData.length; i++) {
					JSON.stringify(listData[i]);
				}

				//console.log((rows[row]));
				//console.log('Value: ' + JSON.stringify(listData));
				//console.log("About to return : " + JSON.stringify(listData));
			});

		connection.end(function (err) {
			// The connection is terminated gracefully
			// Ensures all previously enqueued queries are still
			// before sending a COM_QUIT packet to the MySQL server.
		});
	}
});
