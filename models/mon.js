var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  // id is created automatically
  
  name: {
        type: String
        //required: [true, 'What is the Recipe Name?']
  },

  sn: {
        type: String
       // required: [true, 'What are the Ingredients?']
  },

  email: String,

  room: String,

  stime: {
        type: String
        //required: [true, 'What is the Recipe Name?']
  },

  etime: {
        type: String
       // required: [true, 'What are the Ingredients?']
  },

  purps: String,
  
  purps: String
});

module.exports = mongoose.model('mon', contactSchema);