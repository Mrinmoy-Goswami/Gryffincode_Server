const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  house:{
    type:String,
    // required:true,
    default:null
  },
  housePoints:{
    type:Number,
    default:0
  },
  title:{
    type:String,
    required:true,  
    default:"Hogwarts Probationer"
  },
  solvedProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
},
 {timestamps:true}
 );


const User = mongoose.model('User', userSchema);

module.exports = User;
