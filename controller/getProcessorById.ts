import { Request, Response } from "express";
import processors from "../model/Processor";



const getProcessorById = (req: Request, res: Response) => {
    const id = req.params.id;
    const processor = processors.find((p) => p.id === id);
    if(!processor){
        return res.status(404).json({message: "Processor does not exist"});
    }
    res.status(200).json(processor);
}

export default getProcessorById;