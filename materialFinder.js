var mysql = require("mysql");
var parsedData;
var listData = [];
var material;
var connection;

function closeConnection() {
  connection.end(function(err) {
  });

  process.exit(0);
}

var lookup = function() {
	mFinder(function(listData) {
		console.log('listData size: ' + listData.length);

     listData.forEach(function(row) {
      console.log('row: ' + JSON.stringify(row));
    });

    closeConnection();
	});
};


function openConnection(next) {
	var conn = mysql.createConnection({
  	host: "localhost",
  	user: "root",
    password: "",
		database: 'eveql'
	});

	conn.connect(function(err) {       
  		if(err) {
    		console.log('Error connecting to Db');
    		return;
		  }	
    console.log('Connection established');
		connection = conn;
		next();
	});
}


function mFinder(callback) {
	var itemName = process.argv[2];
  var sql = "SELECT t.typeID, m.typeID, t.typeName, m.materialTypeID, m.quantity, t.groupID, t.graphicID " +
    "FROM invTypes t INNER JOIN invTypeMaterials m ON t.typeID = m.typeID " +
    "WHERE t.typeName = '" + itemName + "'";
								 
	connection.query(sql, function(err, rows) {
		console.log('in the callback of the query');
		console.log('rows.length: ' + rows.length);
		
		if(err) console.log(err);
		else {
			callback(rows);
		}
	});
};

openConnection(lookup);





