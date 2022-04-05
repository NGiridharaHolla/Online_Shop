var mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})
var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})
connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log(err);
    }
});
module.exports = connection;
