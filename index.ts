import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import phones, { Phone, descriptionsToChoose, phoneNamesToChoose, pricesToChoose, prodYearsToChoose } from "./model/Phone";
import cors from "cors";
import { uuid } from "uuidv4";
import { v4 } from "uuid";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

dotenv.config();


function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.NODE_ENV === 'test' ? 0 : process.env.PORT || 3000;

const server = http.createServer(app);

// const io = new SocketIOServer(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"]
//     }
//   });

// io.on("connection", (socket) => {
//         const interval = setInterval(() => {
//                 const newPhone = {id: v4(), name: phoneNamesToChoose[getRandomInteger(0, phoneNamesToChoose.length - 1)], price: pricesToChoose[getRandomInteger(0, pricesToChoose.length - 1)], prodYear: prodYearsToChoose[getRandomInteger(0, prodYearsToChoose.length - 1)], description: descriptionsToChoose[getRandomInteger(0, descriptionsToChoose.length - 1)]};
//                 phones.push(newPhone);
//                 const newPhoneString = JSON.stringify(newPhone);
//                 console.log("Am trimis");
//                 socket.emit("phone", newPhoneString);
//         }, 15000);

//         socket.on("disconnect", () => {
//             console.log("Client disconnected");
//             clearInterval(interval);
//         });
// });

app.post("/", (req, res) => {
    const newPhoneData = req.body;
    const newPhone = new Phone(v4(), newPhoneData.name, newPhoneData.price, newPhoneData.prodYear, newPhoneData.description);
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
    const id = req.params.id;
    const phone = phones.find((p) => p.id === id);
    if(!phone){
        return res.status(404).json({message: "Phone does not exist"});
    }
    res.status(200).json(phone);
})


app.patch("/:id", (req, res) => {
    const id = req.params.id;
    const updatesData = req.body;
    const phone = phones.find((p) => p.id === id);
    if(!phone){
        return res.status(404).json({message: "Phone does not exist"});
    }
    Object.assign(phone, updatesData);
    res.status(200).json(phone);
})

app.delete("/:id", (req, res) => {
    const id = req.params.id;
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


server.listen(port, () => {
  console.group();
  console.log(`Server started at port ${port}`);
  console.groupEnd();
});



export default server;