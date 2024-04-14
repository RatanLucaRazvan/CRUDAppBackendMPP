import { Request, Response } from "express";
import phones from "../model/Phone";
import client from "../database";



const deletePhone = (req: Request, res: Response) => {
    const id = req.params.id;
    // const phone = phones.find((p) => p.id === id);
    const index = phones.findIndex(b => b.id === id);
    if(index == -1){
        return res.status(404).json({message: "Phone does not exist"});
    }
    const query = "DELETE FROM phones WHERE id=$1";
    const values = [id];

    client.query(query, values)
    .then(() => {
        console.log("Phone deleted from database");
        phones.splice(index, 1);
        res.status(204).send();
    })
    .catch(err => {
        console.error("Error executing querry", err.message);
    });
}


export default deletePhone;