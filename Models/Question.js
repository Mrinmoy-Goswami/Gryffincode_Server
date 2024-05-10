const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  exampleInput: {
    type: String,
    required: false,
    default:'NA'
  },
  exampleOutput: {
    type: String,
    required: false
  },
  housePoints:{
    type:Number,
    // required:true 
    default:20
  },
  testCases: [
    {
      input: {
        type: String,
        required: true
      },
      output: {
        type: String,
        required: true
      }
    }
  ],
  difficulty:{
    type:String,
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
