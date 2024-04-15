import { Request, Response } from "express";
import processors, { Processor } from "../model/Processor";
import client from "../database";



const getAllProcessors = (req: Request, res: Response) => {
    const query = "SELECT * FROM processors";

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