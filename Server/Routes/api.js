const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url)
router.use(cors())
router.use(bodyParser.json())
const jwt = require('jsonwebtoken')

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

router.use(bodyParser.json())
router.use(cors())

router.get('/', (req, res) => {
    res.send("Hello From api")
})

router.get('/products' , verifyToken,  async (req ,res ) => {
    let conn = await getConnection("product");
    res.status(200).send(await conn.find({}).toArray())
})

router.get('/products/:pid' , async(req , res) => {
    let conn = await getConnection("product");
    res.status(200).send(await conn.findOne({id  : parseInt(req.params.pid)}))
})

router.post('/register', async (req, res) => {
    console.log(req.body.name);
    console.log(req.body.lastname);
    console.log(req.body.email);
    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.confirmPassword);
    console.log(req.body.address.city)
    res.status(200).send({ success: "success" })
})

router.post('/login',  async (req, res) => {
    let conn = await  getConnection('user')
    let query = await conn.findOne({username :  req.body.username , password : req.body.password} )
    console.log(await query.username);
    if (await query)
    {
        let payload = {subject : [query.username , query._id]}
        let token = jwt.sign(payload , "roshan")
        res.status(200).send({token })
    }
    res.status(200).send({ success: "Failed" })
})



module.exports = router