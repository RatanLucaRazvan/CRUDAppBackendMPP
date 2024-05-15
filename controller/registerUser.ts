import { v4 } from "uuid";
import phones, { Phone } from "../model/Phone";
import { Request, Response } from "express";
import client from "../database";
import { User } from "../model/User";
import bcrypt from 'bcrypt';

const registerUser = (req: Request, res: Response) => {
    console.log("TELEFON ADAUGAT")
    const newUserData = req.body;
    const newUser: User = {id: v4(), mail: newUserData.mail, password: newUserData.password, firstname: newUserData.firstname, lastname: newUserData.lastname, birth: newUserData.birth, phone: newUserData.phone};
    // client.connect()
    // .then(() => {
    let password = newUser.password;
    let hashedPassword;
    bcrypt.genSalt(10, function(err, Salt) {
        bcrypt.hash(password, Salt, function (err, hash) {
            if(err){
                return console.log("Cannot encrypt");
            }

            hashedPassword = hash;
            const query = `INSERT INTO users(id, mail, password, birth, firstname, lastname, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            const values = [newUser.id, newUser.mail, hashedPassword, newUser.birth, newUser.firstname, newUser.lastname, newUser.phone];
            client.query(query, values)
            .then(() => {
                console.log("Phone added to database");
                res.status(201).json(newUser);
            })
            .catch(err => {
                console.error("Error executing query", err.message);
                res.status(404).json({message: "Mail address already in use"});
            });
        })
    })
}
    // .catch((err) => {
    //     console.error('Error connecting to PostgreSQL database', err.message);
    //   });
    // res.status(201).send("Phone added succesfully");

export default registerUser