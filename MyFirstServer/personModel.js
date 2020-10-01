const mongoose = require('mongoose');
const personSchema = new mongoose.Schema({
    fname: String,
    lname: String
  });
  
  const Person = mongoose.model('person', personSchema);

  exports.createPerson = (firstName, lastName) => {
    var person = new Person({ 
      fname: firstName, 
      lname: lastName 
    });

    return person
  }