import { Request, Response } from "express";
import processors from "../model/Processor";
import client from "../database";



const getAllProcessors = (req: Request, res: Response) => {
    const query = "SELECT * FROM processors";

    client.query(query)
    .then(result => {
        processors.length = 0;
        result.rows.forEach((row: any) => {
            processors.push(row);
          });
        res.status(200).json(processors);
    })
    .catch(err => {
        console.error('Error executing querry', err.message);
    });
    res.status(200).json(processors);
}

export default getAllProcessors