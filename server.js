const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyparser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'school'
});

db.connect( err => {
    if(err) {
        console.log("Database Connection Failed try again...", err);
    } else {
        console.log("Database Connected");
    }
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})