import { v4 } from "uuid";
import phones, { Phone } from "../model/Phone";
import { Request, Response } from "express";
import client from "../database";

const addPhone = (req: Request, res: Response) => {
    console.log("TELEFON ADAUGAT")
    const newPhoneData = req.body;
    const newPhone = new Phone(v4(), newPhoneData.processorId, newPhoneData.name, newPhoneData.price, newPhoneData.prodYear, newPhoneData.description);
    // client.connect()
    // .then(() => {
    const query = `INSERT INTO phones(id, price, name, prodYear, description, processorID) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [newPhone.id, newPhone.price, newPhone.name, newPhone.prodYear, newPhone.description, newPhone.processorId];

    client.query(query, values)
    .then(() => {
        console.log("Phone added to database");
        phones.push(newPhone);
        res.status(201).json(newPhone);
    })
    .catch(err => {
        console.error("Error executing query", err.message);
    });
}
    // .catch((err) => {
    //     console.error('Error connecting to PostgreSQL database', err.message);
    //   });
    // res.status(201).send("Phone added succesfully");

export default addPhone