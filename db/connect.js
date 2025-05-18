const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI;

let dbConnection;

const connectToDb = async (callback) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    // Set your database name here:
    dbConnection = client.db("project1"); 
    
    
    console.log("DB connected");
    callback();
  } catch (err) {
    console.error(err);
    callback(err);
  }
};

const getDb = () => {
  if (!dbConnection) {
    throw new Error("Database not initialized");
  }
  return dbConnection;
};

module.exports = { connectToDb, getDb };
