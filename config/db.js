const mysql = require('mysql2');
const connection = mysql.createConnection({
   host   : 'localhost',
   user   : 'root',
   password : process.env.DB_PASS,
   database : 'Bank_Api'
});



module.exports = connection;