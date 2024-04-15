import { Request, Response } from "express";
import processors, { Processor } from "../model/Processor";
import { v4 } from "uuid";
import client from "../database";


const addProcessor = (req: Request, res: Response) => {
    const newProcessorData = req.body;
    const newProcessor = new Processor(v4(), newProcessorData.name, newProcessorData.prodYear, newProcessorData.speed);
    const query = `INSERT INTO processors(id, name, prodyear, speed) VALUES ($1, $2, $3, $4)`;
    const values = [newProcessor.id, newProcessor.name, newProcessor.prodYear, newProcessor.speed];

    client.query(query, values)
    .then(() => {
        console.log("Processor added to database");
        processors.push(newProcessor);
        res.status(201).json(newProcessor);
    })
    .catch(err => {
        console.error("Error executing query", err.message);
    });
}

export default addProcessor