const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(cors('*'));

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

app.post('/api/students', async (req, res) => {
    const {id, name, email, age, city} = await req.body;
    console.log(req.body);
    const query = await 'insert into students (_id, name, email, age, city) values(?, ?, ?, ?, ?)';

    db.query(query, [id, name, email, age, city], (err, result) => {
        if(err) {
            console.error('Error creating student:', err);
            res.status(500).send({message : 'Error creating item'});
        }else {
            // console.log(result); will show affected rows and other data in console.
            res.status(201).send({message : 'Student created successfully'});
        }
    });
});

app.get('/api/students/all', (req,res) => {
    db.query('select * from students', (err, result) => {
        if(err) {
            console.log(err);
        } else {
            return res.send(result);
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

app.put('/api/students/:id', (req, res) => {
    const student_id = req.params.id;
    const {name, email, age, city} = req.body;
    const query = 'update students set name=?, email=?, age=?, city=? where _id=?';
    db.query(query, [name, email, age, city, student_id], (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            res.status(500).send({ message: 'Error updating student' });
        } else {
            res.status(200).send({message: 'student updated successfully'});
        }
    }); 
});

app.delete('/api/students/:id', (req, res) => {
    const student_id = req.params.id;
    const query = 'delete from students where _id=?';
    db.query(query, [student_id], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            res.status(500).send({ message: 'Error deleting student'} );
        } else {
            res.status(200).send({ message: 'student deleted successfully' });
        }
    });
});

app.delete('/api/students', (req, res) => {
    const query = 'delete from students';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            res.status(500).send({ message: 'Error deleting student'} );
        } else {
            res.status(200).send({ message: 'student deleted successfully' });
        }
    });
});

app.get('/api/students?', (req, res) => {
    const name = req.query.name;

    if(!name) {
        return res.status(400).send('Name parameter is required');
    }

    const query = "select * from students where name like ?";
    const searchTerm = `%${name}%`;
    db.query(query, searchTerm, (err, result) => {
        if(err) {
            console.error("Error retreiving students:", err);
            return res.status(500).send({message: 'Error retreiving students'});
        }else {
            res.status(200).json(result);
        }
    });
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})