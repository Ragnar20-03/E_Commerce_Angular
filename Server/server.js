const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const api = require('./Routes/api')
app.use('/api' , api)

const cart = require('./Routes/cart')
app.use('/cart' , cart)

app.listen(5100 , ()=>{
    console.log("Server started on 5100");
})

