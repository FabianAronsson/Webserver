const express = require('express')
const { dirname } = require('path')
const { get } = require('http')
const app = express()
const port = 27017

app.use(express.json());
app.use(express.urlencoded());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bruh', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

const personSchema = new mongoose.Schema({
  fname: String,
  aname: String
});

const Person = mongoose.model('person', personSchema);


const clientDir = __dirname + "\\client\\"

app.get('/', (req, res) => res.sendFile(clientDir + "index.html"))
app.get('/hanif', (req, res) => res.sendFile(clientDir + "hanif.jpg"))
app.get('/style.css', (req, res) => res.sendFile(clientDir + "style.css"))
app.post('/', function (req, res) {
  const student = new Person({ fname: req.body.fname, aname: req.body.lname });
    console.log(req.body)
    student.save()
    res.redirect("/")
    
  
    
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))