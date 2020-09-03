const express = require('express')
const { dirname } = require('path')
const { get } = require('http')
const app = express()
const port = 1234

const clientDir = __dirname + "\\client\\"

app.get('/', (req, res) => res.sendFile(clientDir + "index.html"))
app.get('/hanif', (req, res) => res.sendFile(clientDir + "hanif.jpg"))
app.get('/style.css', (req, res) => res.sendFile(clientDir + "style.css"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))