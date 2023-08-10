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

app.post('/api/students', (req, res) => {
    const {_id, name, email, age, city} = req.body;
    const query = 'insert into students (_id, name, email, age, city) values(?, ?, ?, ?, ?)';

    db.query(query, [_id, name, email, age, city], (err, result) => {
        if(err) {
            console.error('Error creating student:', err);
            res.status(500).send('Error creating item');
        }else {
            // console.log(result); will show affected rows and other data in console.
            res.status(201).send('Student created successfully');
        }
    });
});

app.get('/api/students', (req,res) => {
    db.query('select * from students', (err, result) => {
        if(err) {
            console.log(err);
        } else {
            return res.send({ Students: result, message: 'Students list.'});
        }
    });
});

app.get('/api/students/:id', (req, res) => {
    let student_id = req.params.id;

    db.query('select * from students where _id=?', student_id, (err, result) => {
        if(result==0) {
            return res.send({Message : 'Cannot find student with provided ID.'});
        }else {
            return res.send({Student: result, message: 'Student with ID.'});
        }
    });
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})