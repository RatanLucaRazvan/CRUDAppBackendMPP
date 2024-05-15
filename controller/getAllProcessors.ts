import { Request, Response } from "express";
import processors, { Processor } from "../model/Processor";
import client from "../database";
import { JwtPayload } from "jsonwebtoken";



const getAllProcessors = (req: Request, res: Response) => {
    let query = "SELECT * FROM processors WHERE userid=$1";
    let values = [req.query.userid];
    let page = req.query.page;
    if(req.query.id){
        query = "SELECT * FROM processors WHERE userid=$1 ORDER BY id $2";
        values = [req.query.id];
        // query += ` ORDER BY id ${req.query.id}`;
    } else if(req.query.name){
        query = "SELECT * FROM processors WHERE userid=$1 ORDER BY name $2";
        values = [req.query.name];
        // query += ` ORDER BY name ${req.query.name}`;
    } else if(req.query.prodYear){
        query = "SELECT * FROM processors WHERE userid=$1 ORDER BY prodyear $2";
        values = [req.query.prodyear];
        // query += ` ORDER BY prodyear ${req.query.prodYear}`;
    } else if(req.query.speed){
        query = "SELECT * FROM processors WHERE userid=$1 ORDER BY speed $2";
        values = [req.query.speed];
        // query += ` ORDER BY speed ${req.query.speed}`;
    }

    if(req.query.page && req.query.count){
        if(req.query.page === '-1'){
            page = '0';
        }
        if(!req.query.id && !req.query.name && !req.query.prodyear && !req.query.speed)
            query += " LIMIT $2 OFFSET $3";
        else 
            query += " LIMIT $3 OFFSET $4";
        values = values.concat([req.query.count, page]);
    }
    
    console.log(query);
    console.log(values);
    client.query(query, values)
    .then(result => {
        processors.length = 0;
        result.rows.forEach((row: any) => {
            const processor = new Processor(row.id, row.name, row.prodyear, row.speed, row.userid);
            processors.push(processor);
          });
        res.status(200).json(processors);
    })
    .catch(err => {
        console.error('Error executing querry in getAll! ', err.message);
    });
    // res.status(200).json(processors);
}

export default getAllProcessors