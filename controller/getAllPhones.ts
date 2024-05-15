import { Request, Response } from "express";
import phones, { Phone } from "../model/Phone";
import client from "../database";

const getAllPhones = (req: Request, res: Response) => {
    let query = "SELECT * FROM phones WHERE processorid=$1";
    console.log(req.query.processoridphones);
    let page = req.query.page;
    const count = req.query.count;
    let values = [req.query.processoridphones];

    if(req.query.id){
        query = "SELECT * FROM phones WHERE processorid=$1 ORDER BY id $2"
        values = [req.query.processoridphones, req.query.id]
        // query += ` ORDER BY id ${req.query.id}`;
    } else if(req.query.processorid){
        query = "SELECT * FROM phones WHERE processorid=$1 ORDER BY processorid $2"
        values = [req.query.processoridphones, req.query.processorid]
        // query += ` ORDER BY processorid ${req.query.processorid}`;
    } else if(req.query.name){
        query = "SELECT * FROM phones WHERE processorid=$1 ORDER BY name $2"
        values = [req.query.processoridphones, req.query.name]
        // query += ` ORDER BY name ${req.query.name}`;
    } else if(req.query.price){
        query = "SELECT * FROM phones WHERE processorid=$1 ORDER BY price $2"
        values = [req.query.processoridphones, req.query.price]
        // query += ` ORDER BY price ${req.query.price}`;
    } else if(req.query.prodYear){
        query = "SELECT * FROM phones WHERE processorid=$1 ORDER BY prodyear $2"
        values = [req.query.processoridphones, req.query.prodyear]
        // query += ` ORDER BY prodyear ${req.query.prodYear}`;
    } else if(req.query.descrpition){
        query = "SELECT * FROM phones WHERE processorid=$1 ORDER BY description $2"
        values = [req.query.processoridphones, req.query.description]
        // query += ` ORDER BY description ${req.query.description}`;
    }


    if(req.query.page && req.query.count){
        if(req.query.page === '-1'){
            page = '0';
        }
        if(!req.query.id && !req.query.processorid && !req.query.name && !req.query.price && !req.query.prodYear && !req.query.descrpition)
            query += " LIMIT $2 OFFSET $3"
        else{
        query += " LIMIT $3 OFFSET $4";
        }
        values = values.concat([req.query.count, page])
    }
    console.log(query);
    console.log(values);
    client.query(query, values)
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