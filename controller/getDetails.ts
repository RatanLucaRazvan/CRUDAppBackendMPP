import { Request, Response } from "express";
import phones, { Phone } from "../model/Phone";
import client from "../database";
import { User } from "../model/User";
import jwt from "jsonwebtoken"

const getDetails = (req: Request, res: Response) => {
    console.log("Am intrat");
    const password = req.query.password;
    const mail = req.query.mail;
    // res.status(200).json(phone);
    const query = "SELECT * FROM users WHERE mail=$1 AND password=$2";
    const values = [mail, password];

    client.query(query, values)
    .then(result => {
            if(result.rows.length === 0){
                console.log("Incorrect");
                return res.status(404).json({message: "Invalid credentials"});
            }
            const user: User = {id: result.rows[0].id, mail: result.rows[0].mail, password: result.rows[0].password, birth: result.rows[0].birth, firstname: result.rows[0].firstname, lastname: result.rows[0].lastname, phone: result.rows[0].phone}
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
            // const phone = new Phone(result.rows[0].id, result.rows[0].processorid, result.rows[0].name, result.rows[0].price, result.rows[0].prodyear, result.rows[0].description);
            res.status(200).json({token});
    })
    .catch(err => {
        console.error('Error executing querry', err.message);
    });
}

export default getDetails;