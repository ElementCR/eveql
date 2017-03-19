var mysql = require("mysql");
var parsedData;
var listData=[];
var material;

function mFinder() {
        // First you need to create a connection to the db
        var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Ishtar842"
        });

        connection.connect(function(err){
                {
                if(err){
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
                "= CONCAT('" + itemName +"');",
        function(err, rows){
                  if(err){
                    console.log(err);
                  }else{
                    for(row in rows){
                  listData.push(JSON.parse(JSON.stringify(rows[row])));
                 //console.log('Value: ' + JSON.stringify(listData[row]));
                  }
                return listData;
                }

        });

        connection.end(function(err) {
        // The connection is terminated gracefully
        // Ensures all previously enqueued queries are still
        // before sending a COM_QUIT packet to the MySQL server.
        });
};

listData = mFinder();

console.log(JSON.stringify(listData));
