import { Request, Response } from "express";
import processors, { Processor } from "../model/Processor";
import client from "../database";



const getNumberOfPhones = (req: Request, res: Response) => {
    let query = "";
    if(req.query.processorId){
        query = `SELECT COUNT(*) FROM phones WHERE processorid = '${req.query.processorId.toString()}'`;
    }
    
    // console.log(query);
    client.query(query)
    .then(result => {
        console.log(result.rows[0]);
        res.status(200).json(result.rows[0]);
    })
    .catch(err => {
        console.error('Error executing querry in getNumber! ', err.message);
    });
    // res.status(200).json(processors);
}

export default getNumberOfPhones