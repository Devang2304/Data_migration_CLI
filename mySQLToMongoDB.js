import mysql from 'mysql2/promise';
import fs from 'fs';


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
      } catch (err) {
        console.error(`Error converting table: ${err}`);
      }
  }
  


  mySQLToMongoDB('','testingdb','','testingtable','output.json');
