const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    fname: String,
    message: String
  });
  
  const Message = mongoose.model('message', messageSchema);

  exports.createMessage = (firstName, message) => {
    var message = new Message({ 
      fname: firstName, 
      message: message 
    });

    return message
  }

  exports.getAllMessages = async () => {
    let message = await Message.find({});
    return message;
  }