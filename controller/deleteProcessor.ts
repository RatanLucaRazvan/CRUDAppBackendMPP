import { Request, Response } from "express";
import processors from "../model/Processor";
import client from "../database";



const deleteProcessor = (req: Request, res: Response) => {
    const id = req.params.id;
    // const phone = phones.find((p) => p.id === id);
    const index = processors.findIndex(p => p.id === id);
    if(index == -1){
        return res.status(404).json({message: "Processor does not exist"});
    }
    const query = "DELETE FROM processors WHERE id=$1";
    const values = [id];

    client.query(query, values)
    .then(() => {
        console.log("Processor deleted from database");
        processors.splice(index, 1);
        res.status(204).send();
    })
    .catch(err => {
        console.error("Error executing querry", err.message);
    });
}

export default deleteProcessor