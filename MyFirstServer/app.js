const express = require('express')
const dBModule = require ('./dBModule')
const personModel = require('./personModel')
const messageModel = require('./messageModel')
const bcrypt = require('bcryptjs')
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


app.get('/register', (req, res) => {
  res.render('pages/register.ejs')
});

app.get('/login', (req, res) => {
  res.render('pages/login.ejs')
});

/*app.post('/', function (req, res) {
    
  //let person = personModel.createPerson(req.body.fname, req.body.message)
  //dBModule.store(person)
    console.log(req.body)
    res.render('pages/index.ejs', { name: req.body.fname, message: req.body.message})
  });*/

  app.post('/', async (req, res) => {
    let message = messageModel.createMessage (req.body.fname, req.body.message)
    dBModule.store(message)
    let messages = await messageModel.getAllMessages();
    res.render('pages/index.ejs', { message: messages})
  })

  app.post('/register', async (req, res) => {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      let user = personModel.createPerson (req.body.username, hashedPassword) 
      console.log(user)
      await dBModule.store(user)
      res.redirect('/login')
  })

  app.post('/login', async (req, res) => {
    
      try{
        const user = await personModel.getOnePerson(req.body.username)
        if(user){
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
            if(isPasswordCorrect){
              console.log("yes we can")
              res.redirect('pages/index.ejs')
            }
        }
      }catch{
        console.log('rip')
        res.status(500).send("no")
      }
     
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))