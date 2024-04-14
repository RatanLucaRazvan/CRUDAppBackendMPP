import { Request, Response } from "express";
import phones from "../model/Phone";

const getPhoneById = (req: Request, res: Response) => {
    const id = req.params.id;
    const phone = phones.find((p) => p.id === id);
    if(!phone){
        return res.status(404).json({message: "Phone does not exist"});
    }
    res.status(200).json(phone);
}

export default getPhoneById;