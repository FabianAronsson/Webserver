const express = require('express')
const { dirname } = require('path')
const { get } = require('http')
const app = express()
const port = 1234

var bodyParser = require('body-parser')
const { response } = require('express')
app.use(bodyParser());


const clientDir = __dirname + "\\client\\"

app.get('/', (req, res) => res.sendFile(clientDir + "index.html"))
app.get('/hanif', (req, res) => res.sendFile(clientDir + "hanif.jpg"))
app.get('/style.css', (req, res) => res.sendFile(clientDir + "style.css"))
app.post('/contact', function (req, res) {
    res.end(JSON.stringify(req.body));
    console.log(req.body)
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))