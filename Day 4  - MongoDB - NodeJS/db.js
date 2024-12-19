const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017"; 
const dbName = "ordersDB";

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to the database!");
    return client.db(dbName);
  } 
  catch (err) {
    console.error("Database connection failed:", err);
  }
}

module.exports = {
    connectDB
}