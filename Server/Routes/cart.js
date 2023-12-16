const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url)
router.use(cors())
const jwt = require('jsonwebtoken')
router.use(bodyParser.json())

async function verifyToken(req , res, next)
{
    console.log("Inide VerifyToken");

    if (!req.headers.authorization){
        return  res.status(400).send({msg : "Invalid Request "})
    }
    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (token === null || token === undefined)
    {
        return res.status(400).send("Token Not present")
    }
    try{
        let payload = jwt.verify(token , "roshan")
        if (!payload)
        {
            return res.status(400).send("Invalid Token")
        }
    }
    catch(err)
    {
        return res.status(400).send("Invalid Token")
    }
     next()
}

async function getConnection(param) {
    try {

        let conn = await client.connect();
        let db = await conn.db('Ecommerce')
        if (!db) console.log("Failed to connect to the database");
        return await db.collection(param);
    } 
    catch (error) {
        console.log(error)
    }
}

router.get('/'  ,(req , res) => {
    res.send("Hello From cart")
})

router.get('/getCart/:pid' , verifyToken , async (req , res) =>{
    let conn  = await getConnection("user") ;
    console.log("INside Get Cart");
    let data=  await conn.findOne(
        { name: "anurag" }// Replace with the appropriate condition to identify the document
      )
    res.status(200).send(data.cart)

})


module.exports = router