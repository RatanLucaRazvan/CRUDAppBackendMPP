import { v4 } from "uuid";
import phones, { Phone } from "../model/Phone";
import { Request, Response } from "express";
import client from "../database";

const restorePhones = (req: Request, res: Response) => {
    const frontList = req.body.listPhones;
    console.log(frontList);


    if(frontList.length != 0){
        for(let i = 0; i < frontList.length; i++){
            var current = frontList[i];
            if(current.updated == false && current.deleted == false){
                const query = `INSERT INTO phones(id, price, name, prodYear, description, processorID) VALUES ($1, $2, $3, $4, $5, $6)`;
                const values = [current.id, current.price, current.name, current.prodYear, current.description, current.processorId];
                // const newPhone = new Phone(current.id, current.processorId, current.name, current.number, current.prodYear, current.description);
                client.query(query, values);
                // phones.push(newPhone);
            } else if(current.deleted == true){
                const query = "DELETE FROM phones WHERE id=$1";
                const values = [current.id];
                client.query(query, values);
            }else if(current.updated == true){
                const query = `UPDATE phones SET price=$1, name=$2, prodYear=$3, description=$4 WHERE id=$5`;
                const values = [current.price, current.name, current.prodYear, current.description, current.id];
            }
        }

        let query = "SELECT * FROM phones";
        client.query(query)
        .then(result => {
            phones.length = 0;
            result.rows.forEach((row: any) => {
                const phone = new Phone(row.id, row.processorid, row.name, row.price, row.prodyear, row.description);
                phones.push(phone);
            });
            res.status(200).json(phones);
        })
        .catch(err => {
            console.error('Error executing querry', err.message);
        });
    }
    // client.connect()
    // .then(() => {
    // const query = `INSERT INTO phones(id, price, name, prodYear, description, processorID) VALUES ($1, $2, $3, $4, $5, $6)`;
    // const values = [newPhone.id, newPhone.price, newPhone.name, newPhone.prodYear, newPhone.description, newPhone.processorId];

    // client.query(query, values)
    // .then(() => {
    //     console.log("Phone added to database");
    //     phones.push(newPhone);
    //     res.status(201).json(newPhone);
    // })
    // .catch(err => {
    //     console.error("Error executing query", err.message);
    // });
}
    // .catch((err) => {
    //     console.error('Error connecting to PostgreSQL database', err.message);
    //   });
    // res.status(201).send("Phone added succesfully");

export default restorePhones