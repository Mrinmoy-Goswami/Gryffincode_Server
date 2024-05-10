const express = require('express');
// const compileRoute = require('./Routes/CodeCompilation')
const app = new express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const authRoute = require('./Routes/Auth')
const problemRoute = require('./Routes/Problems')
const submitRoute = require('./Routes/CodeJudge')

app.use(express.json())
app.use(cors());
dotenv.config()

mongoose.connect(process.env.MONGO_URL,{
  
 }).then(console.log("Database connected !")).catch((er)=>console.log(er));

app.use('/auth',authRoute)
app.use('/problem',problemRoute)
app.use('/judge',submitRoute)

app.listen(4000,()=>{
    console.log("Server Started!")
})