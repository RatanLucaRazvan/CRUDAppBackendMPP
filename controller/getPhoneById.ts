import { Request, Response } from "express";
import phones, { Phone } from "../model/Phone";
import client from "../database";

const getPhoneById = (req: Request, res: Response) => {
    const id = req.params.id;
    // const phone = phones.find((p) => p.id === id);
    // if(!phone){
    //     return res.status(404).json({message: "Phone does not exist"});
    // }
    // res.status(200).json(phone);
    const query = "SELECT * FROM phones WHERE id=$1";
    const values = [id];

    client.query(query, values)
    .then(result => {
            const phone = new Phone(result.rows[0].id, result.rows[0].processorid, result.rows[0].name, result.rows[0].price, result.rows[0].prodyear, result.rows[0].description);
            res.status(200).json(phone);
    })
    .catch(err => {
        console.error('Error executing querry', err.message);
    });
}

export default getPhoneById;