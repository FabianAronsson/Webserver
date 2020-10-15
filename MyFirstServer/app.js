const express = require('express')
const { dirname } = require('path')
const { get } = require('http')
const dBModule = require ('./dBModule')
const personModel = require('./personModel')
const messageModel = require('./messageModel')
const { Console } = require('console')
const app = express()
const port = 3000
const clientDir = __dirname + "\\client\\"

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(clientDir));

app.get('/messages', async (req, res) =>{
  res.render('pages/messages.ejs');
}); 

app.get('/', (req, res) => res.render('pages/index.ejs', { name: "", message: ""}));

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
    res.render('pages/messages.ejs', { message: messages})
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))