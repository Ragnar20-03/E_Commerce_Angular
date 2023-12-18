const express = require('express');
const bodyParser = require('body-parser')
const cors = require ('cors')
const {MongoClient}  = require('mongodb')
const URL = "mongodb://127.0.0.1:27017"
const client  = new MongoClient(URL)
const jwt = require('jsonwebtoken')

const router  = express.Router()

router.use(bodyParser.json() , cors())

async function getConnection(cName)
{
    try {       
        let conn = await client.connect()
        let db = conn.db('Ecommerce')
        return (await db.collection(cName)) 
    } catch (error) {
        console.log("getConnection :: " , error);   
    }
}

router.get('/'  , (req , res)=>{res.send("Hello From api")})

router.post('/login' , async (req , res) => {
    let conn = await  getConnection('user')
    if (await conn.findOne({username : req.body.username}))
    {
        if (await conn.findOne({password : req.body.password }))
        {
            const result = await conn.findOne({username : req.body.username});
            let cidX = result.cid;
            res.status(200).send({cidX})

        }
        else 
        {
            res.status(400).send("Password not matched")
        }
    }
    else 
    {
        res.status(400).send("Account Not Found")
    }

})
router.post('/register' , async (req , res) => {

    let conn = await  getConnection('user')
    if (await conn.findOne( {
        $or : [
            {username : req.body.username} , 
            {email : req.body.email}
        ]
    } ))
    {
            res.status(400).send("Account already regsiterd")
    }
    else 
    {
        if (await conn.insertOne({username  : req.body.username , password :req.body.password , email : req.body.email , cid : await conn.countDocuments() + 1  , cart : []}))
        {
            res.status(200).send({token : "Register Success"})
        }
    }
})

router.get('/cart/:cid' , async (req , res) => {
    let conn = await  getConnection('user')
    let query = await conn.findOne({cid : parseInt(req.params.cid)})
    console.log(query);
        if (query)
    {
        console.log("Cart Get , :: " ,query.cart );
        res.status(200).send({cart : query.cart })
    }
    else {
        res.status(400).send("Something went wrong")
    }
})

router.post('/addCart/:cid/:pid' , async(req,res)=> {

    let conn = await  getConnection('user')
    console.log(req.params);
    if (await conn.findOne({cid : parseInt(req.params.cid)}))
    {
        if ((await conn.findOne({ cid : parseInt(req.params.cid) ,cart : {$in : [parseInt(req.params.pid)]}} ))){
            res.send("already have that product")
        }
        else 
        {
            if(await conn.updateOne({cid : parseInt(req.params.cid) } , {$push : {cart : parseInt(req.params.pid)}}))
            {
                res.status(200).send({token : "Product Added to cart"})
            }
            else 
            {
                res.status(200).send("Something went wrong")

            }
        }
    }
    else 
    {
        console.log("Something went wrong");
    }
})
router.delete('/cart/:cid/:pid' , async(req,res)=> {

    let conn = await  getConnection('user')
    if (await conn.findOne({cid : parseInt(req.params.cid)}))
    {
        if ((await conn.findOne({ cid : parseInt(req.params.cid) ,cart : {$nin : [parseInt(req.params.pid)]}} ))){
            res.send("Product Not Found in cart")
        }
        else 
        {
            if(await conn.updateOne({cid : parseInt(req.params.cid) } , {$pull : {cart : parseInt(req.params.pid)}}))
            {
                res.status(200).send({token : "Product Removed to cart"})
            }
            else 
            {
                res.status(200).send("Something went wrong")
            }
        }
    }
    else 
    {
        console.log("Something went wrong");
    }
})


router.get('/products' , async(req , res) => {
    let conn = await getConnection("product");
    res.status(200).send(await conn.find({}).toArray());
})
router.get('/products/:pid' , async (req , res) => {
    console.log(("inisde Produvt/id" ));
    let conn = await getConnection("product");

    res.status(200).send(await conn.find({pid:parseInt(req.params.pid)}).toArray())   

})
module.exports = router;
