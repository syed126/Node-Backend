
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'school-management'
});
dbConn.connect(function(err) {
  if (err) throw err;
});
module.exports = dbConn;