const express = require('express');
const bodyParser = require('body-parser')
const cors = require ('cors')

const app  = express()
const api  = require('./Routes/api')
app.use('/api' , api)
app.use(bodyParser.json() , cors())

app.listen(5100 , ()=>{
    console.log("Server Started on port number 5100");
})

app.get('/'  , (req , res)=>{res.send("Hello From server")})
