import { Request, Response } from "express";
import phones, { Phone } from "../model/Phone";
import client from "../database";
import { User } from "../model/User";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const loginUser = (req: Request, res: Response) => {
    console.log("Am intrat");
    const password = req.query.password?.toString();
    const mail = req.query.mail;
    // res.status(200).json(phone);
    const query = "SELECT * FROM users WHERE mail=$1 AND password=$2";

    let hashedPassword;

    const mailQuery = "SELECT * FROM users WHERE mail=$1";
    const mailValues = [mail];
    client.query(mailQuery, mailValues)
    .then(result => {
        if(result.rows.length === 0){
            console.log("Incorrect");
            return res.status(404).json({message: "Invalid credentials"});
        }

        const encryptedPassword = result.rows[0].password;
        bcrypt.compare(password!, encryptedPassword, async function(err, isMatch) {
            if(isMatch){
                const user: User = {id: result.rows[0].id, mail: result.rows[0].mail, password: result.rows[0].password, birth: result.rows[0].birth, firstname: result.rows[0].firstname, lastname: result.rows[0].lastname, phone: result.rows[0].phone}
                const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
                // const phone = new Phone(result.rows[0].id, result.rows[0].processorid, result.rows[0].name, result.rows[0].price, result.rows[0].prodyear, result.rows[0].description);
                res.status(200).json({token});
            }
            if(!isMatch){
                console.log("Incorrect");
                return res.status(404).json({message: "Invalid credentials"});
            }
        })
    })
    .catch(err => {
        console.error('Error executing querry', err.message);
    });
    // bcrypt.genSalt(10, function(err, Salt) {
    //     bcrypt.hash(password!, Salt, function (err, hash) {
    //         if(err){
    //             return console.log("Cannot encrypt");
    //         }

    //         hashedPassword = hash;
    //         console.log(hashedPassword);
    //         const values = [mail, hashedPassword];
    //         client.query(query, values)
    //         .then(result => {
    //                 if(result.rows.length === 0){
    //                     console.log("Incorrect");
    //                     return res.status(404).json({message: "Invalid credentials"});
    //                 }
    //                 const user: User = {id: result.rows[0].id, mail: result.rows[0].mail, password: result.rows[0].password, birth: result.rows[0].birth, firstname: result.rows[0].firstname, lastname: result.rows[0].lastname, phone: result.rows[0].phone}
    //                 const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
    //                 // const phone = new Phone(result.rows[0].id, result.rows[0].processorid, result.rows[0].name, result.rows[0].price, result.rows[0].prodyear, result.rows[0].description);
    //                 res.status(200).json({token});
    //         })
    //         .catch(err => {
    //             console.error('Error executing querry', err.message);
    //         });
    //     })
    // })

}

export default loginUser;