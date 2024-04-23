// import { Client } from "pg";

// import { v4 } from "uuid";
const { v4: uuidv4 } = require('uuid');
const {Client} = require('pg')

// const {client} = require("./database")
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "patru#raton03",
  database: "MPPDatabase"
})

const generateHugeData = async () => {
    client.connect();
    for (let i = 0; i < 10000; i++) {
      const processor = {
        id: uuidv4(), 
        name: `Processor ${i + 1}`,
        prodYear: 2010, 
        speed: "high"
      };
      const query = `INSERT INTO processors(id, name, prodyear, speed) VALUES ($1, $2, $3, $4)`;
      const values = [processor.id, processor.name, processor.prodYear, processor.speed];

      client.query(query, values)
      .then(() => {
        if(i === 1000){
            console.log("Inserted 1000 processors");
        }
       })
       .catch(err => {
        console.error('Error executing querry', err.message);
       });
       for(let j = 0; j < 60; j++){
        const phone = {
            id: uuidv4(),
            price: 2000,
            name: `Phone ${j + 1} for Processor ${i + 1}`,
            prodYear: 2023,
            description: "Nice phone",
            processorId: processor.id
        }
        const query = `INSERT INTO phones(id, price, name, prodYear, description, processorID) VALUES ($1, $2, $3, $4, $5, $6)`;
        const values = [phone.id, phone.price, phone.name, phone.prodYear, phone.description, phone.processorId];

        client.query(query, values)
        .then(() => {
            if(j === 200){
                console.log(`Inserted all phones for Processor ${i + 1}`);
            }
        })
        .catch(err => {
          console.error('Error executing querry', err.message);
         });
       }
    }
  };


generateHugeData()