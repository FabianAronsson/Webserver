const express = require('express')
const dBModule = require ('./dBModule')
//const personModel = require('./personModel')
const messageModel = require('./messageModel')
const app = express()
const port = 3000
const clientDir = __dirname + "\\client\\"

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(clientDir));

app.get('/', async (req, res) => {
  let messages = await messageModel.getAllMessages();
  res.render('pages/index.ejs', { message: messages})
});

/*app.post('/', function (req, res) {
    
  //let person = personModel.createPerson(req.body.fname, req.body.message)
  //dBModule.store(person)
    console.log(req.body)
    res.render('pages/index.ejs', { name: req.body.fname, message: req.body.message})
  });*/

  app.post('/messages', async (req, res) => {
    let message = messageModel.createMessage (req.body.fname, req.body.message)
    dBModule.store(message)
    let messages = await messageModel.getAllMessages();
    res.render('pages/index.ejs', { message: messages})
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))