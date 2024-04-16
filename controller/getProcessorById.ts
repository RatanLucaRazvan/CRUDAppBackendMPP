import { Request, Response } from "express";
import processors, { Processor } from "../model/Processor";
import client from "../database";



const getProcessorById = (req: Request, res: Response) => {
    const id = req.params.id;
    const processor = processors.find((p) => p.id === id);
    if(!processor){
        return res.status(404).json({message: "Processor does not exist"});
    }
    // res.status(200).json(processor);
    const query = "SELECT * FROM processors WHERE id=$1";
    const values = [id];

    client.query(query, values)
    .then(result => {
            const processor = new Processor(result.rows[0].id, result.rows[0].name, result.rows[0].prodyear, result.rows[0].speed);
            res.status(200).json(processor);
    })
    .catch(err => {
        console.error('Error executing querry', err.message);
    });
}

export default getProcessorById;