import { Client } from "pg";

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "patru#raton03",
    database: "MPPDatabase"
});


export default client