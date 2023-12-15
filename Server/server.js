const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const api = require('./Routes/api')
app.use('/api' , api)

app.listen(5100 , ()=>{
    console.log("Server started on 5100");
})

