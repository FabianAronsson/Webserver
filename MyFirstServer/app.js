const express = require('express')
const { dirname } = require('path')
const { get } = require('http')
const dBModule = require ('./dBModule')
const personModel = require('./personModel')
const { Console } = require('console')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded());

const clientDir = __dirname + "\\client\\"

app.get('/', (req, res) => res.sendFile(clientDir + "index.html"))

app.get('/hanif', (req, res) => res.sendFile(clientDir + "hanif.jpg"))

app.get('/style.css', (req, res) => res.sendFile(clientDir + "style.css"))

app.post('/', function (req, res) {
    
  let person = personModel.createPerson(req.body.fname, req.body.lname)
  dBModule.store(person)
    console.log(req.body)
    res.redirect("/")
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))