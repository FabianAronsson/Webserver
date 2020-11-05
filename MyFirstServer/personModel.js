const mongoose = require('mongoose');
const personSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
  const Person = mongoose.model('person', personSchema);

  exports.createPerson = (username, password) => {
    var person = new Person({ 
      username: username, 
      password: password 
    });

    return person
  }

  exports.getAllPeople = async () => {
    let people = await Person.find({});
    return people;
  }