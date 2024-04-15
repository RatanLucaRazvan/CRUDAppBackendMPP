import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import phones, { Phone, descriptionsToChoose, phoneNamesToChoose, pricesToChoose, prodYearsToChoose } from "./model/Phone";
import cors from "cors";
import { uuid } from "uuidv4";
import { v4 } from "uuid";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import addPhone from "./controller/addPhone";
import getAllPhones from "./controller/getAllPhones";
import getPhoneById from "./controller/getPhoneById";
import updatePhone from "./controller/updatePhone";
import deletePhone from "./controller/deletePhone";
import addProcessor from "./controller/addProcessor";
import getAllProcessors from "./controller/getAllProcessors";
import getProcessorById from "./controller/getProcessorById";
import updateProcessor from "./controller/updateProcessor";
import { Client } from "pg";
import client from "./database";
import deleteProcessor from "./controller/deleteProcessor";



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


app.post("/phones", addPhone);


// Get all
app.get("/phones", getAllPhones);


// Get one
app.get("/phones/:id", getPhoneById);


app.patch("/phones/:id", updatePhone);

app.delete("/phones/:id", deletePhone);

app.delete("/processors/:id", deleteProcessor);


app.get("/processors", getAllProcessors);

app.get("/processors/:id", getProcessorById);

app.post("/processors", addProcessor);

app.patch("/processors/:id", updateProcessor);



// client.query(`Select * from processors`, (err, res) => {
//     if(!err){
//         console.log(res.rows);
//     } else{
//         console.log(err.message);
//     }
//     client.end;
// })

server.listen(port, () => {
  client.connect();
  console.group();
  console.log(`Server started at port ${port}`);
  console.groupEnd();
});



export default server;