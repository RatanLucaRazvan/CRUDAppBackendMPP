import { Request, Response } from "express";
import phones from "../model/Phone";
import client from "../database";



const updatePhone = (req: Request, res: Response) => {
    const id = req.params.id;
    const updatesData = req.body;

    const query = `UPDATE phones SET price=$1, name=$2, prodYear=$3, description=$4, processorid=$5 WHERE id=$6`;
    const values = [updatesData.price, updatesData.name, updatesData.prodYear, updatesData.description, updatesData.processorID, id];
    const phone = phones.find((p) => p.id === id);
    if(!phone){
        return res.status(404).json({message: "Phone does not exist"});
    }
    client.query(query, values)
    .then(() => {
        console.log("Phone updated successfully");
        Object.assign(phone, updatesData);
        res.status(200).json(phone);
    })
    .catch(err => {
        console.error("Error executing querry", err.message);
        // res.status(500).json({ error: 'Internal server error' });
    })
}


export default updatePhone;