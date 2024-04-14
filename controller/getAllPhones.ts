import { Request, Response } from "express";
import phones from "../model/Phone";
import client from "../database";

const getAllPhones = (req: Request, res: Response) => {
    const query = "SELECT * FROM phones";

    client.query(query)
    .then(result => {
        phones.length = 0;
        result.rows.forEach((row: any) => {
            phones.push(row);
          });
        res.status(200).json(phones);
    })
    .catch(err => {
        console.error('Error executing querry', err.message);
    });
}

export default getAllPhones