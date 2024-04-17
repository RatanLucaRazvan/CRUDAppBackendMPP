import { Request, Response } from "express";
import phones, { Phone } from "../model/Phone";
import client from "../database";

const getAllPhones = (req: Request, res: Response) => {
    let query = "SELECT * FROM phones";

    if(req.query.id){
        query += ` ORDER BY id ${req.query.id}`;
    } else if(req.query.processorid){
        query += ` ORDER BY processorid ${req.query.processorid}`;
    } else if(req.query.name){
        query += ` ORDER BY name ${req.query.name}`;
    } else if(req.query.price){
        query += ` ORDER BY price ${req.query.price}`;
    } else if(req.query.prodYear){
        query += ` ORDER BY prodyear ${req.query.prodYear}`;
    } else if(req.query.descrpition){
        query += ` ORDER BY description ${req.query.description}`;
    }
    console.log(query);
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

export default getAllPhones