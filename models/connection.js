var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'arash',
    password: 'Taunuetrino-1',
    database: 'dbms_minipro'
})
connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log(err);
    }
});
module.exports = connection;