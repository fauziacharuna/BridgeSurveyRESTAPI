var mysql = require("mysql");
// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "192.168.0.101",
  user: "root",
  password: "root",
  port:"5700",
  database: "test"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
  if(err) console.log('err: ', err);
  else console.log('Terminated done: ');
});