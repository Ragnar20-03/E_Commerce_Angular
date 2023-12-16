const { MongoClient } = require('mongodb')
const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url)

 export async function getConnection(param) {
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
