import { connectDB, migrateData } from "./MongoCloudToOnPremise.js";
import { decryptFile } from "./AESencryption.js";
import mongoose from 'mongoose';
import fs from 'fs';
const {connection} = mongoose;


// secret key = 'd56d4a043edc26d19401805bbc3a022fcf6de4c49ae2d8ad491f3a97cb325a315e038923d259a9d1b9ff5dcc200c821f6a31d37aeae3aea4f2288eb7f8f4bcb4f9632e03fc57331fe0466aebe89b3fec73a284a6e782382973ca4aaa51709ca2ba286db5418199aeca2b4e33c13a41cd731b36271a16be6e3ad1cce0b398d'

// decrypting the file before sending it to mongoDB

const migrateToMongo=async(CONNECTION_URL,ecryptedFilePath,secretKey,dbName,collectionName)=>{
    const dBInstance = await connectDB(CONNECTION_URL);
    const collection = dBInstance.db(dbName).collection(collectionName);
    decryptFile(ecryptedFilePath,secretKey);
    const fileData=fs.readFileSync(ecryptedFilePath,'utf8');
    const dataInserted=await collection.insertMany(JSON.parse(fileData));
    console.log("Data migrated to cloud successfully");
    connection.close();
    process.exit();
}

// function for migrating data from mysql to mongodb
export const migrateSQLtoMongo = async (CONNECTION_URL, FilePath, dbName, collectionName) => {
    const dBInstance = await connectDB(CONNECTION_URL);
    const collection = dBInstance.db(dbName).collection(collectionName);
    const fileData = fs.readFileSync(FilePath, 'utf8');
    const dataInserted = await collection.insertMany(JSON.parse(fileData));
    console.log("Data migrated from SQL  to mongoose atlas successfully");
    connection.close();
    process.exit();
}


// migrateToMongo('CONNECTION_URL_HERE','../data.json','d56d4a043edc26d19401805bbc3a022fcf6de4c49ae2d8ad491f3a97cb325a315e038923d259a9d1b9ff5dcc200c821f6a31d37aeae3aea4f2288eb7f8f4bcb4f9632e03fc57331fe0466aebe89b3fec73a284a6e782382973ca4aaa51709ca2ba286db5418199aeca2b4e33c13a41cd731b36271a16be6e3ad1cce0b398d','editor_DB_replicaset','editor_collection');