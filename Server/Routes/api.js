const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url)

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

router.get('/products' , async (req ,res ) => {
    let conn = await getConnection("product");
    res.status(200).send(await conn.find({}).toArray())
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

router.post('/login', async (req, res) => {
    console.log(req.body.username, " ::: ", req.body.password);
    res.status(200).send({ success: "Success" })
})


module.exports = router