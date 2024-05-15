import express, { Express, NextFunction, Request, Response } from "express";
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
import processors, { Processor } from "./model/Processor";
import getNumberOfPhones from "./controller/getNumberOfPhones";
import syncFrontData from "./controller/syncFrontData";
import loginUser from "./controller/loginUser";
import registerUser from "./controller/registerUser";
import getDetails from "./controller/getDetails";
import jwt, { JwtPayload } from "jsonwebtoken"



dotenv.config();
function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface AuthRequest extends Request{
  user?: JwtPayload
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
//         const newProcessor = new Processor(v4(), "A1 bionic", 2004, "low");
//         const query = `INSERT INTO processors(id, name, prodyear, speed) VALUES ($1, $2, $3, $4)`;
//         const values = [newProcessor.id, newProcessor.name, newProcessor.prodYear, newProcessor.speed];
//         client.query(query, values)
//         .then(() => {
//             console.log("Processor added to database");
//             processors.push(newProcessor);
//         })
//         .catch(err => {
//             console.error("Error executing query", err.message);
//         });
//         const newProcessorString = JSON.stringify(newProcessor);
//         socket.emit("processor", newProcessorString);
//         const interval = setInterval(() => {
//                 const newPhone = {id: v4(), processorId: newProcessor.id, name: phoneNamesToChoose[getRandomInteger(0, phoneNamesToChoose.length - 1)], price: pricesToChoose[getRandomInteger(0, pricesToChoose.length - 1)], prodYear: prodYearsToChoose[getRandomInteger(0, prodYearsToChoose.length - 1)], description: descriptionsToChoose[getRandomInteger(0, descriptionsToChoose.length - 1)]};
//                 phones.push(newPhone);
//                 const query = `INSERT INTO phones(id, price, name, prodYear, description, processorID) VALUES ($1, $2, $3, $4, $5, $6)`;
//                 const values = [newPhone.id, newPhone.price, newPhone.name, newPhone.prodYear, newPhone.description, newPhone.processorId];
//                 client.query(query, values)
//                 .then(() => {
//                     console.log("Phone added to database");
//                     phones.push(newPhone);
//                 })
//                 .catch(err => {
//                     console.error("Error executing query", err.message);
//                 });
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

app.post("/syncfrontdata", syncFrontData);


// Get all
app.get("/phones", getAllPhones);


// Get one
app.get("/phones/:id", getPhoneById);

app.get("/numberofphones", getNumberOfPhones);


app.patch("/phones/:id", updatePhone);

app.delete("/phones/:id", deletePhone);

app.delete("/processors/:id", deleteProcessor);



app.get("/accountdetails", authenticateToken, (req: AuthRequest, res) => {
  console.log(typeof(req.user))
  console.log(req.user);
  res.json(req.user);
});

app.get("/login", loginUser);

app.get("/processors", getAllProcessors);

app.get("/processors/:id", getProcessorById);

app.post("/processors", addProcessor);

app.patch("/processors/:id", updateProcessor);


app.post("/register", registerUser);


function authenticateToken(req: AuthRequest, res: Response, next: NextFunction){
  const authHeader = req.headers['authorization']
  console.log(req.header)
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token)
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user as JwtPayload;
    next()
  })
}

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