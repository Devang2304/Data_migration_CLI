import mysql from 'mysql2/promise';
import fs from 'fs';
import { migrateSQLtoMongo } from './OnPremiseToMongoCloud.js';
import dotenv from 'dotenv';
dotenv.config();

  const mySQLToMongoDB= async (userName,database, password, table, output) => {
    try {
        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root', 
          password,
          database
        });
  
        const rows = await connection.execute(`SELECT * FROM ${table}`);
        const columnNames = rows[0].map(col => col.name);

        console.log(columnNames);
        console.log(rows[0]);
  
        const jsonData = rows.map(row => {
          const obj = [];
          for (let i = 0; i < row.length; i++) {
            // obj[columnNames[i]] = row[i];
            obj.push(row[i]);
          }
          return obj;
        });
  
        await connection.end();
        await fs.writeFileSync(output, JSON.stringify(jsonData[0], null, 2));
        console.log(`Successfully converted to JSON: ${output}`);

        console.log('Migrating into MongoDB...');
        // CONNECTION_URL, FilePath, dbName, collectionName
        try {
          await migrateSQLtoMongo(process.env.CONNECTION_URL,'output.json','testingdb','testingCollection2');
          console.log('Migration complete!');
        } catch (error) {
          console.log('Error while migrating to MongoDB,pls try again later',error);
        }

      } catch (err) {
        console.error(`Error converting table: ${err}`);
      }
  }
  


  mySQLToMongoDB('','testingdb',process.env.mySQLpassword,'testingtable','output.json');
