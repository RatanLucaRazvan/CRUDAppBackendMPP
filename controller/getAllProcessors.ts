import { Request, Response } from "express";
import processors, { Processor } from "../model/Processor";
import client from "../database";



const getAllProcessors = (req: Request, res: Response) => {
    let query = "SELECT * FROM processors";

    if(req.query.id){
        query += ` ORDER BY id ${req.query.id}`;
    } else if(req.query.name){
        query += ` ORDER BY name ${req.query.name}`;
    } else if(req.query.prodYear){
        query += ` ORDER BY prodyear ${req.query.prodYear}`;
    } else if(req.query.speed){
        query += ` ORDER BY speed ${req.query.speed}`;
    }

    console.log(query);
    client.query(query)
    .then(result => {
        processors.length = 0;
        result.rows.forEach((row: any) => {
            const processor = new Processor(row.id, row.name, row.prodyear, row.speed);
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