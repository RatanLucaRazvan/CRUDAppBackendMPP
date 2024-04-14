import { Request, Response } from "express";
import phones from "../model/Phone";
import processors from "../model/Processor";
import client from "../database";



const updateProcessor = (req: Request, res: Response) => {
    const id = req.params.id;
    const updatesData = req.body;

    const query = `UPDATE processors SET name=$1, prodYear=$2, speed=$3 WHERE id=$4`;
    const values = [updatesData.name, updatesData.prodYear, updatesData.speed, id];
    const processor = processors.find((p) => p.id === id);
    if(!processor){
        return res.status(404).json({message: "Processor does not exist"});
    }
    client.query(query, values)
    .then(() => {
        console.log("Phone updated successfully");
        Object.assign(processor, updatesData);
        res.status(200).json(processor);
    })
    .catch(err => {
        console.error("Error executing querry", err.message);
        // res.status(500).json({ error: 'Internal server error' });
    })
    // Object.assign(processor, updatesData);
    // res.status(200).json(processor);
}


export default updateProcessor;