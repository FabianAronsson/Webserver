const express = require('express')
const { dirname } = require('path')
const app = express()
const port = 1234

const clientDir = __dirname + "\\client\\"

app.get('/', (req, res) => res.sendFile(clientDir + "index.html"))
app.use(express.static(clientDir));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))