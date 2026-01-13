

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname)));




const db = mysql.createConnection({
  host: "localhost",
  database: 'contactdb',
  user: 'root',
  password: 'joseph2009',
  port: 3306

});

db.connect(function(err){
    if(err){
        console.error('Error in connection to the database....', err);
        return;
    }
    console.log('connected to the database...');
})

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'signup.html'));
});


app.post('/submit', function(req, res){
    const {name, email, password} = req.body;
    const sql = "INSERT INTO contacts (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], function(err, result){
        if(err){
            console.error('Error in the information failed..', err);
            return res.status(500).json({error:'Error in the content'});
        }
        res.json({ message: "Form submitted successfully..."});
    });
});

app.listen(4000, '0.0.0.0', function(){
    console.log('listening to port 4000...');
});