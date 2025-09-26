//Anica Ferreira 40_u24581802

//DATABASE CONNECTION
const {MongoClient} = require("mongodb");

const uri ="mongodb+srv://test-user:test-password@imy220.vhivze9.mongodb.net/?retryWrites=true&w=majority&appName=IMY220";
const client = new MongoClient(uri);

let db = null;

async function connectDB() {
    if(db)return db;
    try{
        await client.connect();
        db = client.db("cabinetDB");
        return db;
    }catch(err) {}
}

module.exports = connectDB;

