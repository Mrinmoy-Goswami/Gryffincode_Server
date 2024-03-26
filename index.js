const express = require('express');
const compileRoute = require('./Routes/CodeCompilation')
const app = new express();
const cors = require('cors');

app.use(express.json())
app.use(cors());
app.use('/api',compileRoute)
app.listen(4000,()=>{
    console.log("Server Started!")
})