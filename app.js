const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//Parsing middleware
app.use(bodyParser.urlencoded({extended: false}));

//parse applicatin json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//Template Engine
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');


//Connection for DB
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password            : process.env.DB_PASS,
    database            : process.env.DB_NAME
});

pool.getConnection((err, connection) => {
    if(err) throw err;  //Not Connected error
    console.log("Database is connected as " + connection.threadId);
});



//Router
const routes = require('./server/routes/user');
app.use('/', routes);




app.listen(port, () => console.log(`Listening to port ${port}`));