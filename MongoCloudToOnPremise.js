import express from 'express';
import mongodb from 'mongodb';
import fs from 'fs';
import mongoose from 'mongoose';

const {connection} = mongoose;

const app = express();
app.use(express.json());
export const connectDB=async(CONNECTION_URL)=>{
    let db=null;
    try {
         db= await mongodb.MongoClient.connect(CONNECTION_URL);
        console.log('Connected to DB');
    } catch (error) {
        console.log("Error in connecting : ",error.message);

        console.log(CONNECTION_URL)
        return;
    }
    return db;
}


export const migrateData= async (CONNECTION_URL,dbName,collectionName)=>{
    const dBInstance= await connectDB(CONNECTION_URL);
    const collection = dBInstance.db(dbName).collection(collectionName);
    let skip=0;
    const chunkSize=100;
    let doneMigration=true;
    while(doneMigration){
        const data= await collection.find({}).skip(skip).limit(chunkSize).toArray();
        if(data.length===0) doneMigration=false;
        if(doneMigration===false) break;
        console.log(data);
        skip+=chunkSize;
        // console.log(skip);
        try {
            // console.log("running till saving file");
            fs.appendFileSync('../data.json',JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    }
    console.log("migration completed");
    connection.close();
    process.exit();
} 


// migrateData('CONNECTION URL HERE','DATABASE NAME HERE','COLLECTION NAME HERE');