import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import phones, { Phone } from "./model";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.NODE_ENV === 'test' ? 0 : process.env.PORT || 3000;



app.post("/", (req, res) => {
    const newPhoneData = req.body;
    const newPhone = new Phone(newPhoneData.id, newPhoneData.name, newPhoneData.price, newPhoneData.prodYear, newPhoneData.description);
    phones.push(newPhone);
    // res.status(201).send("Phone added succesfully"); 
    res.status(201).json(newPhone);   
})


// Get all
app.get("/", (req, res) => {
    res.status(200).json(phones);
});

// Get one
app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const phone = phones.find((p) => p.id === id);
    if(!phone){
        return res.status(404).json({message: "Phone does not exist"});
    }
    res.status(200).json(phone);
})


app.patch("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatesData = req.body;
    const phone = phones.find((p) => p.id === id);
    if(!phone){
        return res.status(404).json({message: "Phone does not exist"});
    }
    Object.assign(phone, updatesData);
    res.status(200).json(phone);
})

app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // const phone = phones.find((p) => p.id === id);
    const index = phones.findIndex(b => b.id === id);
    if(index == -1){
        return res.status(404).json({message: "Phone does not exist"});
    }
    // phones = phones.filter((p) => p.id !== id);
    // updatePhones(getPhones().filter((p) => p.id !== id));
    // console.log(phones);
    phones.splice(index, 1);
    res.status(204).send();
})


const server = app.listen(port, () => {
  console.group();
  console.log(`Server started at port ${port}`);
  console.groupEnd();
});

export default server;