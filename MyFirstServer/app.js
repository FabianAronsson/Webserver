const express = require('express')
const { dirname } = require('path')
const { get } = require('http')
const dBModule = require ('./dBModule')
const personModel = require('./personModel')
const { Console } = require('console')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded());

const clientDir = __dirname + "\\client\\"

app.use(express.static(clientDir));

app.get('/', (req, res) => res.render('pages/index.ejs', { name: ""}));
app.post('/', function (req, res) {
    
  let person = personModel.createPerson(req.body.fname, req.body.lname)
  dBModule.store(person)
    console.log(req.body)
    res.render('pages/index.ejs', { name: req.body.fname, lastName: req.body.lname})
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))